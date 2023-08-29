import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {environment} from "../../environments/environment.development";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.css']
})
export class ValidateEmailComponent implements OnInit {

  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClientService,
    private router: Router,
    private flashMessageService: FlashMessageService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
    this.httpClient.validateEmail(environment.apiURL + 'verify?token=' + this.token ).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (err) => {
        this.router.navigate(['/accueil']).then(() => {
          this.flashMessageService.addMessage(`Le lien de validation est invalide`, 'error', 4000);
        });
      }
    })
  }



}
