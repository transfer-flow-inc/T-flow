import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentThemeSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.loadThemeFromStorage());
  public currentTheme$ = this.currentThemeSubject.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
    const initialTheme = this.loadThemeFromStorage();
    this.currentThemeSubject = new BehaviorSubject<string>(initialTheme);
    this.applyTheme(initialTheme);
  }

  loadThemeFromStorage(): string {
    return localStorage.getItem('theme') ?? 'dark';
  }

  saveThemeToStorage(theme: string): void {
    localStorage.setItem('theme', theme);
  }

  applyTheme(theme: string): void {
    const {classList} = this.document.body;
    classList.add(theme);
    classList.remove(theme === 'light' ? 'dark' : 'light');
  }

  toggleTheme(): void {
    const newTheme = this.currentThemeSubject.value === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    this.saveThemeToStorage(newTheme);
    this.currentThemeSubject.next(newTheme);
  }

  getCurrentTheme(): string {
    return this.currentThemeSubject.value;
  }
}
