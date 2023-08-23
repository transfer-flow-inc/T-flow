import {Component, OnInit} from '@angular/core';
import {CookiesService} from "../../services/cookies/cookies.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {Router} from "@angular/router";
import {UserInterface} from "../../interfaces/User/user-interface";

@Component({
  selector: 'app-settings-my-account',
  templateUrl: './settings-my-account.component.html',
  styleUrls: ['./settings-my-account.component.css']
})
export class SettingsMyAccountComponent implements OnInit {

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

  accountStatus: string = "";

  constructor(
    private cookiesService: CookiesService,
    private jwtService: JwtTokenService,
    private router: Router
  ) {
  }


  ngOnInit(): void {

    let token = this.cookiesService.get('token');
    if (!token) {
      this.router.navigate(['/se-connecter']).then(r => console.log(r));
      return;
    }

    this.jwtService.setToken(token);


    this.user.firstName = <string>this.jwtService.getUserFirstName();
    this.user.lastName = <string>this.jwtService.getUserLastName();
    this.user.email = <string>this.jwtService.getUserEmail();
    if (this.jwtService.getUserAuthenticationMethod() == "spring_database") {
      this.user.authMethod = "Compte crée sur le site";
    } else if (this.jwtService.getUserAuthenticationMethod() == "google_sso") {
      this.user.authMethod = "Compte crée avec Google";
    }
    if (this.jwtService.getUserPlan() == "FREE") {
      this.user.plan = "Pas d'abonnement actif";
    }
    if (this.jwtService.getUserAccountStatus()) {
      this.accountStatus = "Compte vérifié";
    } else {
      this.accountStatus = "Compte non vérifié";
    }


  }


}
