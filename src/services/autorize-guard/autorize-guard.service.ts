import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {JwtTokenService} from "../jwt-token/jwt-token.service";
import {CookiesService} from "../cookies/cookies.service";

@Injectable({
  providedIn: 'root'
})
export class AutorizeGuardService {

  constructor(
    private authStorageService: CookiesService,
    private jwtService : JwtTokenService
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    if (this.jwtService.jwtToken == "" && this.authStorageService.get("token") == "") {
      window.location.href = '/se-connecter';
      return false;
    }
    this.jwtService.setToken(this.authStorageService.get("token")!);


    if (this.jwtService.isTokenExpired()) {
      window.location.href = "/se-connecter";
      this.authStorageService.delete("token");
      return false;
    } else {

      if (this.authStorageService.get("token")) {
        return true;
      } else {
        window.location.href = "/se-connecter";
        return false;
      }
    }

  }
}
