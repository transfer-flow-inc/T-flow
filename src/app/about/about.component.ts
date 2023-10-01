import {Component, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {ThemeService} from "../../services/theme/theme.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{

  githubIcon: IconDefinition = faGithub;
  imgTheme: string = '';

  constructor(
    private themeService: ThemeService
  ) {

  }

  ngOnInit() {
    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.imgTheme = theme === 'light' ? 'assets/images/logo_dark.png' : 'assets/images/logo_light.png';
    });
  }

}
