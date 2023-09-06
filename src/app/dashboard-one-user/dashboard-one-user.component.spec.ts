import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOneUserComponent } from './dashboard-one-user.component';
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";

describe('DashboardOneUserComponent', () => {
  let component: DashboardOneUserComponent;
  let fixture: ComponentFixture<DashboardOneUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardOneUserComponent, DashboardNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOneUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
