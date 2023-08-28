import { Injectable } from '@angular/core';
import {JwtTokenService} from "../jwt-token/jwt-token.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {CookiesService} from "../cookies/cookies.service";

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

    if (this.jwtService.jwtToken === '') {
      this.router.navigate(['/se-connecter']).then();
      return false;
    }

    this.jwtService.setToken(this.authStorageService.get('token')!);

    if (this.jwtService.getUserRole() === 'ADMIN') {
      return true;
    } else if (this.jwtService.getUserRole() === 'USER') {
      this.router.navigate(['/accueil']).then();
      return false;
    } else {
      this.router.navigate(['/se-connecter']).then();
      return false;
    }
  }
}
