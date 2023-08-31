import {Component, Inject, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faBars, faGear, faXmark} from "@fortawesome/free-solid-svg-icons";
import {DOCUMENT} from "@angular/common";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {FooterComponent} from "../footer/footer.component";
import {ThemeServiceService} from "../../services/theme-service/theme-service.service";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";

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

  constructor(
              private httpClientService: HttpClientService,
              private themeService: ThemeServiceService,
              private footer: FooterComponent,
              private localStorage : LocalStorageService
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

    this.themeService.currentTheme$.subscribe((theme) => {
      this.imgTheme = theme === 'light' ? 'assets/images/logo_with_text_light.png' : 'assets/images/logo_with_text_dark.png';
    })
    this.footer.ngOnInit()

    this.themeService.toggleTheme();
  }

  ngOnInit() {


    this.httpClientService.isAuthenticated$.subscribe((loggedIn) => {
      this.isAuthenticated = loggedIn;
    });
    this.isDarkTheme = localStorage.getItem('theme') !== 'light';
    this.imgTheme = this.isDarkTheme ? 'assets/images/logo_with_text_dark.png' : 'assets/images/logo_with_text_light.png';

  }

}
