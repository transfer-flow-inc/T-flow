import {Component, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import {ThemeService} from "../../../services/theme/theme.service";

@Component({
  selector: 'app-dashboard-all-providers',
  templateUrl: './dashboard-all-providers.component.html',
  styleUrls: ['./dashboard-all-providers.component.css']
})
export class DashboardAllProvidersComponent implements OnInit {

  rightFrontBracket : IconDefinition = faUpRightFromSquare;
  logoGithub = '';
  logoSonarQube = '';

  constructor(
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.logoGithub = 'dark' === theme ? 'assets/images/logo_github.png' : 'assets/images/logo_github_dark.png';
      this.logoSonarQube = 'light' === theme ? 'assets/images/logo_sonarqube.svg' : 'assets/images/logo_sonarqube_dark.svg';
    });
  }

}
