import {Component, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faBars, faMoon, faSun, faXmark} from "@fortawesome/free-solid-svg-icons";
import {HttpClientService} from "../../services/http-client/http-client.service";
import {ThemeService} from "../../services/theme/theme.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navIcon: IconDefinition = faBars;
  navbarToggleValue: string = 'hide';
  isMenuOpen: boolean = false;
  imgTheme: string = 'assets/images/logo_with_text_dark.png';
  helpIcon: IconDefinition = faSun;
  isAuthenticated: boolean = false;
  iconShow: string = 'show';
  isAdministrator: boolean = false;

  constructor(
    private httpClientService: HttpClientService,
    private themeService: ThemeService,
  ) {
    this.themeService.applyTheme(this.themeService.currentThemeSubject.value);
  }

  ngOnInit() {
    this.httpClientService.isAuthenticated$.subscribe((loggedIn) => {
      this.isAuthenticated = loggedIn;
    });

    this.httpClientService.isAdministrator$.subscribe((isAdmin) => {
      this.isAdministrator = isAdmin;
    });


    this.getTheme();

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


  getTheme() {
    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.imgTheme = theme === 'dark' ? 'assets/images/logo_with_text_dark.png' : 'assets/images/logo_with_text_light.png';
      this.helpIcon = theme === 'dark' ? faSun : faMoon;
    });
  }


  toggleTheme(): void {

    this.themeService.currentThemeSubject.subscribe((theme) => {

      this.imgTheme = theme === 'dark' ? 'assets/images/logo_with_text_dark.png' : 'assets/images/logo_with_text_light.png';
      this.helpIcon = theme === 'dark' ? faSun : faMoon;

    });

    this.themeService.toggleTheme();

  }



}
