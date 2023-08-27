import {Component, Inject, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faBars, faGear, faXmark} from "@fortawesome/free-solid-svg-icons";
import {DOCUMENT} from "@angular/common";
import {CookiesService} from "../../services/cookies/cookies.service";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {GoogleSsoService} from "../../services/sso/Google/google-sso.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navIcon: IconDefinition = faBars;
  navbarToggleValue: string = 'hide';
  popupToggleValue: string = 'hidden';
  private isMenuOpen: boolean = false;
  isPopupOpen: boolean = false;
  imgTheme: string = 'assets/images/logo_with_text_dark.png';
  helpIcon: IconDefinition = faGear;
  popup: string = 'hidden';
  closeIcon: IconDefinition = faXmark;
  isDarkTheme: boolean = true;
  isAuthenticated: boolean = false;
  iconShow: string = 'show';

  constructor(@Inject(DOCUMENT) private document: Document,
              private httpClientService: HttpClientService,
  ) {
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

  togglePopup() {

    this.isPopupOpen = !this.isPopupOpen;

    if (!this.isPopupOpen) {
      setTimeout(() => {
        this.popupToggleValue = 'hidden';
      }, 200);
      this.popupToggleValue = 'reversePopup';
    } else {
      this.popupToggleValue = 'show';
    }

  }


  toggleTheme(): void {

    this.document.body.classList.toggle('dark');
    this.document.body.classList.toggle('light');

    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
      this.imgTheme = 'assets/images/logo_with_text_dark.png';
    } else {
      localStorage.setItem('theme', 'light');
      this.imgTheme = 'assets/images/logo_with_text_light.png';
    }


  }

  ngOnInit() {

    this.httpClientService.isAuthenticated$.subscribe((loggedIn) => {
      this.isAuthenticated = loggedIn;
    });
    this.isDarkTheme = localStorage.getItem('theme') !== 'light';
    this.imgTheme = this.isDarkTheme ? 'assets/images/logo_with_text_dark.png' : 'assets/images/logo_with_text_light.png';

  }

}
