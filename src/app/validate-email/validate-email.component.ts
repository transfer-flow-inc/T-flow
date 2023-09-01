import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {TokenInterface} from "../../interfaces/Token/token-interface";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.css']
})
export class ValidateEmailComponent implements OnInit {

  token: TokenInterface = {
    token: ''
  }
  isConnected: boolean = false;
  isVerified: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClientService,
    private router: Router,
    private flashMessageService: FlashMessageService,
  ) {
  }

  ngOnInit(): void {
    if (this.httpClient.isAuthenticated.value) {
      this.isConnected = true;
    }
    this.route.params.subscribe(params => {
      this.token.token = params['token'];
    });
    this.httpClient.validateEmail(environment.apiURL + 'verify', this.token).subscribe({
      next: (data) => {
        this.isVerified = true;
      },
      error: (err) => {
        this.router.navigate(['/accueil']).then(() => {
          this.flashMessageService.addMessage('Votre lien de validation est invalide', 'error', 4000);
        });
      }
    })
  }


}
