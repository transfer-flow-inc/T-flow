import {Component, OnInit} from '@angular/core';
import {ThemeServiceService} from "../../services/theme-service/theme-service.service";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  imgTheme: string = '';

  constructor(
    private themeService: ThemeServiceService,
    private localStorage: LocalStorageService,
  ) {
  }

  ngOnInit() {
    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.imgTheme = 'dark' === theme ? 'assets/images/logo_dark.png' : 'assets/images/logo_light.png';
    });
  }




}
