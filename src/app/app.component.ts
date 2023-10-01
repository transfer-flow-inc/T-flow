import {Component, OnInit} from '@angular/core';
import {filter, map} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {CookiesService} from '../services/cookies/cookies.service';
import {HttpClientService} from '../services/httpClient/http-client.service';
import {JwtTokenService} from '../services/jwt-token/jwt-token.service';
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private cookiesService: CookiesService,
    private httpClientService: HttpClientService,
    private jwtService: JwtTokenService,
    private router: Router,
    public titleService: Title,
    private route: ActivatedRoute,
    public navbar: NavbarComponent,
  ) {
  }

  ngOnInit() {
    if (this.cookiesService.get('token')) {
      this.httpClientService.isAuthenticated.next(true);

      if (this.jwtService.getUserRole() === 'ADMIN') {
        this.httpClientService.isAdministrator.next(true);
      }

      this.jwtService.setToken(this.cookiesService.get('token'));
      if (this.jwtService.isTokenExpired()) {
        this.clearAuthData();
      }

    }

    this.logConsoleWarnings();

    this.handleRouteTitles();

  }

  clearAuthData() {
    this.httpClientService.isAuthenticated.next(false);
    this.cookiesService.delete('token');
    sessionStorage.clear();
    this.router.navigate(['/accueil']);
  }

  logConsoleWarnings() {
    console.log('%cHold Up!', 'color:red; font-size: 6rem; font-weight: bold;');
    console.log("%cIf someone told you to copy and paste something here, they're trying to hack you. Don't do it!", "color: white; font-size: 20px; font-weight: bold;");
    console.log('%cAttention!', 'color:red; font-size: 6rem; font-weight: bold;');
    console.log("%cSi quelqu'un vous a dit de copier et coller quelque chose ici, il essaie de vous pirater. Ne le faites pas!", "color: white; font-size: 20px; font-weight: bold;");
  }



  handleRouteTitles() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.route.firstChild?.snapshot.data['title'])
    ).subscribe((title) => {
      if (title) {
        this.titleService.setTitle(`T-flow - ${title}`);
      }
    });
  }

}
