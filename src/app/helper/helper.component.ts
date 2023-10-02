import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {ThemeService} from "../../services/theme/theme.service";

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.css']
})
export class HelperComponent implements OnInit {

  angleRight: IconDefinition = faAngleRight;

  angleDown: IconDefinition = faAngleDown;

  first: boolean = false;

  second: boolean = false;

  third: boolean = false;

  fourth: boolean = false;

  isDarkTheme: boolean = false;

  constructor(
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService.currentThemeSubject.subscribe((theme) => {
      if (theme === 'dark') {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    });
  }

  changeIcon(clicked: number): void {
    if (clicked === 1) {
      this.first = !this.first;
    } else if (clicked === 2) {
      this.second = !this.second;
    }  else if (clicked === 3) {
      this.third = !this.third;
    } else if (clicked === 4) {
      this.fourth = !this.fourth;
    }
  }

}
