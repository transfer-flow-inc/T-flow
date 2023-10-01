import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../services/theme/theme.service";
import {HttpClientService} from "../../services/http-client/http-client.service";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  imgTheme: string = '';
  isAuthenticated: boolean = false;

  constructor(
    private themeService: ThemeService,
    private httpClientService : HttpClientService
  ) {
  }

  ngOnInit() {
    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.imgTheme = 'dark' === theme ? 'assets/images/logo_dark.png' : 'assets/images/logo_light.png';
    });
    this.httpClientService.isAuthenticated.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }




}
