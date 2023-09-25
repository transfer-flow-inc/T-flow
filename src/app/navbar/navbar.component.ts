import {Component, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faBars, faLightbulb, faMoon, faSun, faXmark} from "@fortawesome/free-solid-svg-icons";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {ThemeServiceService} from "../../services/theme-service/theme-service.service";
import {FooterComponent} from "../footer/footer.component";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {CookiesService} from "../../services/cookies/cookies.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navIcon: IconDefinition = faBars;
  navbarToggleValue: string = 'hide';
  popupToggleValue: string = 'hidden';
  isMenuOpen: boolean = false;
  isPopupOpen: boolean = false;
  imgTheme: string = 'assets/images/logo_with_text_dark.png';
  helpIcon: IconDefinition = faSun;
  popup: string = 'hidden';
  closeIcon: IconDefinition = faXmark;
  isDarkTheme: boolean = true;
  isAuthenticated: boolean = false;
  iconShow: string = 'show';
  isAdministrator: boolean = false;

  constructor(
    private httpClientService: HttpClientService,
    private themeService: ThemeServiceService,
    private footer: FooterComponent,
    private jwtService: JwtTokenService,
    private cookieService: CookiesService,
  ) {
  }

  ngOnInit() {
    this.httpClientService.isAuthenticated$.subscribe((loggedIn) => {
      this.isAuthenticated = loggedIn;
      if (this.jwtService.getUserRole() === 'ADMIN') {
          this.isAdministrator = true;
      } else if (this.jwtService.getUserRole() === 'USER') {
          this.isAdministrator = false;
      }
    });


    this.isDarkTheme = localStorage.getItem('theme') !== 'light';
    this.imgTheme = this.isDarkTheme ? 'assets/images/logo_with_text_dark.png' : 'assets/images/logo_with_text_light.png';
    this.helpIcon = this.isDarkTheme ? faSun : faMoon;

  }

  openMenu() {

    this.isMenuOpen = !this.isMenuOpen;
    this.navIcon = this.isMenuOpen ? faXmark : faBars;

    if (!this.isMenuOpen) {
      setTimeout(() => {
        this.navbarToggleValue = 'hide';
        this.iconShow = 'hidden';
      }, 200);
      this.navbarToggleValue = 'reverse';
    } else {
      this.navbarToggleValue = 'showNav';
      this.iconShow = 'hidden';
    }
  }




  toggleTheme(): void {

    this.themeService.currentThemeSubject.subscribe((theme) => {

      this.imgTheme = theme === 'dark' ? 'assets/images/logo_with_text_dark.png' : 'assets/images/logo_with_text_light.png';
      this.helpIcon = theme === 'dark' ? faSun : faMoon;

    });

    this.themeService.toggleTheme();

  }



}
