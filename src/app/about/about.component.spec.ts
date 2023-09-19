import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {ThemeServiceService} from "../../services/theme-service/theme-service.service";

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let themeService: ThemeServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      imports: [ FontAwesomeTestingModule ]
    })
    .compileComponents();

    themeService = TestBed.inject(ThemeServiceService);
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




});
