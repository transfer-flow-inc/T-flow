import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from "angular-oauth2-oidc";
import { HttpClientService } from "../../http-client/http-client.service";
import { TokenInterface } from "../../../interfaces/Token/token-interface";
import { CookiesService } from "../../cookies/cookies.service";
import { Router } from "@angular/router";
import { FlashMessageService } from "../../flash-message/flash-message.service";
import { environment } from "../../../environments/environment";

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: `${environment.protocol}${environment.domainUrl}${environment.port}/se-connecter`,
  clientId: '979451349689-s05pddc23jr0m0769u04ir93vj5t9mp0.apps.googleusercontent.com',
  scope: 'openid profile email'
}

@Injectable({
  providedIn: 'root'
})
export class GoogleSsoService {
  token: TokenInterface = { token: "" };

  constructor(
    private oAuthService: OAuthService,
    private httpClientService: HttpClientService,
    private cookiesService: CookiesService,
    private router: Router,
    private flashMessageService: FlashMessageService
  ) {
    this.configureOAuthService();
  }

  private async configureOAuthService(): Promise<void> {
    try {
      this.oAuthService.configure(oAuthConfig);
      await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    } catch (error) {

    }
  }

  signInWithGoogle(): void {
    this.oAuthService.initImplicitFlow();
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  async signOut(): Promise<void> {
    try {
      this.oAuthService.logOut();
      const token = this.cookiesService.get('token');
      if (token) {
        this.cookiesService.delete('token');
        this.httpClientService.isAuthenticated.next(false);
        await this.router.navigate(['/accueil']);
        this.flashMessageService.addMessage(`Vous vous êtes déconnecté avec succès`, 'success', 4000);
      }
    } catch (error) {

    }
  }
}
