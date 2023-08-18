import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSubscriptionComponent } from './settings-subscription.component';
import {SettingsNavbarComponent} from "../settings-navbar/settings-navbar.component";

describe('SettingsSubscriptionComponent', () => {
  let component: SettingsSubscriptionComponent;
  let fixture: ComponentFixture<SettingsSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsSubscriptionComponent, SettingsNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
