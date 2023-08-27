import {Component, OnInit} from '@angular/core';
import {
  NgcCookieConsentConfig,
  NgcCookieConsentService,
} from "ngx-cookieconsent";
import {environment} from "../../environments/environment";

export const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.domainUrl
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
      background: 'var(--background)',
      text: 'var(--color)',
    }
  },
  theme: 'classic',
  type: 'info',
  content: {
    message: 'Ce site internet utilise des cookies pour vous garantir la meilleure expérience sur notre site.',
    dismiss: 'J\'ai compris',
    link: 'En savoir plus',
    target: '_blank',
    href: 'https://www.cnil.fr/fr/definition/cookie',
    policy: 'Politique de confidentialité'
  },
  position: 'bottom-left',
};

@Component({
  selector: 'app-cookies-consent',
  templateUrl: './cookies-consent.component.html',
  styleUrls: ['./cookies-consent.component.css']
})
export class CookiesConsentComponent implements OnInit {

  constructor(
    private cookieService: NgcCookieConsentService
  ) {
  }

  ngOnInit(): void {

  }

}
