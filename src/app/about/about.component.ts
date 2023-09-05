import {Component, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {ThemeServiceService} from "../../services/theme-service/theme-service.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{

  githubIcon: IconDefinition = faGithub;
  imgTheme: string = '';

  constructor(
    private themeService: ThemeServiceService
  ) {

  }

  ngOnInit() {
    this.themeService.currentTheme$.subscribe((theme) => {
      if (theme === 'dark') {
        this.imgTheme = 'assets/images/logo_light.png';
      } else {
        this.imgTheme = 'assets/images/logo_dark.png';
      }
    });
  }

}
