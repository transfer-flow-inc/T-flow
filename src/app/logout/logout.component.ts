import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../services/http-client/http-client.service";
import {CookiesService} from "../../services/cookies/cookies.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(
    private httpService: HttpClientService,
    private cookiesService: CookiesService
  ) {
  }

  ngOnInit(): void {

    window.sessionStorage.clear();
    this.cookiesService.delete('token');
    this.httpService.logout();


  }


}
