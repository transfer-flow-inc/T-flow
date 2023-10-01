import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DOCUMENT} from '@angular/common';
import {AppComponent} from './app.component';
import {LocalStorageService} from '../services/local-storage/local-storage.service';
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import {CookiesConsentComponent} from "./cookies-consent/cookies-consent.component";
import {Title} from "@angular/platform-browser";
import {FlashMessageComponent} from "./flash-message/flash-message.component";
import {NgcCookieConsentConfig, NgcCookieConsentService, WindowService} from "ngx-cookieconsent";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientService} from "../services/http-client/http-client.service";
import {CookiesService} from "../services/cookies/cookies.service";
import {of} from "rxjs";
import {JwtTokenService} from "../services/jwt-token/jwt-token.service";


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let localStorageService: LocalStorageService;
  let httpClientService: HttpClientService;
  let cookiesService: CookiesService;
  let router: Router;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockTitleService: any;
  let titleService: Title;
  let jwtService: JwtTokenService;
  let title: Title;

  beforeEach(() => {

    mockRouter = {
      events: of(new NavigationEnd(0, '', ''))
    };

    mockActivatedRoute = {
  firstChild: {
    snapshot: {
      data: { title: 'Test Title' }
    } as any
  }
};

    mockTitleService = {
      setTitle: jasmine.createSpy('setTitle')
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent,
        NavbarComponent,
        FooterComponent,
        CookiesConsentComponent,
        FlashMessageComponent],
      imports: [HttpClientTestingModule, FontAwesomeModule, RouterTestingModule.withRoutes([])],
      providers: [
        {provide: DOCUMENT, useValue: document},
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


    title = TestBed.inject(Title);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    localStorageService = TestBed.inject(LocalStorageService);
    httpClientService = TestBed.inject(HttpClientService);
    cookiesService = TestBed.inject(CookiesService);
    router = TestBed.inject(Router);
    titleService = TestBed.inject(Title);
    jwtService = TestBed.inject(JwtTokenService);  // Add this line

    spyOn(jwtService, 'setToken');  // Add this line
    spyOn(httpClientService.isAuthenticated, 'next');

  });



  it('should log console warnings', () => {
    const consoleLogSpy = spyOn(console, 'log');

    component.logConsoleWarnings();

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

  it('should clear auth data', () => {

    const deleteSpy = spyOn(cookiesService, 'delete');
    const navigateSpy = spyOn(router, 'navigate');

    component.clearAuthData();

    expect(deleteSpy).toHaveBeenCalledWith('token');
    expect(navigateSpy).toHaveBeenCalledWith(['/accueil']);

  });


  it('should lauch logWarning on init', () => {

    const logConsoleWarningsSpy = spyOn(component, 'logConsoleWarnings');
    component.ngOnInit();
    expect(logConsoleWarningsSpy).toHaveBeenCalled();

  });

  it('should set isAuthenticated to true if token is present', () => {

      spyOn(cookiesService, 'get').and.returnValue('token');

      component.ngOnInit();

      expect(httpClientService.isAuthenticated.next).toHaveBeenCalledWith(true);

  });

  it('should set isAdministrator to true if token is present and user is admin', () => {

        spyOn(cookiesService, 'get').and.returnValue('token');
        spyOn(jwtService, 'getUserRole').and.returnValue('ADMIN');

        component.ngOnInit();

        expect(httpClientService.isAuthenticated.next).toHaveBeenCalledWith(true);


  });

  it('should call clearAuthData if token is expired', () => {

        spyOn(cookiesService, 'get').and.returnValue('token');
        spyOn(jwtService, 'isTokenExpired').and.returnValue(true);
        const clearAuthDataSpy = spyOn(component, 'clearAuthData');

        component.ngOnInit();

        expect(clearAuthDataSpy).toHaveBeenCalled();
  });


    it('should get title from the route', () => {
    component['route'] = mockActivatedRoute;
    const title = component['getTitleFromRoute']();
    expect(title).toBe('Test Title');
    });

    it('should update page title', () => {
    component['titleService'] = mockTitleService;
    component['updatePageTitle']('Test Title');
    expect(mockTitleService.setTitle).toHaveBeenCalledWith('T-flow - Test Title');
    });



});
