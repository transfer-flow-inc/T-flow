import { Component } from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import { faEye , faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  faEye : IconDefinition = faEye;
  faEyeSlash : IconDefinition = faEyeSlash;
  showPassword: boolean = false;
  isChecked: boolean = false;

  changeIsChecked() {
    this.isChecked = !this.isChecked;
  }

}
