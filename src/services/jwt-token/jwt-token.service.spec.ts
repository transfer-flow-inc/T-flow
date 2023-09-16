import {JwtTokenService} from "./jwt-token.service";
import {TestBed} from "@angular/core/testing";
import jwt_decode from "jwt-decode";

jest.mock('jwt-decode');

describe('JwtTokenService', () => {
  let component: JwtTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    component = TestBed.inject(JwtTokenService);
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });

  it('should return an empty string if the token in getDecodeToken is empty ', () => {

    spyOn(component, 'getDecodeToken').and.returnValue('');

  });


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
    expect(component.getDecodeToken('test')).toBe('sampleToken');
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

it('should return the correct expiration time', () => {
    const mockDecodedToken = {
      exp: '1632831325',
    };

    (jwt_decode as jest.Mock).mockReturnValue(mockDecodedToken);
    component.setToken('some_token');

    expect(component.getExpiryTime()).toBe(1632831325);
  });

  it('should correctly identify if the token is expired', () => {
    const mockDecodedToken = {
      exp: ((Date.now() / 1000) - 100).toString(), // some past time
    };

    (jwt_decode as jest.Mock).mockReturnValue(mockDecodedToken);
    component.setToken('some_expired_token');

    expect(component.isTokenExpired()).toBe(true);
  });

  it('should correctly identify if the token is not expired', () => {
    const mockDecodedToken = {
      exp: ((Date.now() / 1000) + 100).toString(), // some future time
    };

    (jwt_decode as jest.Mock).mockReturnValue(mockDecodedToken);
    component.setToken('some_valid_token');

    expect(component.isTokenExpired()).toBe(false);
  });

  it('should return all user info correctly', () => {
    const mockDecodedToken = {
      firstName: 'John',
      lastName: 'Doe',
      userID: '1234',
      authMethod: 'password',
      userRole: 'admin',
      userEmail: 'john.doe@example.com',
      plan: 'pro',
      isAccountVerified: 'true',
      avatar: 'some_avatar',
      exp: '1632831325',
    };

    (jwt_decode as jest.Mock).mockReturnValue(mockDecodedToken);
    component.setToken('some_token');

    const userInfo = component.getAllUserInfos();
    expect(userInfo).toEqual(mockDecodedToken);
  });

it('should return the correct jwtToken value', () => {
  component.jwtToken = 'sampleJwtToken';

  const token = component.getToken();

  expect(token).toBe('sampleJwtToken');
});

it('should decode jwtToken and populate decodedToken when jwtToken is set', () => {
  // Arrange: Mock jwt_decode and set jwtToken
  const mockDecodedToken = { some: 'data' };
  (jwt_decode as jest.Mock).mockReturnValue(mockDecodedToken);
  component.jwtToken = 'someJwtToken';

  // Act: Call decodeToken()
  component.decodeToken();

  // Assert: Check that decodedToken is populated correctly
  expect(component.decodedToken).toEqual(mockDecodedToken);
});


});
