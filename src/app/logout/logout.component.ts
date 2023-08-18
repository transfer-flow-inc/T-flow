import {Component, OnInit} from '@angular/core';
import {CookiesService} from "../../services/cookies/cookies.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private cookiesService: CookiesService
  ) { }

  ngOnInit(): void {

    let token = this.cookiesService.get('token');
    if (token) {
      this.cookiesService.delete('token');
      window.location.href = '/';
    }

  }


}
