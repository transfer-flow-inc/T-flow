import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOneSupportComponent } from './dashboard-one-support.component';

describe('DashboardOneSupportComponent', () => {
  let component: DashboardOneSupportComponent;
  let fixture: ComponentFixture<DashboardOneSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardOneSupportComponent ]
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
