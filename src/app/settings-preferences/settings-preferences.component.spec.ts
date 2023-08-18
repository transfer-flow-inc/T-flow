import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPreferencesComponent } from './settings-preferences.component';
import {SettingsNavbarComponent} from "../settings-navbar/settings-navbar.component";

describe('SettingsPreferencesComponent', () => {
  let component: SettingsPreferencesComponent;
  let fixture: ComponentFixture<SettingsPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPreferencesComponent, SettingsNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
