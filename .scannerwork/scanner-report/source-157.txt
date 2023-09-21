import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOneSupportComponent } from './dashboard-one-support.component';
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";

describe('DashboardOneSupportComponent', () => {
  let component: DashboardOneSupportComponent;
  let fixture: ComponentFixture<DashboardOneSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardOneSupportComponent ],
      imports: [FontAwesomeTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOneSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
