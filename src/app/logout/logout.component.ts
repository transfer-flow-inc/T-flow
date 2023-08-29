import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {GoogleSsoService} from "../../services/sso/Google/google-sso.service";
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
    private googleSsoService: GoogleSsoService,
    private cookiesService: CookiesService
  ) {
  }

  ngOnInit(): void {

    if (this.cookiesService.get('token')) {
        this.cookiesService.delete('token');
        this.httpService.logout();
        this.googleSsoService.signOut();
        this.isAuthenticated.next(false);
      } else {
        this.isAuthenticated.next(false);
    }
    }




}
