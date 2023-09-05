import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {


  set(name: string, value: string, days: number) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/" + ";SameSite=Strict"

  }

  get(name: string) {
    let cookieName = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');
    for (const element of cookies) {
      let cookie = element;
      while(cookie.startsWith(' ')) {
        cookie = cookie.substring(1);
      }
      if (cookie.startsWith(cookieName)) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  }

  delete(name: string) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=Strict";
  }

}
