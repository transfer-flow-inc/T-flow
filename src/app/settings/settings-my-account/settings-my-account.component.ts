import {Component, OnInit} from '@angular/core';
import {CookiesService} from "../../../services/cookies/cookies.service";
import {JwtTokenService} from "../../../services/jwt-token/jwt-token.service";
import {Router} from "@angular/router";
import {UserInterface} from "../../../interfaces/User/user-interface";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {HttpClientService} from "../../../services/http-client/http-client.service";
import {environment} from "../../../environments/environment";
import {UpdateUserInterface} from "../../../interfaces/User/update/update-user-interface";
import {FlashMessageService} from "../../../services/flash-message/flash-message.service";
import {TokenInterface} from "../../../interfaces/Token/token-interface";
import {FormatSizeService} from "../../../services/format-size-file/format-size.service";
import {UserStorageInterface} from "../../../interfaces/User/user-storage-interface";

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
    authMethod: "",
    userFolders: []
  }
  storageInfo: UserStorageInterface = {
    usedStorage: 0,
    maxStorage: 0
  }
  storagePercentage : number = 0;
  userUpdate: UpdateUserInterface = {
    lastName: "",
    firstName: "",
    email: "",
    oldPassword: "",
    password: "",
  }

  isUpdateUser: boolean = false;
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
    private flashMessageService: FlashMessageService,
    private formatSizeService: FormatSizeService
  ) {
  }


  ngOnInit(): void {

    if (!this.cookiesService.get('token')) {
      this.router.navigate(['/se-connecter']).then();
      return;
    }
    this.getAllUserInfos();

    this.getStorageInfo();


  }

  getAllUserInfos() {
    this.user = this.jwtService.getAllUserInfos();
    this.lastNameValue = this.user.lastName;
    this.firstNameValue = this.user.firstName;
    this.emailValue = this.user.userEmail;
  }

  toggleUpdateUser() {
    this.isUpdateUser = !this.isUpdateUser;
  }

  submitUpdateUser() {
    this.userUpdate = this.createUserUpdateObject();

    const updateUserUrl = this.buildUpdateUserUrl();

    this.httpClient.updateUser(updateUserUrl, this.userUpdate)
      .subscribe({
        next: response => this.handleUpdateSuccess(response),
        error: error => this.navigateToHomeAndFlashMessage('Une erreur est survenue lors de la mise à jour de votre compte', 'error', 4000),
      });
  }

  createUserUpdateObject() {
    return {
      lastName: this.lastNameValue,
      firstName: this.firstNameValue,
      email: this.emailValue,
      oldPassword: this.oldPasswordValue,
      password: this.newPasswordValue
    };
  }


  buildUpdateUserUrl() {
    return `${environment.apiURL}user/${this.user.userEmail}?oldPassword=${this.oldPasswordValue}`;
  }

  handleUpdateSuccess(response: TokenInterface) {
    this.cookiesService.delete('token');
    this.cookiesService.set('token', response.token, 30);
    this.navigateToHomeAndFlashMessage('Votre compte a bien été mis à jour', 'success', 4000);
  }


  getStorageInfo() {
    this.httpClient.getStorageInfo(environment.apiURL + 'user/' + this.jwtService.getUserId() + '/storage')
      .subscribe({
        next: (response) => {
          this.storageInfo = response;
          this.storagePercentage = (this.storageInfo.usedStorage / this.storageInfo.maxStorage) * 100;
        },
        error: () => {
        }
      });

  }

  formatSize(size: number) {
    return this.formatSizeService.formatSize(size);
  }

  navigateToHomeAndFlashMessage(message: string, type: string, time: number) {
    this.router.navigate(['/accueil']).then(() => {
      this.flashMessageService.addMessage(message, type, time);
    });
  }




  protected readonly faEyeSlash = faEyeSlash;
  protected readonly faEye = faEye;
}
