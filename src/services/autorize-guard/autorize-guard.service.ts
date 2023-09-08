import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { JwtTokenService } from "../jwt-token/jwt-token.service";
import { CookiesService } from "../cookies/cookies.service";

@Injectable({
  providedIn: 'root'
})
export class AutorizeGuardService {
  constructor(
    private authStorageService: CookiesService,
    private jwtService: JwtTokenService,
    private router: Router
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    try {
      if (!this.jwtService.jwtToken && !this.authStorageService.get("token")) {
        return this.redirectToLogin();
      }

      this.jwtService.setToken(this.authStorageService.get("token")!);

      if (this.jwtService.isTokenExpired()) {
        this.authStorageService.delete("token");
        return this.redirectToLogin();
      } else if (this.authStorageService.get("token")) {
        return true;
      } else {
        return this.redirectToLogin();
      }
    } catch (error) {
      return this.redirectToLogin();
    }
  }

  private async redirectToLogin(): Promise<boolean> {
    await this.router.navigate(['/se-connecter']);
    return false;
  }
}
