import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOneTransferComponent } from './dashboard-one-transfer.component';
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";
import {Observable, of} from "rxjs";
import {ActivatedRoute} from "@angular/router";

describe('DashboardOneTransferComponent', () => {
  let component: DashboardOneTransferComponent;
  let fixture: ComponentFixture<DashboardOneTransferComponent>;
  let activatedRoute: { params: Observable<{ id: string }> };

  beforeEach(async () => {
    activatedRoute = {
    params: of({ id: 'someId' })  // Using RxJS 'of' to create an Observable
    };
    await TestBed.configureTestingModule({
      declarations: [ DashboardOneTransferComponent, DashboardNavbarComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOneTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get query parameters correctly', () => {
  component.getQueryParams();
  expect(component.transferID).toBe('someId');
});

});
