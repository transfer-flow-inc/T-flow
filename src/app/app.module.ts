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
import { SettingsPreferencesComponent } from './settings-preferences/settings-preferences.component';
import { SettingsSubscriptionComponent } from './settings-subscription/settings-subscription.component';
import { LogoutComponent } from './logout/logout.component';
import {FlashMessageService} from "../services/flash-message/flash-message.service";


const cookieConfig: NgcCookieConsentConfig = {
    cookie: {
        domain: 'localhost' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
    },
    palette: {
        popup: {
            text: 'var(--background)',
            background: 'var(--color)',
            border: '10px solid var(--color)'
        },
        highlight: {
            background: 'var(--background)',
            text: 'var(--color)',
        },
        button: {
            background: 'green',
        }
    },
    theme: 'classic',
    type: 'info',
    content: {
        message: 'Ce site internet utilise des cookies pour vous garantir la meilleure expérience sur notre site.',
        dismiss: 'J\'ai compris',
        link: 'En savoir plus',
        target: '_blank',
        href: 'https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser',
        policy: 'Politique de confidentialité'
    },
    position: 'bottom-left',
};

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
        SettingsPreferencesComponent,
        SettingsSubscriptionComponent,
        LogoutComponent,
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
    ],
    providers: [FlashMessageService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
