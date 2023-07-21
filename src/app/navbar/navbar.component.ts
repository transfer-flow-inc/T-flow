import {Component} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faBars, faXmark} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  navIcon: IconDefinition = faBars;
  navbarToggleValue: string = 'hide';
  private isMenuOpen: boolean = false;

  constructor() { }

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
        this.navbarToggleValue = 'show';
      }
    }


}
