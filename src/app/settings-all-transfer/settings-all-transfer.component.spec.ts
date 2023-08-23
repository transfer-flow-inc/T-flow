import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAllTransferComponent } from './settings-all-transfer.component';

describe('SettingsAllTransferComponent', () => {
  let component: SettingsAllTransferComponent;
  let fixture: ComponentFixture<SettingsAllTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsAllTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsAllTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
