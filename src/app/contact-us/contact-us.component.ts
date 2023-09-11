import { Component } from '@angular/core';
import { HttpClientService } from '../../services/httpClient/http-client.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { FlashMessageService } from '../../services/flash-message/flash-message.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  emailValue = '';
  subjectValue = '';
  messageValue = '';

  constructor(
    private httpClientService: HttpClientService,
    private flashMessageService: FlashMessageService,
    private router: Router
  ) {}

  isValidInput(): boolean {
    return this.emailValue !== '' && this.subjectValue !== '' && this.messageValue !== '';
  }

  async sendEmail() {
    if (!this.isValidInput()) {
      return;
    }

    const url = `${environment.apiURL}user/tickets`;
    try {
      await this.httpClientService.sendEmail(url, this.emailValue, this.subjectValue, this.messageValue).toPromise();
      this.resetFields();
      console.log('Message sent')
      await this.navigateToHomeWithMessage(`Votre message a bien été envoyé.`, 'success');
    } catch (error) {
      console.log(error)
      await this.navigateToHomeWithMessage(`Une erreur est survenue lors de l'envoi de votre message.`, 'error');
    }
  }

  resetFields() {
    this.emailValue = '';
    this.subjectValue = '';
    this.messageValue = '';
  }

  async navigateToHomeWithMessage(message: string, type: string) {
    await this.router.navigate(['/accueil']);
    this.flashMessageService.addMessage(message, type, 4000);
  }
}
