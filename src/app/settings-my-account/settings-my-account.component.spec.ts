import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SettingsMyAccountComponent } from './settings-my-account.component';
import { SettingsNavbarComponent } from '../settings-navbar/settings-navbar.component';
import {InjectionToken} from "@angular/core";

describe('SettingsMyAccountComponent', () => {
  let component: SettingsMyAccountComponent;
  let fixture: ComponentFixture<SettingsMyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsMyAccountComponent, SettingsNavbarComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsMyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
