import {Injectable, OnInit} from '@angular/core';
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
export class HttpClientService{

  isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();
  logger: string | null = "nothing";
  token: string | null = "";

  constructor(
    private httpClient: HttpClient,
    private cookiesService: CookiesService,
    private router: Router,
    private flashMessageService: FlashMessageService,
  ) {

    this.token = this.cookiesService.get('token');

  }


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
    });
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
      this.router.navigate(['/accueil']).then(() => {
        this.flashMessageService.addMessage(`Vous vous êtes déconnecté avec succès`, 'success', 4000);
      });
  }

  createFolder(url: string, folder : CreateFolderInterface){
    const httpOptions = {
      headers: this.getHeaders()
    };
    return this.httpClient.post<FolderInterface>(url, folder, httpOptions);
  }

  downloadFolder(url: string): Observable<Blob> {
    return this.httpClient.get(url, {responseType: 'blob'});
  }

  getAFolderByUrl(url: string) {
    return this.httpClient.get<FolderInterface>(url);
  }

  getAllFolderByUserId(url: string) {
    const httpOptions = {
      headers: this.getHeaders()
    };
    return this.httpClient.get<FolderInterface[]>(url, httpOptions);
  }

  validateEmail(url: string, token: TokenInterface) {
    return this.httpClient.post(url, token);
  }


}
