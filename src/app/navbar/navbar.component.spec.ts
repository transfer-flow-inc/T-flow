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
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockHttpClientService: Partial<HttpClientService>;
  let mockJwtTokenService: Partial<JwtTokenService>;
  let mockCookiesService: Partial<CookiesService>;
  let themeService : ThemeServiceService;
  let mockFooterComponent: Partial<FooterComponent>;

  beforeEach(() => {

    mockHttpClientService = {
      isAuthenticated$: of(true),
      isAdministrator$: of(true),
    };

    mockJwtTokenService = {
      getUserRole: () => 'ADMIN',
    };

    mockCookiesService = {
      get: () => 'mock-token',
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

    themeService = TestBed.inject(ThemeServiceService);
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



  it('should initialize isDarkTheme and imgTheme based on localStorage', () => {
    localStorage.setItem('theme', 'light');
    expect(component.isDarkTheme).toBe(true);
    expect(component.imgTheme).toBe('assets/images/logo_with_text_dark.png');
  });

  it('should get the light theme', () => {
    spyOn(themeService, 'currentThemeSubject').and.returnValue(of('light'));
    component.toggleTheme();
    expect(component.imgTheme).toBe('assets/images/logo_with_text_light.png');
    expect(component.helpIcon).toBe(faMoon);
  });

  it('should get the isAdministrator', () => {

    spyOn(mockHttpClientService, 'isAuthenticated$').and.returnValue(of(true));
    spyOn(mockHttpClientService, 'isAdministrator$').and.returnValue(of(true));

    component.ngOnInit();

    expect(component.isAuthenticated).toBe(true);
    expect(component.isAdministrator).toBe(true);

  });



});
