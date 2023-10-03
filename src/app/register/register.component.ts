import {Component, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {HttpClientService} from "../../services/http-client/http-client.service";
import {TokenInterface} from "../../interfaces/Token/token-interface";
import {Router} from "@angular/router";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {OAuthEvent, OAuthService} from "angular-oauth2-oidc";
import {GoogleSsoService} from "../../services/sso/Google/google-sso.service";
import {CookiesService} from "../../services/cookies/cookies.service";
import {environment} from "../../environments/environment";

const REGISTRATION_SUCCESS_MSG = "Veuillez vérifier votre boite mail à l'adresse : ";
const LOGIN_SUCCESS_MSG = "Vous vous êtes connecté avec succès";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
    private httpClientService: HttpClientService,
    private router: Router,
    private flashMessageService: FlashMessageService,
    private oAuthService: OAuthService,
    private googleSsoService: GoogleSsoService,
    private cookiesService: CookiesService,
  ) {}

  ngOnInit(): void {
    this.checkExistingToken();
    this.subscribeToOAuthEvents();
  }

  checkExistingToken(): void {
    if (this.cookiesService.get('token') !== "") {
      this.router.navigate(['/accueil']);
    }
  }

  subscribeToOAuthEvents(): void {
    this.oAuthService.events.subscribe((event: OAuthEvent) => {
      if (event.type === 'token_received') {
        const userClaims = this.oAuthService.getIdentityClaims();
        this.loginWithGoogle(userClaims);
      }
    });
  }

  loginWithGoogle(userClaims: any): void {
    this.httpClientService.loginWithGoogle(environment.apiURL + "auth/google", userClaims)
      .subscribe((token) => {
        this.cookiesService.set("token", token.token, 30);
        this.navigateToHomeAndFlashMessage(LOGIN_SUCCESS_MSG, 'success', 4000)
      });
  }

  navigateToHomeAndFlashMessage(message: string, type:string,  time:number): void {
    this.router.navigate(['/accueil']).then(() =>
      this.flashMessageService.addMessage(message, type, time)
    );
  }

  register(): void {
    if (this.isChecked) {
      this.performRegistration();
    }
  }

  performRegistration(): void {
    this.httpClientService.register<TokenInterface>(
      environment.apiURL + "auth/register",
      this.firstNameValue,
      this.lastNameValue,
      this.emailValue,
      this.passwordValue
    )
    .subscribe({
      next: () => {
        this.flashMessageService.addMessage(REGISTRATION_SUCCESS_MSG + this.emailValue, 'warning', 4000);
        this.router.navigate(['/accueil']);
      },
      error: (err) => this.handleError(err)
    });
  }

  handleError(err: any): void {
    if (err.status === 403) {
      this.error = "Email ou mot de passe incorrect !";
    } else if (err.status === 423) {
      this.error = "Vous devez valider votre compte !";
    } else {
      this.error = "Une erreur est survenue !";
    }
  }

  signInWithGoogle(): void {
    this.googleSsoService.signInWithGoogle();
  }

  changeIsChecked(): void {
    this.isChecked = !this.isChecked;
  }
}
