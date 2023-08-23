import {Component, OnInit} from '@angular/core';
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {CookiesService} from "../../services/cookies/cookies.service";
import {Router} from "@angular/router";
import {UserInterface} from "../../interfaces/User/user-interface";

@Component({
  selector: 'app-settings-subscription',
  templateUrl: './settings-subscription.component.html',
  styleUrls: ['./settings-subscription.component.css']
})
export class SettingsSubscriptionComponent implements OnInit{

  user: UserInterface = {
    id: 0,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    avatar: "",
    roles: [""],
    isAccountVerified: false,
    plan: "",
    authMethod: ""
  }

  constructor(
    private jwtService: JwtTokenService,
    private cookiesService: CookiesService,
    private router: Router
  ) {}
  ngOnInit(): void {

    let token = this.cookiesService.get('token');
    if (!token) {
      this.router.navigate(['/se-connecter']).then();
      return;
    }

    this.jwtService.setToken(token);

    if (this.jwtService.getUserPlan() === "FREE") {
    this.user.plan = "Vous n'avez pas d'abonnement actif";
    } else if (this.jwtService.getUserPlan() === "PREMIUM") {
      this.user.plan = "Premium";
    } else if (this.jwtService.getUserPlan() === "ULTIMATE") {
      this.user.plan = "Ultimate";
    }

  }



}
