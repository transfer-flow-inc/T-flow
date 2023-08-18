import { Component } from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import { faEye , faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {CookiesService} from "../../services/cookies/cookies.service";
import {TokenInterface} from "../../interfaces/Token/token-interface";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {environment} from "../../environements/evironement-dev";
import {identity} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  faEye : IconDefinition = faEye;
  faEyeSlash : IconDefinition = faEyeSlash;
  showPassword: boolean = false;
  passwordValue: string = "";
  emailValue: string = "";
  firstNameValue: string = "";
  lastNameValue: string = "";
  token : TokenInterface = {token: ""};
  isChecked: boolean = false;
  error: string = "";

  constructor(private service : HttpClientService,
              private cookiesService: CookiesService ,
              private jwtService : JwtTokenService)
  {}


  register(){
    if (this.isChecked) {
      // @ts-ignore
      this.service.register<TokenInterface>(environment.apiURL + "auth/register", this.firstNameValue, this.lastNameValue, this.emailValue, this.passwordValue)
        .subscribe({
          next: (data) => {
            this.token = data;
            if (this.token.token != null) {
              this.cookiesService.set("token", this.token.token, 3);
              this.jwtService.setToken(this.token.token);
              window.location.href = "/accueil";
            }
          },
          error: (err) => {

            if (err.status == 403) {
              return this.error = "Email ou mot de passe incorrect !";
            } else {
              return this.error = "Une erreur est survenue !";
            }

          }

        });
    } else {
      alert("Veuillez accepter les conditions générales d'utilisation")
    }


  }

  remplirNil() {
    if (this.firstNameValue == "") {
      this.firstNameValue = "Thibault";
      this.lastNameValue = "BRUHAT";
      this.emailValue = "test@test.fr";
      this.passwordValue = "Bonjour.63";
      this.isChecked = true;
    } else {
      this.firstNameValue = "";
      this.lastNameValue = "";
      this.emailValue = "";
      this.passwordValue = "";
      this.isChecked = false;
    }
  }


  changeIsChecked() {
    this.isChecked = !this.isChecked;
  }

}
