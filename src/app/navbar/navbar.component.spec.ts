import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NavbarComponent} from './navbar.component';
import {ThemeServiceService} from '../../services/theme-service/theme-service.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {FooterComponent} from "../footer/footer.component";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {CookiesService} from "../../services/cookies/cookies.service";
import {of} from "rxjs";


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockHttpClientService: Partial<HttpClientService>;
  let mockJwtTokenService: Partial<JwtTokenService>;
  let mockCookiesService: Partial<CookiesService>;
  let mockThemeService: Partial<ThemeServiceService>;
  let mockFooterComponent: Partial<FooterComponent>;

  beforeEach(() => {

    mockHttpClientService = {
      isAuthenticated$: of(true),
    };

    mockJwtTokenService = {
      getUserRole: () => 'ADMIN',
    };

    mockCookiesService = {
      get: () => 'mock-token',
    };

    mockThemeService = {
      getCurrentTheme: () => 'light',
      toggleTheme: () => {
      },
    };

    mockFooterComponent = {
      ngOnInit: () => {
      },
    };


    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [FontAwesomeModule, HttpClientTestingModule],
      providers: [
        {provide: HttpClientService, useValue: mockHttpClientService},
        {provide: JwtTokenService, useValue: mockJwtTokenService},
        {provide: CookiesService, useValue: mockCookiesService},
        ThemeServiceService,
        HttpClient,
        OAuthService,
        DateTimeProvider,
        UrlHelperService,
        OAuthLogger,
        FooterComponent
      ],
    });

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    spyOn(FooterComponent.prototype, 'ngOnInit').and.callThrough();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isMenuOpen and update navbarToggleValue and iconShow', () => {
    expect(component.isMenuOpen).toBe(false);
    expect(component.navbarToggleValue).toBe('hide');
    expect(component.iconShow).toBe('show');
    component.openMenu();
    expect(component.isMenuOpen).toBe(true);
    expect(component.navbarToggleValue).toBe('showNav');
    expect(component.iconShow).toBe('hidden');
    component.openMenu();
    expect(component.isMenuOpen).toBe(false);
    expect(component.navbarToggleValue).toBe('reverse');
    expect(component.iconShow).toBe('hidden');
  });

  it('should initialize isAuthenticated based on HttpClientService', () => {
    expect(component.isAuthenticated).toBe(false);
    fixture.detectChanges();
    expect(component.isAuthenticated).toBe(true);
  });

  it('should initialize isAdministrator based on JwtTokenService and CookiesService', () => {
    expect(component.isAdministrator).toBe(false);
    fixture.detectChanges();
    expect(component.isAdministrator).toBe(true);
  });

  it('should initialised isAdministrator to false if user role is USER', () => {

    expect(component.isAdministrator).toBe(false);
    mockJwtTokenService.getUserRole = () => 'USER';
    fixture.detectChanges();
    expect(component.isAdministrator).toBe(false);

  });

  it('should initialize isDarkTheme and imgTheme based on localStorage', () => {
    localStorage.setItem('theme', 'light');
    expect(component.isDarkTheme).toBe(true);
    expect(component.imgTheme).toBe('assets/images/logo_with_text_dark.png');
  });


});
