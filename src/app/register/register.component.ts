import { Component } from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import { faEye , faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {CookiesService} from "../../services/cookies/cookies.service";
import {TokenInterface} from "../../interfaces/Token/token-interface";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {environment} from "../../environements/evironement-dev";
import {Router} from "@angular/router";

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

  constructor(
    private service : HttpClientService,
    private router : Router,
    private cookiesService : CookiesService,
  )
  {}


  register(){
    if (this.isChecked) {
      this.service.register<TokenInterface>(environment.apiURL + "auth/register", this.firstNameValue, this.lastNameValue, this.emailValue, this.passwordValue)
        .subscribe({
          next: (data) => {

            this.cookiesService.set("validation", data.token, 30);

            this.router.navigate(['/attente-de-verification']).then();

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

  changeIsChecked() {
    this.isChecked = !this.isChecked;
  }

}
