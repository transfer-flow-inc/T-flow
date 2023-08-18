import {Component, OnInit} from '@angular/core';
import {CookiesService} from "../../services/cookies/cookies.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings-my-account',
  templateUrl: './settings-my-account.component.html',
  styleUrls: ['./settings-my-account.component.css']
})
export class SettingsMyAccountComponent implements OnInit {

  user : { firstName: string; lastName: string; authMethod: string; email: string, plan: string } = {
    firstName: "",
    lastName: "",
    email: "",
    authMethod: "",
    plan: ""
  }

  constructor(
    private cookiesService: CookiesService,
    private jwtService: JwtTokenService,
    private router : Router
  ) { }


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
      if (this.jwtService.getUserAuthenticationMethod() == "spring_database" ){
        this.user.authMethod = "Compte crée sur le site";
      } else {
        this.user.authMethod = "Compte sso";
      }




  }


}
