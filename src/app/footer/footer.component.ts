import {Component,OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {BehaviorSubject} from "rxjs";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  imgTheme: string = "assets/images/logo_dark.png"
  theme: BehaviorSubject<string> = this.navbarComponent.theme;


  constructor(
    private navbarComponent: NavbarComponent
  ) {
  }

  ngOnInit(): void {
    this.getTheme();
  }

  getTheme() {
    console.log(this.theme.value)
  }

}
