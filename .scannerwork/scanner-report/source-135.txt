import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { JwtTokenService } from "../jwt-token/jwt-token.service";
import { CookiesService } from "../cookies/cookies.service";

@Injectable({
  providedIn: 'root'
})
export class AdminAutorizeGuardService {

  constructor(
    private jwtService: JwtTokenService,
    private router: Router,
    private authStorageService: CookiesService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.jwtService.jwtToken) {
      return this.navigateTo('/se-connecter', false);
    }

    this.jwtService.setToken(this.authStorageService.get('token')!);

    const userRole = this.jwtService.getUserRole();

    switch (userRole) {
      case 'ADMIN':
        return true;
      case 'USER':
        return this.navigateTo('/accueil', false);
      default:
        return this.navigateTo('/se-connecter', false);
    }
  }

  private navigateTo(route: string, result: boolean): boolean {
    this.router.navigate([route]).then();
    return result;
  }
}
