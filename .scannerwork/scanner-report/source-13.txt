import { Component } from '@angular/core';
import { HttpClientService } from '../../services/httpClient/http-client.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { FlashMessageService } from '../../services/flash-message/flash-message.service';
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent{
  emailValue = this.jwtTokenService.getUserEmail();
  subjectValue = '';
  messageValue = '';

  constructor(
    private httpClientService: HttpClientService,
    private flashMessageService: FlashMessageService,
    private router: Router,
    private jwtTokenService: JwtTokenService
  ) {}

  isValidInput(): boolean {
    return this.emailValue !== '' && this.subjectValue !== '' && this.messageValue !== '';
  }

  async sendEmail(): Promise<void> {
    if (!this.isValidInput()) {
      this.flashMessageService.addMessage('Veuillez remplir tous les champs.', 'error', 4000);
    }

    const url = `${environment.apiURL}user/tickets`;
    try {
      await this.sendHttpRequest(url);
      this.resetFields();
      await this.navigateToHomeWithFlashMessage('Votre message a bien été envoyé.', 'success');
    } catch (error) {
      await this.navigateToHomeWithFlashMessage('Une erreur est survenue lors de l\'envoi de votre message.', 'error');
    }
  }

  private resetFields(): void {
    this.emailValue = '';
    this.subjectValue = '';
    this.messageValue = '';
  }

  private async sendHttpRequest(url: string): Promise<void> {
    await this.httpClientService
      .sendEmail(url, this.emailValue, this.subjectValue, this.messageValue)
      .toPromise();
  }

  private async navigateToHomeWithFlashMessage(message: string, type: string): Promise<void> {
    await this.router.navigate(['/accueil']);
    this.flashMessageService.addMessage(message, type, 4000);
  }
}
