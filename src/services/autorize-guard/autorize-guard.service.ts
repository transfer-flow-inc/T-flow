import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {JwtTokenService} from "../jwt-token/jwt-token.service";

@Injectable({
  providedIn: 'root'
})
export class AutorizeGuardService {

  constructor(
    private router: Router,
    private authStorageService: LocalStorageService,
    private jwtService : JwtTokenService
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    if (this.jwtService.jwtToken == "" && localStorage.getItem("token") == null) {
      window.location.href = '/se-connecter';
      return false;
    }
    this.jwtService.setToken(this.authStorageService.get("token")!);


    if (this.jwtService.isTokenExpired()) {
      window.location.href = "/se-connecter";
      this.authStorageService.remove("token");
      return false;
    } else {

      if (localStorage.getItem("token")) {
        return true;
      } else {
        window.location.href = "/se-connecter";
        return false;
      }
    }

  }
}
