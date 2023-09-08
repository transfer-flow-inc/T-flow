import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { FontAwesomeTestingModule } from "@fortawesome/angular-fontawesome/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { OAuthModule } from "angular-oauth2-oidc";
import { FooterComponent } from "../footer/footer.component";
import { ThemeServiceService } from "../../services/theme-service/theme-service.service";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { BehaviorSubject, of } from "rxjs";
import { HttpClientService } from "../../services/httpClient/http-client.service";

const themeServiceMock = {
  toggleTheme: jest.fn(),
  currentTheme$: of('light')
};

const httpClientServiceMock = {
  isAuthenticated$: new BehaviorSubject(false),
};

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [FontAwesomeTestingModule, HttpClientTestingModule, OAuthModule.forRoot()],
      providers: [
        { provide: ThemeServiceService, useValue: themeServiceMock },
        { provide: HttpClientService, useValue: httpClientServiceMock },
        FooterComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu correctly', () => {
    expect(component.isMenuOpen).toBeFalsy();
    component.openMenu();
    expect(component.isMenuOpen).toBeTruthy();
    expect(component.navIcon).toEqual(faXmark);
    component.openMenu();
    expect(component.isMenuOpen).toBeFalsy();
    expect(component.navIcon).toEqual(faBars);
  });

  it('should toggle popup correctly', () => {
    expect(component.isPopupOpen).toBeFalsy();
    component.togglePopup();
    expect(component.isPopupOpen).toBeTruthy();
    component.togglePopup();
    expect(component.isPopupOpen).toBeFalsy();
  });

  it('should toggle theme', () => {
    component.toggleTheme();
    expect(themeServiceMock.toggleTheme).toHaveBeenCalled();
  });

  it('should change isAuthenticated when HttpClientService emits', () => {
    expect(component.isAuthenticated).toBeFalsy();
    httpClientServiceMock.isAuthenticated$.next(true);
    expect(component.isAuthenticated).toBeTruthy();
  });

  it('should initialize correctly', () => {
    component.ngOnInit();
    expect(component.imgTheme).toEqual('assets/images/logo_with_text_dark.png'); // Or whatever you expect
  });
});
