import {Injectable} from '@angular/core';
import {UserInterface} from "../../interfaces/User/user-interface";
import {CookiesService} from "../cookies/cookies.service";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  jwtToken: string = '';
  decodedToken: { [key: string]: string; } = {};
  constructor(
    private cookieService: CookiesService,
  ) {
    this.jwtToken = this.cookieService.get('token');
    this.decodeToken();
  }




  setToken(token : string) {
      this.jwtToken = token;
  }

  getUserFirstName(): string {
    return this.getDecodeToken(this.jwtToken)['firstName'];
  }

  getUserId(): string {
    return this.getDecodeToken(this.jwtToken)['userID'];
  }

  getUserLastName(): string {
    return this.getDecodeToken(this.jwtToken)['lastName'];
  }

  getUserAuthenticationMethod(): string {
    return this.getDecodeToken(this.jwtToken)['authMethod'];
  }

  getUserRole(): string {
    return this.getDecodeToken(this.jwtToken)['userRole'];
  }

  getUserEmail(): string {
    return this.getDecodeToken(this.jwtToken)['userEmail'];
  }

  getUserPlan(): string {
    return this.getDecodeToken(this.jwtToken)['plan'];
  }

  getUserAccountStatus(): boolean {
    return JSON.parse(this.getDecodeToken(this.jwtToken)['isAccountVerified']);
  }

  getUserAvatar(): string {
    return this.getDecodeToken(this.jwtToken)['avatar'];
  }

  getToken() {
    return this.jwtToken;
  }


  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

getDecodeToken(token: string): any {
  if (token) {
    try {
      return jwt_decode(token);
    } catch  {
      return '';
    }
  } else {
    return '';
  }
}



  getExpiryTime(): number {
    return parseInt(this.getDecodeToken(this.jwtToken)['exp']);
  }


  isTokenExpired(): boolean {
    const expiryTime: number | null = this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }

  getAllUserInfos() {
    return <UserInterface><unknown>this.getDecodeToken(this.jwtToken);
  }
}
