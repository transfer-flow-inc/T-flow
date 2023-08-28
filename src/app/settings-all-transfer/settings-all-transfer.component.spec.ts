import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAllTransferComponent } from './settings-all-transfer.component';
import {SettingsNavbarComponent} from "../settings-navbar/settings-navbar.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SettingsAllTransferComponent', () => {
  let component: SettingsAllTransferComponent;
  let fixture: ComponentFixture<SettingsAllTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsAllTransferComponent, SettingsNavbarComponent ],
      imports: [HttpClientTestingModule]
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
