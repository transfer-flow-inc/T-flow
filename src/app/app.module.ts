import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgcCookieConsentModule} from 'ngx-cookieconsent';
import {NavbarComponent} from './navbar/navbar.component';
import {NgOptimizedImage, registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HomepageComponent} from './homepage/homepage.component';
import {CguComponent} from './cgu/cgu.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {TransferComponent} from './transfer/transfer.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from "@angular/forms";
import {RegisterComponent} from './register/register.component';
import {FileUploadModule} from "ng2-file-upload";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SettingsNavbarComponent} from './settings/settings-navbar/settings-navbar.component';
import {SettingsMyAccountComponent} from './settings/settings-my-account/settings-my-account.component';
import {SettingsSubscriptionComponent} from './settings/settings-subscription/settings-subscription.component';
import {LogoutComponent} from './logout/logout.component';
import {FlashMessageService} from "../services/flash-message/flash-message.service";
import {OAuthModule} from "angular-oauth2-oidc";
import {SettingsAllTransferComponent} from './settings/settings-all-transfer/settings-all-transfer.component';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';
import {DownloadComponent} from './download/download.component';
import {FlashMessageComponent} from './flash-message/flash-message.component';
import {cookieConfig, CookiesConsentComponent} from './cookies-consent/cookies-consent.component';
import {FooterComponent} from './footer/footer.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {ValidateEmailComponent} from './validate-email/validate-email.component';
import {HttpInterceptorService} from "../services/http-interceptor/http-interceptor.service";
import {AboutComponent} from './about/about.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import { DashboardNavbarComponent } from './dashboard/dashboard-navbar/dashboard-navbar.component';
import { DashboardAllUsersComponent } from './dashboard/dashboard-all-users/dashboard-all-users.component';
import { DashboardOneUserComponent } from './dashboard/dashboard-one-user/dashboard-one-user.component';
import { DashboardAllTransferComponent } from './dashboard/dashboard-all-transfer/dashboard-all-transfer.component';
import { DashboardOneTransferComponent } from './dashboard/dashboard-one-transfer/dashboard-one-transfer.component';
import { DashboardAllSupportComponent } from './dashboard/dashboard-all-support/dashboard-all-support.component';
import { DashboardOneSupportComponent } from './dashboard/dashboard-one-support/dashboard-one-support.component';
import { DashboardAllProvidersComponent } from './dashboard/dashboard-all-providers/dashboard-all-providers.component';
import { TransferRecapComponent } from './transfer-recap/transfer-recap.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { SettingsDeleteComponent } from './settings/settings-delete/settings-delete.component';
import { HelperComponent } from './helper/helper.component';
registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    CguComponent,
    NotFoundComponent,
    TransferComponent,
    LoginComponent,
    RegisterComponent,
    SettingsNavbarComponent,
    SettingsMyAccountComponent,
    SettingsSubscriptionComponent,
    LogoutComponent,
    SettingsAllTransferComponent,
    SubscriptionsComponent,
    DownloadComponent,
    FlashMessageComponent,
    CookiesConsentComponent,
    FooterComponent,
    PrivacyPolicyComponent,
    ValidateEmailComponent,
    AboutComponent,
    ContactUsComponent,
    DashboardNavbarComponent,
    DashboardAllUsersComponent,
    DashboardOneUserComponent,
    DashboardAllTransferComponent,
    DashboardOneTransferComponent,
    DashboardAllSupportComponent,
    DashboardOneSupportComponent,
    DashboardAllProvidersComponent,
    TransferRecapComponent,
    DeleteUserComponent,
    SettingsDeleteComponent,
    HelperComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgcCookieConsentModule.forRoot(cookieConfig),
        NgOptimizedImage,
        FontAwesomeModule,
        FormsModule,
        FileUploadModule,
        HttpClientModule,
        OAuthModule.forRoot(),
    ],
  providers: [FlashMessageService, NavbarComponent, FooterComponent,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    { provide: LOCALE_ID, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent, FooterComponent]
})
export class AppModule {

}
