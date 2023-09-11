import { TestBed, ComponentFixture} from '@angular/core/testing';
import { ContactUsComponent } from './contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FlashMessageService } from '../../services/flash-message/flash-message.service';
import { HttpClientService } from '../../services/httpClient/http-client.service';
import { OAuthLogger, UrlHelperService, DateTimeProvider, OAuthService } from "angular-oauth2-oidc";

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactUsComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]), // Add routes here
      ],
      providers: [
        FlashMessageService,
        HttpClientService,
        OAuthLogger,
        UrlHelperService,
        DateTimeProvider,
        OAuthService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
