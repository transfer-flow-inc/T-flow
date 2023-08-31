import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {

  private currentThemeSubject = new BehaviorSubject<string>('light');
  public currentTheme$ = this.currentThemeSubject.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {}

  toggleTheme() {
    this.document.body.classList.toggle('dark');
    this.document.body.classList.toggle('light');

    if (this.document.body.classList.contains('dark')) {
      console.log('dark')
      localStorage.setItem('theme', 'dark');
    } else {
      console.log('light')
      localStorage.setItem('theme', 'light');
    }

    const newTheme = this.currentThemeSubject.value === 'light' ? 'dark' : 'light';
    this.currentThemeSubject.next(newTheme);
  }

  getCurrentTheme() {
    return this.currentThemeSubject.value;
  }

}
