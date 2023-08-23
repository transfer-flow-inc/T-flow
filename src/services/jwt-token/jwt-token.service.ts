import {Injectable} from '@angular/core';
import  jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  jwtToken: string = "";
  decodedToken: { [key: string]: string; } = {};

  constructor() {
  }

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }

  getUserFirstName(): string | null {
    this.getDecodeToken();
    return this.getDecodeToken() ? this.getDecodeToken()['firstName'] : null;
  }

  getUserLastName(): string | null {
    this.getDecodeToken();
    return this.getDecodeToken() ? this.getDecodeToken()['lastName'] : null;
  }

  getUserAuthMethod(): string | null {
    this.getDecodeToken();
    return this.getDecodeToken() ? this.getDecodeToken()['authMethod'] : null;
  }

  getUserAuthenticationMethod(): string | null {
    this.getDecodeToken();
    return this.getDecodeToken() ? this.getDecodeToken()['authMethod'] : null;
  }

  getUserRole(): string | null {
    this.getDecodeToken();
    return this.getDecodeToken() ? this.getDecodeToken()['userRole'] : null;
  }

  getUserEmail() {
    this.getDecodeToken();
    return this.getDecodeToken() ? this.getDecodeToken()['userEmail'] : null;
  }

  getUserPlan() {
    this.getDecodeToken();
    return this.getDecodeToken() ? this.getDecodeToken()['plan'] : null;
  }

  getUserAccountStatus(): boolean {
    this.getDecodeToken();
    return this.getDecodeToken() ? JSON.parse(this.getDecodeToken()['isAccountVerified']) : false;
  }

  getUserAvatar(): string | null {
    this.getDecodeToken();
    return this.getDecodeToken() ? this.getDecodeToken()['avatar'] : null;
  }

  getToken() {
    return this.jwtToken;
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  getDecodeToken(): { [key: string]: string } {
    return jwt_decode(this.jwtToken);
  }


  getExpiryTime(): number {
    this.getDecodeToken();
    return this.getDecodeToken() ? parseInt(this.getDecodeToken()['exp']) : 0;
  }


  isTokenExpired(): boolean {
    const expiryTime: number | null = this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}
