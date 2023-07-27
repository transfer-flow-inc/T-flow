import {Component, OnInit, Inject} from '@angular/core';
import { NgcCookieConsentService, NgcInitializationErrorEvent, NgcInitializingEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from "ngx-cookieconsent";
import {filter, map, Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";

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
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ){}

  ngOnInit() {

    this.router.events.subscribe((val) => {

        if(val instanceof NavigationEnd){
          console.log(val);
        }
    });

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
