import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {CookiesService} from "../cookies/cookies.service";
import {JwtTokenService} from "../jwt-token/jwt-token.service";
import {Injectable} from "@angular/core";
import {FlashMessageService} from "../flash-message/flash-message.service";

@Injectable({
  providedIn: 'root'
})
export class AutorizeGuardService {
  constructor(
    private authStorageService: CookiesService,
    private jwtService: JwtTokenService,
    private router: Router,
    private flashMessagesService: FlashMessageService
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const tokenFromStorage = this.authStorageService.get("token");
    this.jwtService.setToken(tokenFromStorage);

    if (this.shouldNavigateToLogin(tokenFromStorage)) {
      return this.redirectToLogin();
    }

    return true;
  }

  private shouldNavigateToLogin(token: string | null): boolean {
    return !token || this.jwtService.isTokenExpired();
  }

  private async redirectToLogin(): Promise<boolean> {
    await this.router.navigate(['/se-connecter']);
    this.flashMessagesService.addMessage('Vous devez être connecté pour accéder à cette page', 'error', 4000);
    return false;
  }
}
