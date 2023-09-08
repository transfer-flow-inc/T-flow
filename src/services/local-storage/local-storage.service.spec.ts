import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let mockLocalStorage: { [key: string]: string };

  beforeEach(() => {
    mockLocalStorage = {};

    Storage.prototype.setItem = jest.fn((key, value) => {
      mockLocalStorage[key] = value;
    });
    Storage.prototype.getItem = jest.fn(key => mockLocalStorage[key]);
    Storage.prototype.removeItem = jest.fn(key => {
      delete mockLocalStorage[key];
    });
    Storage.prototype.clear = jest.fn(() => {
      mockLocalStorage = {};
    });

    service = new LocalStorageService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set item in local storage', () => {
    service.set('key', 'value');
    expect(localStorage.setItem).toHaveBeenCalledWith('key', 'value');
    expect(mockLocalStorage['key']).toEqual('value');
  });

  it('should get item from local storage', () => {
    mockLocalStorage['key'] = 'value';
    const value = service.get('key');
    expect(localStorage.getItem).toHaveBeenCalledWith('key');
    expect(value).toEqual('value');
  });

  it('should remove item from local storage', () => {
    mockLocalStorage['key'] = 'value';
    service.remove('key');
    expect(localStorage.removeItem).toHaveBeenCalledWith('key');
    expect(mockLocalStorage['key']).toBeUndefined();
  });
});
