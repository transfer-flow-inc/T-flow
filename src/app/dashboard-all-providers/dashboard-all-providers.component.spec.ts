import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAllProvidersComponent } from './dashboard-all-providers.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";

describe('DashboardAllProvidersComponent', () => {
  let component: DashboardAllProvidersComponent;
  let fixture: ComponentFixture<DashboardAllProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAllProvidersComponent, DashboardNavbarComponent ],
      imports: [ FontAwesomeModule, FontAwesomeTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAllProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
