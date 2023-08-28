import {Component, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {TokenInterface} from "../../interfaces/Token/token-interface";
import {Router} from "@angular/router";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {OAuthEvent, OAuthService} from "angular-oauth2-oidc";
import {GoogleSsoService} from "../../services/sso/Google/google-sso.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {CookiesService} from "../../services/cookies/cookies.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  faEye: IconDefinition = faEye;
  faEyeSlash: IconDefinition = faEyeSlash;
  showPassword: boolean = false;
  passwordValue: string = "";
  emailValue: string = "";
  firstNameValue: string = "";
  lastNameValue: string = "";
  token: TokenInterface = {token: ""};
  isChecked: boolean = false;
  error: string = "";

  constructor(
    private service: HttpClientService,
    private router: Router,
    private flashMessageService: FlashMessageService,
    private oAuthService: OAuthService,
    private googleSsoService: GoogleSsoService,
    private httpService: HttpClientService,
    private cookiesService: CookiesService,
    private jwtService: JwtTokenService
  ) {
  }


  register() {
    if (this.isChecked) {
      this.service.register<TokenInterface>(environment.apiURL + "auth/register", this.firstNameValue, this.lastNameValue, this.emailValue, this.passwordValue)
        .subscribe({
          next: () => {
            this.flashMessageService.addMessage(`Veuillez vérifier votre boite mail à l'adresse : ${this.emailValue}, pour valider votre compte !`, 'warning', 4000);

            this.router.navigate(['/accueil']).then(() => {
            });


          },
          error: (err) => {

            if (err.status == 403) {
              return this.error = "Email ou mot de passe incorrect !";
            } else {
              return this.error = "Une erreur est survenue !";
            }

          }

        });
    } else {
      alert("Veuillez accepter les conditions générales d'utilisation")
    }


  }

  signInWithGoogle() {
    this.googleSsoService.signInWithGoogle();
  }


  ngOnInit() {
    if (this.cookiesService.get('token') != "") {
      this.router.navigate(['/accueil']).then();
    }
    this.oAuthService.events.subscribe((event: OAuthEvent) => {
      if (event.type === 'token_received') {
        const userClaims = this.oAuthService.getIdentityClaims();
        this.httpService.loginWithGoogle(environment.apiURL + "auth/google", userClaims).subscribe((token) => {
          this.cookiesService.set("token", token.token, 30);
          this.router.navigate(['/accueil']).then(() => {
            this.flashMessageService.addMessage(`Vous vous êtes connecté avec succès`, 'success', 4000);
          });
        });
      }
    });
  }

  changeIsChecked() {
    this.isChecked = !this.isChecked;
  }

}
