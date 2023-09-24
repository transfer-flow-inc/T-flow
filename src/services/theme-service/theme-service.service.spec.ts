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

    service.currentThemeSubject = new BehaviorSubject('light');
    applyThemeSpy = jest.spyOn(service, 'applyTheme');
    jest.spyOn(service, 'saveThemeToStorage');
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

    service.toggleTheme();

    expect(applyThemeSpy).toHaveBeenCalledWith('light');
    expect(service.currentThemeSubject.value).toBe('light');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('should get current theme', () => {
    service.currentThemeSubject.next('light');
    const theme = service.getCurrentTheme();
    expect(theme).toBe('light');

    service.currentThemeSubject.next('dark');
    const darkTheme = service.getCurrentTheme();
    expect(darkTheme).toBe('dark');
  });
});
