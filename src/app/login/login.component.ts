import { Component } from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import { faEye , faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  faEye : IconDefinition = faEye;
  faEyeSlash : IconDefinition = faEyeSlash;
  showPassword: boolean = false;

}
