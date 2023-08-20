import {Component, OnInit} from '@angular/core';
import {CookiesService} from "../../services/cookies/cookies.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";

@Component({
  selector: 'app-waiting-verification',
  templateUrl: './waiting-verification.component.html',
  styleUrls: ['./waiting-verification.component.css'],
})
export class WaitingVerificationComponent implements OnInit {

  private token: string = "";
  email: string = "";

  constructor(
    private cookieService: CookiesService,
    private jwtService: JwtTokenService,
  ) {
  }


  ngOnInit() {

    this.token = this.cookieService.get("validation");

    if (!this.token) {
      window.location.href = "/accueil";
    }
    this.jwtService.setToken(this.token);
    this.email = <string>this.jwtService.getUserEmail();


  }


}
