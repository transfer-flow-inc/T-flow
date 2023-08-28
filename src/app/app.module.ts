import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgcCookieConsentConfig, NgcCookieConsentModule} from 'ngx-cookieconsent';
import {NavbarComponent} from './navbar/navbar.component';
import {NgOptimizedImage} from "@angular/common";
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
import {HttpClientModule} from "@angular/common/http";
import { SettingsNavbarComponent } from './settings-navbar/settings-navbar.component';
import { SettingsMyAccountComponent } from './settings-my-account/settings-my-account.component';
import { SettingsSubscriptionComponent } from './settings-subscription/settings-subscription.component';
import { LogoutComponent } from './logout/logout.component';
import {FlashMessageService} from "../services/flash-message/flash-message.service";
import {OAuthModule} from "angular-oauth2-oidc";
import { SettingsAllTransferComponent } from './settings-all-transfer/settings-all-transfer.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { DownloadComponent } from './download/download.component';
import { FlashMessageComponent } from './flash-message/flash-message.component';
import { CookiesConsentComponent } from './cookies-consent/cookies-consent.component';
import { cookieConfig } from './cookies-consent/cookies-consent.component';
import { SettingsAdminPanelComponent } from './settings-admin-panel/settings-admin-panel.component';
import { FooterComponent } from './footer/footer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

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
        SettingsAdminPanelComponent,
        FooterComponent,
        PrivacyPolicyComponent,
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
    providers: [FlashMessageService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
