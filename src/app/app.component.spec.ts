import {ComponentFixture,TestBed} from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { AppComponent } from './app.component';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {RouterOutlet} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import {CookiesConsentComponent} from "./cookies-consent/cookies-consent.component";
import {Title} from "@angular/platform-browser";
import {FlashMessageComponent} from "./flash-message/flash-message.component";
import {NgcCookieConsentConfig, NgcCookieConsentService, WindowService} from "ngx-cookieconsent";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterTestingModule} from "@angular/router/testing";



describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let localStorageService: LocalStorageService;

  beforeEach(() => {


    TestBed.configureTestingModule({
      declarations: [AppComponent,
        NavbarComponent,
        FooterComponent,
        CookiesConsentComponent,
        FlashMessageComponent],
      imports: [ HttpClientTestingModule, FontAwesomeModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: DOCUMENT, useValue: document },
        NavbarComponent,
        FooterComponent,
        CookiesConsentComponent,
        LocalStorageService,
        OAuthService,
        OAuthLogger,
        UrlHelperService,
        DateTimeProvider,
        RouterOutlet,
        Title,
        NgcCookieConsentService,
        WindowService,
        NgcCookieConsentConfig,
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should handle the theme correctly', () => {
    const getSpy = spyOn(localStorageService, 'get').and.returnValue('dark');

    component.handleTheme();

    expect(document.body.classList).toContain('dark');

    expect(getSpy).toHaveBeenCalledWith('theme');
  });

  it('should log console warnings', () => {
  // Create spies for console.log to capture log messages
  const consoleLogSpy = spyOn(console, 'log');

  // Call the logConsoleWarnings method
  component.logConsoleWarnings();

  // Expect console.log to have been called with the expected warning messages
  expect(consoleLogSpy.calls.allArgs()).toEqual([
    ['%cHold Up!', 'color:red; font-size: 6rem; font-weight: bold;'],
    [
      "%cIf someone told you to copy and paste something here, they're trying to hack you. Don't do it!",
      "color: white; font-size: 20px; font-weight: bold;"
    ],
    ['%cAttention!', 'color:red; font-size: 6rem; font-weight: bold;'],
    [
      "%cSi quelqu'un vous a dit de copier et coller quelque chose ici, il essaie de vous pirater. Ne le faites pas!",
      "color: white; font-size: 20px; font-weight: bold;"
    ],
  ]);
});




});
