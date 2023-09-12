import {Component, OnInit} from '@angular/core';
import {CookiesService} from "../../services/cookies/cookies.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {Router} from "@angular/router";
import {UserInterface} from "../../interfaces/User/user-interface";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {environment} from "../../environments/environment.development";
import {UpdateUserInterface} from "../../interfaces/User/update/update-user-interface";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";

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
    userEmail: "",
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
    password: "",
    confirmPassword: ""
  }

  isUpdateUser: boolean = false;
  asLastname: boolean = true;
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
    private httpClient: HttpClientService,
    private flashMessageService: FlashMessageService
  ) {
  }


  ngOnInit(): void {

    if (!this.cookiesService.get('token')) {
        this.router.navigate(['/se-connecter']).then();
        return;
    }
    this.user = this.jwtService.getAllUserInfos();

    this.lastNameValue = this.user.lastName;
    this.firstNameValue = this.user.firstName;
    this.emailValue = this.user.userEmail;


  }

  toggleUpdateUser() {
    this.isUpdateUser = !this.isUpdateUser;
  }

  submitUpdateUser() {

    this.userUpdate = {
      lastName: this.lastNameValue,
      firstName: this.firstNameValue,
      email: this.emailValue,
      oldPassword: this.oldPasswordValue,
      password: this.newPasswordValue,
      confirmPassword: this.confirmPasswordValue
    }
    this.httpClient.updateUser(environment.apiURL + "user/" + this.user.userEmail + "?oldPassword=" + this.oldPasswordValue, this.userUpdate ).subscribe({
      next: (response) => {
        this.cookiesService.delete('token');
        this.cookiesService.set('token', response.token, 30);
        this.router.navigate(['/accueil']).then(() => {
            this.flashMessageService.addMessage('Votre compte a bien été mis à jour', 'success', 4000);
            this.isUpdateUser = false;
        });
      },
      error: (error) => {
        this.router.navigate(['/se-connecter']).then(() => {
          this.flashMessageService.addMessage('Une erreur est survenue', 'error', 4000);
        })
      }

      })
  }


  protected readonly faEyeSlash = faEyeSlash;
  protected readonly faEye = faEye;
}
