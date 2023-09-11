import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookiesService } from '../cookies/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private cookiesService: CookiesService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedReq = req;

    const token = this.cookiesService.get('token');
    if (token) {
      modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(modifiedReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.cookiesService.delete('token');
          sessionStorage.clear();
        }
         throw error;
      })
    )
  }
}
