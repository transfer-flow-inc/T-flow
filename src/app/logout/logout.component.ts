import {Component, OnInit} from '@angular/core';
import {CookiesService} from "../../services/cookies/cookies.service";
import {HttpClientService} from "../../services/httpClient/http-client.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private httpService : HttpClientService,
  ) { }

  ngOnInit(): void {

    this.httpService.logout();

  }


}
