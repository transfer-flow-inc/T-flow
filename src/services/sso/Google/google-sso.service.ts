import {Injectable} from '@angular/core';
import {GoogleSsoInterface} from "../../../interfaces/User/google-sso-interface";
import {BehaviorSubject} from "rxjs";
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {HttpClientService} from "../../httpClient/http-client.service";
import {environment} from "../../../environements/evironement-dev";
import {TokenInterface} from "../../../interfaces/Token/token-interface";
import {CookiesService} from "../../cookies/cookies.service";
import {JwtTokenService} from "../../jwt-token/jwt-token.service";
import {Router} from "@angular/router";
import {FlashMessageService} from "../../flash-message/flash-message.service";

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: 'http://localhost:4200/se-connecter',
  clientId: '979451349689-s05pddc23jr0m0769u04ir93vj5t9mp0.apps.googleusercontent.com',
  scope: 'openid profile email'
}

@Injectable({
  providedIn: 'root'
})
export class GoogleSsoService {


  token: TokenInterface = {token: ""};


  constructor(private oAuthService: OAuthService,
              private httpClientService: HttpClientService,
              private cookiesService: CookiesService,
              private jwtService: JwtTokenService,
              private router: Router,
              private flashMessageService: FlashMessageService,
  ) {
  }

  signInWithGoogle() {

    this.oAuthService.configure(oAuthConfig);

    this.oAuthService.loadDiscoveryDocument().then(() => {

      this.oAuthService.tryLoginImplicitFlow().then(() => {

        if (!this.oAuthService.hasValidAccessToken()) {

          this.oAuthService.initLoginFlow();

        } else {

          this.oAuthService.loadUserProfile().then((data) => {
            if (data) {


            this.httpClientService.loginWithGoogle(environment.apiURL + "auth/google", data)
              .subscribe((token) => {
                if (this.token){
                  this.cookiesService.set("token", token.token, 30);

                  this.router.navigate(['/accueil']).then(() => {
                    this.flashMessageService.addMessage(`Vous vous êtes connecté avec succès`, 'success', 4000);
                  });
                }
              });
              }
            });

        }

      })
    })

  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken()
  }

  signOut() {
    this.oAuthService.logOut();
    let token = this.cookiesService.get('token');
    if (token) {
      this.cookiesService.delete('token');
      this.httpClientService.isAuthenticated.next(false);
      this.router.navigate(['/accueil']).then(() => {
        this.flashMessageService.addMessage(`Vous vous êtes déconnecté avec succès`, 'success', 4000);
      });
    }
  }

}
