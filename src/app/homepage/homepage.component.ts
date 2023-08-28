import {Component, OnInit} from '@angular/core';
import {CookiesService} from "../../services/cookies/cookies.service";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

  isLogged: boolean = false;

  constructor(
    private cookiesService: CookiesService,
    private flashMessageService: FlashMessageService
  ) {}

  ngOnInit(): void {
    this.isLogged = !!this.cookiesService.get('token');
  }


}
