import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenInterface} from "../../interfaces/Token/token-interface";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {



  constructor(
    private httpClient: HttpClient
  ) { }




  login(url: string, email: string, password: string) {
    return this.httpClient.post<TokenInterface>(url, {email, password});
  }

  register<TokenInterface>(url :string , firstName:string, lastName:string ,email:string, password:string) {
    return this.httpClient.post<TokenInterface>(url, {firstName, lastName, email, password })
  }


}
