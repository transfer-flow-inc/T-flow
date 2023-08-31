import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ThemeServiceService} from "../../services/theme-service/theme-service.service";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  imgTheme : string = this.themeService.getCurrentTheme() === 'dark' ? 'assets/images/logo_light.png' : 'assets/images/logo_dark.png';

  constructor(
    private themeService: ThemeServiceService,
  ) {}

  ngOnInit(): void {

    this.themeService.currentTheme$.subscribe((theme) => {
      this.imgTheme = theme === 'light' ? 'assets/images/logo_light.png' : 'assets/images/logo_dark.png';
    })


  }





}
