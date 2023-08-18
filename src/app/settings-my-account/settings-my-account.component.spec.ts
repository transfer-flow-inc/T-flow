import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMyAccountComponent } from './settings-my-account.component';

describe('SettingsMyAccountComponent', () => {
  let component: SettingsMyAccountComponent;
  let fixture: ComponentFixture<SettingsMyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsMyAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsMyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
