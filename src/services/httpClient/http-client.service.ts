import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenInterface} from "../../interfaces/Token/token-interface";
import {BehaviorSubject, Observable} from "rxjs";
import {CookiesService} from "../cookies/cookies.service";
import {Router} from "@angular/router";
import {FlashMessageService} from "../flash-message/flash-message.service";
import {FolderInterface} from "../../interfaces/Files/folder-interface";
import {CreateFolderInterface} from "../../interfaces/Files/create-folder-interface";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(
    private httpClient: HttpClient,
    private cookiesService: CookiesService,
    private router: Router,
    private flashMessageService: FlashMessageService,
  ) {
  }

    token = this.cookiesService.get('token');

    httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token,
      })
    };


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
    let token = this.cookiesService.get('token');
    if (token) {
      this.cookiesService.delete('token');
      this.isAuthenticated.next(false);
      this.router.navigate(['/accueil']).then(() => {
        this.flashMessageService.addMessage(`Vous vous êtes déconnecté avec succès`, 'success', 4000);
      });
    }
  }

  createFolder(url: string, folder : CreateFolderInterface) {
    return this.httpClient.post<FolderInterface>(url, folder, this.httpOptions);
  }

  downloadFolder(url: string): Observable<Blob> {
    return this.httpClient.get(url, {responseType: 'blob'});
  }

  getAFolderByUrl(url: string) {
    return this.httpClient.get<FolderInterface>(url, this.httpOptions);
  }

  getAllFolderByUserId(url: string) {
    return this.httpClient.get<FolderInterface[]>(url, this.httpOptions);
  }


}
