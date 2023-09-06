import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAllTransferComponent } from './dashboard-all-transfer.component';
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";

describe('DashboardAllTransferComponent', () => {
  let component: DashboardAllTransferComponent;
  let fixture: ComponentFixture<DashboardAllTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAllTransferComponent, DashboardNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAllTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
