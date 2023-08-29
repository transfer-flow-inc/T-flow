import { Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  imgTheme: string = "assets/images/logo_dark.png"

  constructor(
  ) {
  }


  ngOnInit() {

  }

}
