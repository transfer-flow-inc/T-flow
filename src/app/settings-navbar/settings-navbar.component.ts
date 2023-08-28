import {Component, OnInit} from '@angular/core';
import {CookiesService} from "../../services/cookies/cookies.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";

@Component({
  selector: 'app-settings-navbar',
  templateUrl: './settings-navbar.component.html',
  styleUrls: ['./settings-navbar.component.css']
})
export class SettingsNavbarComponent implements OnInit{

  isAdmin: boolean = false;

  constructor(
    private jwtService: JwtTokenService,
    private cookiesService: CookiesService
  ) {
  }

  ngOnInit(): void {
    if (this.cookiesService.get('token')) {
      this.isAdmin = this.jwtService.getUserRole() === 'ADMIN';
    }
  }

}
