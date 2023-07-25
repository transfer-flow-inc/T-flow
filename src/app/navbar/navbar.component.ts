import {Component, Inject, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faBars, faGear, faXmark} from "@fortawesome/free-solid-svg-icons";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navIcon: IconDefinition = faBars;
  navbarToggleValue: string = 'hide';
  private isMenuOpen: boolean = false;
  imgTheme: string = 'assets/images/logo-light.png';
  helpIcon: IconDefinition = faGear;
  popup: string = 'hidden';
  closeIcon: IconDefinition = faXmark;
  isDarkTheme: boolean = true;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  openMenu() {

    this.isMenuOpen = !this.isMenuOpen;
    this.navIcon = this.isMenuOpen ? faXmark : faBars;

    if (!this.isMenuOpen) {
      // add a delay to the toggle to allow the animation to complete
      setTimeout(() => {
        this.navbarToggleValue = 'hide';
      }, 200);
      this.navbarToggleValue = 'reverse';
    } else {
      this.navbarToggleValue = 'showNav';
    }
  }

  togglePopup() {
    this.popup = this.popup === 'hidden' ? 'show' : 'hidden';
  }


  toggleTheme(): void {

    this.document.body.classList.toggle('dark');
    this.document.body.classList.toggle('light');

    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
      this.imgTheme = 'assets/images/logo-dark.png';
    } else {
      localStorage.setItem('theme', 'light');
      this.imgTheme = 'assets/images/logo-light.png';
    }


  }

  ngOnInit() {

    this.isDarkTheme = localStorage.getItem('theme') !== 'light';
    this.imgTheme = this.isDarkTheme ? 'assets/images/logo-dark.png' : 'assets/images/logo-light.png';

  }

}
