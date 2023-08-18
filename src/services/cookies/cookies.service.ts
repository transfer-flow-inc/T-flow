import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor() { }

  set(name: string, value: string, days: number) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  get(name: string) {
    let cookieName = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while(cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) == 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  }

  delete(name: string) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

}
