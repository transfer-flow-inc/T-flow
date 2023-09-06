import {Component, OnInit} from '@angular/core';
import {CookiesService} from "../../services/cookies/cookies.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {Router} from "@angular/router";
import {UserInterface} from "../../interfaces/User/user-interface";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {environment} from "../../environments/environment.development";
import {UpdateUserInterface} from "../../interfaces/User/update/update-user-interface";

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

  userUpdate: UpdateUserInterface = {
    lastName: "",
    firstName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  }
  isUpdateUser: boolean = false;
  asLastname: boolean = true;
  accountStatus: string = "";
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  lastNameValue: string = "";
  firstNameValue: string = "";
  emailValue: string = "";
  oldPasswordValue: string = "";
  newPasswordValue: string = "";
  confirmPasswordValue: string = "";

  constructor(
    private cookiesService: CookiesService,
    private jwtService: JwtTokenService,
    private router: Router,
    private httpClient: HttpClientService
  ) {
  }


  ngOnInit(): void {



    let token = this.cookiesService.get('token');
    if (!token) {
      this.router.navigate(['/se-connecter']).then();
      return;
    }

    this.jwtService.setToken(token);


    this.user.firstName = <string>this.jwtService.getUserFirstName();

    if (<string>this.jwtService.getUserLastName() == "" || <string>this.jwtService.getUserLastName() == " ") {
      this.asLastname = false;
    } else {
      this.user.lastName = <string>this.jwtService.getUserLastName();
    }
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

    if (this.jwtService.getUserAvatar()) {
      this.user.avatar = <string>this.jwtService.getUserAvatar();
      if (this.jwtService.getUserAuthenticationMethod() == "spring_database") {
        this.user.avatar = "assets/images/" + this.user.avatar;
      }
    }

    this.lastNameValue = this.user.lastName;
    this.firstNameValue = this.user.firstName;
    this.emailValue = this.user.email;


  }

  toggleUpdateUser() {
    this.isUpdateUser = !this.isUpdateUser;
  }

  submitUpdateUser() {
    this.isUpdateUser = false;
    this.userUpdate = {
      lastName: this.lastNameValue,
      firstName: this.firstNameValue,
      email: this.emailValue,
      oldPassword: this.oldPasswordValue,
      newPassword: this.newPasswordValue,
      confirmPassword: this.confirmPasswordValue
    }
    this.httpClient.updateUser(environment.apiURL + "user/" + this.user.email + "?oldPassword=" + this.oldPasswordValue, { user : this.userUpdate }).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }

      })
  }


  protected readonly faEyeSlash = faEyeSlash;
  protected readonly faEye = faEye;
}
