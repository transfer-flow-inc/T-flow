import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAdminPanelComponent } from './settings-admin-panel.component';
import {SettingsNavbarComponent} from "../settings-navbar/settings-navbar.component";

describe('SettingsAdminPanelComponent', () => {
  let component: SettingsAdminPanelComponent;
  let fixture: ComponentFixture<SettingsAdminPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsAdminPanelComponent, SettingsNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
