import {Component, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {HttpClientService} from "../../services/http-client/http-client.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {TokenInterface} from "../../interfaces/Token/token-interface";
import {CookiesService} from "../../services/cookies/cookies.service";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {Router} from "@angular/router";
import {GoogleSsoService} from "../../services/sso/Google/google-sso.service";
import {OAuthEvent, OAuthService} from "angular-oauth2-oidc";
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faEye: IconDefinition = faEye;
  faEyeSlash: IconDefinition = faEyeSlash;
  showPassword: boolean = false;
  emailValue: string = "";
  passwordValue: string = "";
  token: TokenInterface = {token: ""};
  error: string = "";


  constructor(private httpService: HttpClientService,
              private cookiesService: CookiesService,
              private jwtService: JwtTokenService,
              private flashMessageService: FlashMessageService,
              private router: Router,
              private googleSsoService: GoogleSsoService,
              private oAuthService: OAuthService,
  ) {
  }


  login() {
    const loginUrl = `${environment.apiURL}auth/authenticate`;

    this.httpService.login(loginUrl, this.emailValue, this.passwordValue)
      .subscribe({
        next: (data) => this.handleLoginSuccess(data),
        error: (err) => this.handleLoginError(err)
      });
  }

  handleLoginSuccess(data: any) {
    this.token = data;

    if (this.token) {
      this.setAuthenticationState(true, this.token.token);
      this.navigateToHomeWithMessage('Vous vous êtes connecté avec succès', 'success', 4000);

      if (this.jwtService.getUserRole()=== 'ADMIN') {
        this.httpService.isAdministrator.next(true);
      }

    }
  }

  handleLoginError(err: any) {
    if (err.status === 403) {
      this.error = "Email ou mot de passe incorrect !";
    } else if (err.status === 423) {
      this.error = "Vous devez valider votre compte !";
    } else {
      this.error = "Une erreur est survenue !";
    }

    this.setAuthenticationState(false, '');
  }

  setAuthenticationState(isAuthenticated: boolean, token: string) {
    if (isAuthenticated && token) {
      this.cookiesService.set("token", token, 30);
      this.httpService.isAuthenticated.next(true);
      this.jwtService.setToken(token);
    } else {
      this.httpService.isAuthenticated.next(false);
    }
  }

  navigateToHomeWithMessage(message: string, type: string, time : number) {
    this.router.navigate(['/accueil']).then(() => {
      this.flashMessageService.addMessage(message, type, time);
    });
  }

  signInWithGoogle() {
    this.googleSsoService.signInWithGoogle();
  }


  ngOnInit() {
    this.oAuthService.events.subscribe((event: OAuthEvent) => {
      if (event.type === 'token_received') {
        const userClaims = this.oAuthService.getIdentityClaims();
        this.httpService.loginWithGoogle(environment.apiURL + "auth/google", userClaims).subscribe({
          next: (token) => {
            this.httpService.isAuthenticated.next(true);
            this.cookiesService.set("token", token.token, 30);
            this.navigateToHomeWithMessage(`Vous vous êtes connecté avec succès`, 'success', 4000);
          }, error: (err) => {
            this.httpService.isAuthenticated.next(false);
          }
        });
      }
    });
  }



}
