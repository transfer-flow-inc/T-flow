import {Component, OnInit, Inject} from '@angular/core';
import {filter, map} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";
import {CookiesService} from "../services/cookies/cookies.service";
import {HttpClientService} from "../services/httpClient/http-client.service";
import {JwtTokenService} from "../services/jwt-token/jwt-token.service";
import {GoogleSsoService} from "../services/sso/Google/google-sso.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(
    private myCookieService: CookiesService,
    private httpClientService: HttpClientService,
    private jwtService: JwtTokenService,
    private googleService : GoogleSsoService,
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit() {

    if (this.myCookieService.get('token') && !this.httpClientService.isAuthenticated.value) {
      this.jwtService.setToken(this.myCookieService.get('token'));
      this.httpClientService.isAuthenticated.next(true);
      if(this.jwtService.isTokenExpired()){
        this.myCookieService.delete('token');
        this.httpClientService.logout();
        this.googleService.signOut();
        this.httpClientService.isAuthenticated.next(false);
      }
    } else {
      this.httpClientService.isAuthenticated.next(false);
      this.myCookieService.delete('token');
    }


    // For english users
    console.log('%cHold Up!', 'color:red; font-size: 6rem; font-weight: bold;')
    console.log("%cIf someone told you to copy and paste something here, they're trying to hack you. Don't do it!", "color: white; font-size: 20px; font-weight: bold;")
    // For french users
    console.log('%cAttention!', 'color:red; font-size: 6rem; font-weight: bold;')
    console.log("%cSi quelqu'un vous a dit de copier et coller quelque chose ici, il essaie de vous pirater. Ne le faites pas!", "color: white; font-size: 20px; font-weight: bold;")

    if (this.myCookieService.get('token')) {
      this.httpClientService.isAuthenticated.next(true);
    }

    this.document.body.classList.add('dark');


    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else if (theme === 'light') {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }

    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        map(() => {
          const child: ActivatedRoute | null = this.route.firstChild;
          let title = child && child.snapshot.data['title'];
          if (title) {
            return title;
          }
        })
      )
      .subscribe((title) => {
        if (title) {
          this.titleService.setTitle(`T-flow - ${title}`);
        }
      });

  }


}
