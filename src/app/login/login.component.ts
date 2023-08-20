import {Component} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import { faEye , faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {environment} from "../../environements/evironement-dev";
import {TokenInterface} from "../../interfaces/Token/token-interface";
import {CookiesService} from "../../services/cookies/cookies.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  faEye : IconDefinition = faEye;
  faEyeSlash : IconDefinition = faEyeSlash;
  showPassword: boolean = false;
  emailValue: string = "";
  passwordValue: string = "";
  token : TokenInterface = {token: ""};
  error : string = "";
  needValidation : boolean = false;


  constructor(private httpService : HttpClientService,
              private cookiesService : CookiesService,
              private jwtService : JwtTokenService) { }



  login(){

    if (this.cookiesService.get("validation")){
      this.needValidation = true;
      return;
    }

    this.httpService.login(environment.apiURL + "auth/authenticate", this.emailValue, this.passwordValue)
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

  }

}
