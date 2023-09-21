import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAllProvidersComponent } from './dashboard-all-providers.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";
import {ThemeServiceService} from "../../services/theme-service/theme-service.service";

describe('DashboardAllProvidersComponent', () => {
  let component: DashboardAllProvidersComponent;
  let fixture: ComponentFixture<DashboardAllProvidersComponent>;
  let themeService: ThemeServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAllProvidersComponent, DashboardNavbarComponent ],
      imports: [ FontAwesomeModule, FontAwesomeTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAllProvidersComponent);
    themeService = TestBed.inject(ThemeServiceService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should update logos based on theme', () => {
   themeService.currentThemeSubject.next('light');
    component.ngOnInit();

    expect(component.logoGithub).toBe('assets/images/logo_github_dark.png');
    expect(component.logoSonarQube).toBe('assets/images/logo_sonarqube.svg');
  });



});
