import {Component, OnInit} from '@angular/core';
import {ThemeServiceService} from "../../services/theme-service/theme-service.service";
import {HttpClientService} from "../../services/httpClient/http-client.service";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  imgTheme: string = '';
  isAuthenticated: boolean = false;

  constructor(
    private themeService: ThemeServiceService,
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
