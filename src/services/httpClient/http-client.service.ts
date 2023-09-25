import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenInterface} from "../../interfaces/Token/token-interface";
import {BehaviorSubject, Observable} from "rxjs";
import {CookiesService} from "../cookies/cookies.service";
import {Router} from "@angular/router";
import {FlashMessageService} from "../flash-message/flash-message.service";
import {FolderInterface} from "../../interfaces/Files/folder-interface";
import {CreateFolderInterface} from "../../interfaces/Files/create-folder-interface";
import {OAuthService} from "angular-oauth2-oidc";
import {AllUsersInterface} from "../../interfaces/User/all-users-interface";
import {AllSupportsInterface} from "../../interfaces/Support/all-supports-interface";
import {UserApiInterface} from "../../interfaces/User/user-api-interface";
import {FolderPagesInterface} from "../../interfaces/Files/folder-pages-interface";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  isAdministrator = new BehaviorSubject<boolean>(false);
  isAdministrator$ = this.isAdministrator.asObservable();

  constructor(
    private httpClient: HttpClient,
    private cookiesService: CookiesService,
    private router: Router,
    public flashMessageService: FlashMessageService,
    private oAuthService: OAuthService
  ) {



  }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookiesService.get('token')
    })
  }


  login(url: string, email: string, password: string) {
    return this.httpClient.post<TokenInterface>(url, {email, password});
  }

  loginWithGoogle(url: string, googleSsoInterface: object) {
    return this.httpClient.post<TokenInterface>(url, googleSsoInterface);
  }

  register<TokenInterface>(url: string, firstName: string, lastName: string, email: string, password: string) {
    return this.httpClient.post<TokenInterface>(url, {firstName, lastName, email, password})
  }

  logout() {
    window.sessionStorage.clear();
    this.cookiesService.delete('token');
    this.isAuthenticated.next(false);
    this.oAuthService.logOut();
    this.router.navigate(['/accueil']).then(() => {
      this.flashMessageService.addMessage(`Vous vous êtes déconnecté avec succès`, 'success', 4000);
    });
  }

  createFolder(url: string, folder: CreateFolderInterface) {
    return this.httpClient.post<FolderInterface>(url, folder);
  }

  downloadFolder(url: string): Observable<Blob> {
    return this.httpClient.get(url, {responseType: 'blob'});
  }

  getAFolderByUrl(url: string) {
    return this.httpClient.get<FolderInterface>(url);
  }

  getAllFolderByUserId(url: string) {
    return this.httpClient.get<FolderInterface[]>(url);
  }

  deleteFolder(url: string) {
    return this.httpClient.delete(url);
  }

  deleteUser(url: string) {
    return this.httpClient.delete(url);
  }

  updateUser<UpdateUserInterface>(url: string, user: UpdateUserInterface) {
    return this.httpClient.patch<TokenInterface>(url, user, this.httpOptions);
  }

  validateEmail(url: string, token: TokenInterface) {
    return this.httpClient.post(url, token);
  }

  getAllUsers(url: string) {
    return this.httpClient.get<AllUsersInterface>(url);
  }

  getAllSupports(url: string) {
    return this.httpClient.get<AllSupportsInterface>(url);
  }

  deleteUserAsAdmin(url: string) {
    return this.httpClient.delete(url);
  }

  sendEmail(url: string, userEmail: string, subject: string, message: string) {
    return this.httpClient.post(url, {userEmail, subject, message});
  }

  getOneUserByID(url: string) {
    return this.httpClient.get<UserApiInterface>(url);
  }

  getAllTransfersByUserID(url: string) {
    return this.httpClient.get<FolderPagesInterface>(url);
  }

  deleteAUserByID(url: string) {
    return this.httpClient.delete(url);
  }

  getTransferByID(url: string) {
    return this.httpClient.get<FolderInterface>(url);
  }

  deleteATransferByID(url: string) {
    return this.httpClient.delete(url);
  }

  getSupportInfo(url: string) {
    return this.httpClient.get(url);
  }


}
