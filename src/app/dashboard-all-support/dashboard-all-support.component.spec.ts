import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAllSupportComponent } from './dashboard-all-support.component';

describe('DashboardAllSupportComponent', () => {
  let component: DashboardAllSupportComponent;
  let fixture: ComponentFixture<DashboardAllSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAllSupportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAllSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
