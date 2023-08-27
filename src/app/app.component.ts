import {Component, OnInit, Inject} from '@angular/core';
import {
  NgcCookieConsentService,
  NgcInitializationErrorEvent,
  NgcInitializingEvent,
  NgcNoCookieLawEvent,
  NgcStatusChangeEvent
} from "ngx-cookieconsent";
import {filter, map, Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";
import {CookiesService} from "../services/cookies/cookies.service";
import {HttpClientService} from "../services/httpClient/http-client.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;


  constructor(
    private cookieService: NgcCookieConsentService,
    private myCookieService: CookiesService,
    private httpClientService: HttpClientService,
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {
  }




  ngOnInit() {


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

    this.popupOpenSubscription = this.cookieService.popupOpen$.subscribe(
      () => {

      });

    this.popupCloseSubscription = this.cookieService.popupClose$.subscribe(
      () => {

      });

    this.initializingSubscription = this.cookieService.initializing$.subscribe(
      (event: NgcInitializingEvent) => {
        console.log(`initializing: ${JSON.stringify(event)}`);
      });

    this.initializedSubscription = this.cookieService.initialized$.subscribe(
      () => {
        console.log(`initialized: ${JSON.stringify(event)}`);
      });

    this.initializationErrorSubscription = this.cookieService.initializationError$.subscribe(
      (event: NgcInitializationErrorEvent) => {
        console.log(`initializationError: ${JSON.stringify(event.error?.message)}`);
      });

    this.statusChangeSubscription = this.cookieService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {

      });

    this.revokeChoiceSubscription = this.cookieService.revokeChoice$.subscribe(
      () => {

      });

    this.noCookieLawSubscription = this.cookieService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {

      });

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
