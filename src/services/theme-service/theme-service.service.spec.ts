import { TestBed } from '@angular/core/testing';
import { ThemeServiceService } from './theme-service.service';
import { BehaviorSubject } from 'rxjs';

describe('ThemeServiceService', () => {
  let service: ThemeServiceService;
  let mockLocalStorage: any;
  let applyThemeSpy: jest.SpyInstance;

  beforeEach(() => {
    mockLocalStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeServiceService);

    service.currentThemeSubject = new BehaviorSubject('light');  // assuming it's public or you may have to spyOn this
    applyThemeSpy = jest.spyOn(service, 'applyTheme');
    jest.spyOn(service, 'saveThemeToStorage'); // Spying on this method too
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save theme to local storage', () => {
    const theme = 'dark';
    service.saveThemeToStorage(theme);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('should toggle theme', () => {
    service.toggleTheme();

    expect(applyThemeSpy).toHaveBeenCalledWith('dark');
    expect(service.currentThemeSubject.value).toBe('dark');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');

    // Toggling again to check if it switches back to 'light'
    service.toggleTheme();

    expect(applyThemeSpy).toHaveBeenCalledWith('light');
    expect(service.currentThemeSubject.value).toBe('light');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('should get current theme', () => {
    service.currentThemeSubject.next('light'); // Set the current theme to 'light'
    const theme = service.getCurrentTheme();
    expect(theme).toBe('light');

    // Optionally, you could also test for 'dark'
    service.currentThemeSubject.next('dark'); // Set the current theme to 'dark'
    const darkTheme = service.getCurrentTheme();
    expect(darkTheme).toBe('dark');
  });
});
