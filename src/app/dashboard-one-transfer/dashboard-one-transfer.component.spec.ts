import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOneTransferComponent } from './dashboard-one-transfer.component';
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";

describe('DashboardOneTransferComponent', () => {
  let component: DashboardOneTransferComponent;
  let fixture: ComponentFixture<DashboardOneTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardOneTransferComponent, DashboardNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOneTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
