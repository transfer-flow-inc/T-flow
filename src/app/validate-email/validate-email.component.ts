import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {environment} from "../../environments/environment.development";

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.css']
})
export class ValidateEmailComponent implements OnInit {

  token: string = '';
  response: Object = {};
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClientService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
    this.httpClient.validateEmail(environment.apiURL + 'verify?token=' + this.token ).subscribe({
      next: (data) => {
        this.response = data;
      },
      error: (err) => {
        this.error = err.status;
      }
    })
  }



}
