import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { ThemeServiceService } from '../../services/theme-service/theme-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
      isAuthenticated$: of(true), // Mock the observable with a value
    };

    mockJwtTokenService = {
      getUserRole: () => 'ADMIN', // Mock the getUserRole method
    };

    mockCookiesService = {
      get: () => 'mock-token', // Mock the get method
    };

    mockThemeService = {
      getCurrentTheme: () => 'light', // Mock the getCurrentTheme method
      toggleTheme: () => {}, // Mock the toggleTheme method
    };

    mockFooterComponent = {
      ngOnInit: () => {}, // Mock the ngOnInit method of FooterComponent
    };



    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [FontAwesomeModule, HttpClientTestingModule],
      providers: [
        { provide: HttpClientService, useValue: mockHttpClientService },
        { provide: JwtTokenService, useValue: mockJwtTokenService },
        { provide: CookiesService, useValue: mockCookiesService },
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

  it('should toggle isPopupOpen and update popupToggleValue', () => {
  // Initial state: isPopupOpen should be false, and popupToggleValue should be 'hidden'
  expect(component.isPopupOpen).toBe(false);
  expect(component.popupToggleValue).toBe('hidden');

  // Call togglePopup() to open the popup
  component.togglePopup();

  // After calling togglePopup, isPopupOpen should be true, and popupToggleValue should be 'show'
  expect(component.isPopupOpen).toBe(true);
  expect(component.popupToggleValue).toBe('show');

  // Call togglePopup() again to close the popup
  component.togglePopup();

  // After the second call, isPopupOpen should be false again, and popupToggleValue should be 'reversePopup'
  expect(component.isPopupOpen).toBe(false);
  expect(component.popupToggleValue).toBe('reversePopup');
});

  it('should toggle isMenuOpen and update navbarToggleValue and iconShow', () => {
  // Initial state: isMenuOpen should be false, navbarToggleValue should be 'hide', and iconShow should be 'show'
  expect(component.isMenuOpen).toBe(false);
  expect(component.navbarToggleValue).toBe('hide');
  expect(component.iconShow).toBe('show');

  // Call openMenu() to open the menu
  component.openMenu();

  // After calling openMenu, isMenuOpen should be true, navbarToggleValue should be 'showNav', and iconShow should be 'hidden'
  expect(component.isMenuOpen).toBe(true);
  expect(component.navbarToggleValue).toBe('showNav');
  expect(component.iconShow).toBe('hidden');

  // Call openMenu() again to close the menu
  component.openMenu();

  // After the second call, isMenuOpen should be false again, navbarToggleValue should be 'reverse', and iconShow should be 'hidden'
  expect(component.isMenuOpen).toBe(false);
  expect(component.navbarToggleValue).toBe('reverse');
  expect(component.iconShow).toBe('hidden');
});

  it('should initialize isAuthenticated based on HttpClientService', () => {
    expect(component.isAuthenticated).toBe(false);

    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.isAuthenticated).toBe(true);
  });

  it('should initialize isAdministrator based on JwtTokenService and CookiesService', () => {
    expect(component.isAdministrator).toBe(false);

    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.isAdministrator).toBe(true);
  });

  it('should initialize isDarkTheme and imgTheme based on localStorage', () => {
  // Set the theme to 'light' in localStorage
  localStorage.setItem('theme', 'light');

  // Expect isDarkTheme to be true because 'light' is not 'light'
  expect(component.isDarkTheme).toBe(true);

  // Expect imgTheme to be 'assets/images/logo_with_text_dark.png'
  expect(component.imgTheme).toBe('assets/images/logo_with_text_dark.png');
});






});
