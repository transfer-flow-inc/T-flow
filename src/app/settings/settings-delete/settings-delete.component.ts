import { Component } from '@angular/core';
import {HttpClientService} from "../../../services/http-client/http-client.service";
import {environment} from "../../../environments/environment";
import {JwtTokenService} from "../../../services/jwt-token/jwt-token.service";
import {FlashMessageService} from "../../../services/flash-message/flash-message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings-delete',
  templateUrl: './settings-delete.component.html',
  styleUrls: ['./settings-delete.component.css']
})
export class SettingsDeleteComponent {

  isConfirmed = false;

  constructor(
    private httpClientService: HttpClientService,
    private jwtTokenService: JwtTokenService,
    private flashMessageService: FlashMessageService,
    private router: Router
  )
  { }

  toggleConfirmation() {
    this.isConfirmed = !this.isConfirmed;
  }

  processDeleteRequest() {
    this.httpClientService.requestDeleteAUser(environment.apiURL + 'user/delete/' + this.jwtTokenService.getUserEmail() ).subscribe({
      next: () => {
        this.navigateToHomeAndFlashMessage("Veuillez vérifier vos mails pour la suppression de votre compte", "success", 4000);
      }, error: () => {
        this.navigateToHomeAndFlashMessage("Une erreur est survenue lors de la demande de suppression de votre compte", "error", 4000);
      }
    });
  }

  navigateToHomeAndFlashMessage(message:string, type:string, duration:number) {
    this.router.navigate(['/accueil']).then(
      () => {
        this.flashMessageService.addMessage( message, type, duration);
      }
    )
  }

}
