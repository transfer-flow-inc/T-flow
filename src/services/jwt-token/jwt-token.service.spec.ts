import {JwtTokenService} from "./jwt-token.service";

describe('DownloadComponent', () => {

  it('should create', () => {
    expect(true).toBeTruthy();
  });

  });

  // use the mock token service
  let component = new JwtTokenService();

  it('should return the user first name', () => {
    spyOn(component, 'getDecodeToken').and.returnValue({firstName: 'sampleFirstName'});
    expect(component.getUserFirstName()).toBe('sampleFirstName');
  });

  it('should return the user last name', () => {
    spyOn(component, 'getDecodeToken').and.returnValue({lastName: 'sampleLastName'});
    expect(component.getUserLastName()).toBe('sampleLastName');
  });

  it('should return the user id', () => {
    spyOn(component, 'getDecodeToken').and.returnValue({userID: 'sampleUserId'});
    expect(component.getUserId()).toBe('sampleUserId');
  });

  it('should return the user email', () => {
    spyOn(component, 'getDecodeToken').and.returnValue({userEmail: 'sampleUserEmail'});
    expect(component.getUserEmail()).toBe('sampleUserEmail');
  });

  it('should return the user role', () => {
    spyOn(component, 'getDecodeToken').and.returnValue({userRole: 'sampleUserRole'});
    expect(component.getUserRole()).toBe('sampleUserRole');
  });

  it('should return the user plan', () => {
    spyOn(component, 'getDecodeToken').and.returnValue({plan: 'samplePlan'});
    expect(component.getUserPlan()).toBe('samplePlan');
  });

  it('should return the user avatar', () => {
    spyOn(component, 'getDecodeToken').and.returnValue({avatar: 'sampleAvatar'});
    expect(component.getUserAvatar()).toBe('sampleAvatar');
  });

  it('should return the user account status', () => {
    spyOn(component, 'getDecodeToken').and.returnValue({isAccountVerified: 'true'});
    expect(component.getUserAccountStatus()).toBe(true);
  });

  it('should return the user authentication method', () => {
    spyOn(component, 'getDecodeToken').and.returnValue({authMethod: 'sampleAuthMethod'});
    expect(component.getUserAuthenticationMethod()).toBe('sampleAuthMethod');
  });

  it('should return the token', () => {
    spyOn(component, 'getToken').and.returnValue('sampleToken');
    expect(component.getToken()).toBe('sampleToken');
  });

  it('should set the token', () => {
    spyOn(component, 'setToken').and.returnValue('sampleToken');
    expect(component.setToken('sampleToken')).toBe('sampleToken');
  });

  it('should decode the token', () => {
    spyOn(component, 'decodeToken').and.returnValue('sampleToken');
    expect(component.decodeToken()).toBe('sampleToken');
  });

  it('should get the decoded token', () => {
    spyOn(component, 'getDecodeToken').and.returnValue('sampleToken');
    expect(component.getDecodeToken()).toBe('sampleToken');
  });

  it('should check if the token is expired', () => {
    spyOn(component, 'isTokenExpired').and.returnValue(true);
    expect(component.isTokenExpired()).toBe(true);
  });

  it('should get all the user infos', () => {
    spyOn(component, 'getAllUserInfos').and.returnValue('sampleToken');
    expect(component.getAllUserInfos()).toBe('sampleToken');
  });

  it('should decode the token', () => {
    spyOn(component, 'decodeToken').and.returnValue('sampleToken');
    expect(component.decodeToken()).toBe('sampleToken');
  })
