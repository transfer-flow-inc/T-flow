import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SettingsAllTransferComponent } from './settings-all-transfer.component';
import { JwtTokenService } from '../../services/jwt-token/jwt-token.service';
import { HttpClientService } from '../../services/httpClient/http-client.service';
import { of, throwError } from 'rxjs';
import {SettingsNavbarComponent} from "../settings-navbar/settings-navbar.component";

describe('SettingsAllTransferComponent', () => {
  let component: SettingsAllTransferComponent;
  let fixture: ComponentFixture<SettingsAllTransferComponent>;
  let mockJwtTokenService: Partial<JwtTokenService>;
  let mockHttpClientService: Partial<HttpClientService>;

  beforeEach(() => {
    mockJwtTokenService = {
      getToken: jest.fn().mockReturnValue('some-token'),
      getUserId: jest.fn().mockReturnValue('user-id'),
    };

    mockHttpClientService = {
      getAllFolderByUserId: jest.fn().mockReturnValue(of([{ id: '1', name: 'folder1' }]))
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SettingsAllTransferComponent, SettingsNavbarComponent],
      providers: [
        { provide: JwtTokenService, useValue: mockJwtTokenService },
        { provide: HttpClientService, useValue: mockHttpClientService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsAllTransferComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user ID from JwtTokenService', () => {
    component.ngOnInit();
    expect(mockJwtTokenService.getUserId).toHaveBeenCalled();
    expect(component.userId).toBe('user-id');
  });

  it('should load all folders when initialized', () => {
    component.ngOnInit();
    expect(mockHttpClientService.getAllFolderByUserId).toHaveBeenCalled();
    expect(component.allFolder.length).toBe(1);
    expect(component.isFolderEmpty).toBe(false);
  });

  it('should set error message when API call fails', () => {
    mockHttpClientService.getAllFolderByUserId = jest.fn().mockReturnValue(throwError('An error occurred'));
    component.ngOnInit();
    expect(component.errorMessage).toBe(true);
  });

  // ... more tests as needed
});
