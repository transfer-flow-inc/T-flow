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

  ngOnInit(): void {

    if (this.localStorage.get('theme') === undefined) {
      console.log('theme is undefined');
    }

    this.themeService.currentTheme$.subscribe((theme) => {
      if (theme === 'dark') {
        this.imgTheme = 'assets/images/logo_dark.png';
      } else {
        this.imgTheme = 'assets/images/logo_light.png';
      }
    });


  }


}
