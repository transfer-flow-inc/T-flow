import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {GoogleSsoService} from "../../services/sso/Google/google-sso.service";
import {CookiesService} from "../../services/cookies/cookies.service";
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private httpService: HttpClientService,
    private jwtService: JwtTokenService,
    private googleSsoService: GoogleSsoService,
    private cookiesService: CookiesService
  ) {
  }

  ngOnInit(): void {

    if (this.cookiesService.get('token')) {
        this.httpService.logout();
        this.googleSsoService.signOut();
        this.cookiesService.delete('token');
      }
    }




}
