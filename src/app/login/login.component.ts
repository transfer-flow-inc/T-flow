import {Component, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {environment} from "../../environements/evironement-dev";
import {TokenInterface} from "../../interfaces/Token/token-interface";
import {CookiesService} from "../../services/cookies/cookies.service";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {Router} from "@angular/router";
import {GoogleSsoService} from "../../services/sso/Google/google-sso.service";
import {OAuthEvent, OAuthService} from "angular-oauth2-oidc";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  faEye: IconDefinition = faEye;
  faEyeSlash: IconDefinition = faEyeSlash;
  showPassword: boolean = false;
  emailValue: string = "";
  passwordValue: string = "";
  token: TokenInterface = {token: ""};
  error: string = "";
  needValidation: boolean = false;


  constructor(private httpService: HttpClientService,
              private cookiesService: CookiesService,
              private jwtService: JwtTokenService,
              private flashMessageService: FlashMessageService,
              private router: Router,
              private googleSsoService: GoogleSsoService,
              private oAuthService: OAuthService
  ) {
  }


  login() {

    this.httpService.login(environment.apiURL + "auth/authenticate", this.emailValue, this.passwordValue)
      .subscribe({

        next: (data) => {

          this.token = data;

          if (this.token.token != null) {
            this.cookiesService.set("token", this.token.token, 30);
            this.httpService.isAuthenticated.next(true);
            this.jwtService.setToken(this.token.token);
            this.router.navigate(['/accueil']).then(() => {
              this.flashMessageService.addMessage(`Vous vous êtes connecté avec succès`, 'success', 4000);
            });
          }

        },
        error: (err) => {

          this.httpService.isAuthenticated.next(false);
          if (err.status == 403) {
            return this.error = "Email ou mot de passe incorrect !";
          } else {
            return this.error = "Une erreur est survenue !";
          }

        }

      });

  }

  signInWithGoogle() {
    this.googleSsoService.signInWithGoogle();
  }


  ngOnInit() {
    this.oAuthService.events.subscribe((event: OAuthEvent) => {
      if (event.type === 'token_received') {
        const userClaims = this.oAuthService.getIdentityClaims();
        this.httpService.loginWithGoogle(environment.apiURL + "auth/google", userClaims).subscribe( {
          next: (token) => {
            this.httpService.isAuthenticated.next(true);
            this.cookiesService.set("token", token.token, 30);
            this.router.navigate(['/accueil']).then(() => {
              this.flashMessageService.addMessage(`Vous vous êtes connecté avec succès`, 'success', 4000);
            });
          }, error: (err) => {
            this.httpService.isAuthenticated.next(false);
          }
        });
      }
    });
  }


}
