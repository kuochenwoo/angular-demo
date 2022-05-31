import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService
    ) {}

  // 拦截所有请求，并复写请求在请求头加上token
  intercept(req: HttpRequest<any>, next: HttpHandler, ): Observable<HttpEvent<any>> {
    req = req.clone({
      // withCredentials: true,
      setHeaders: {
        token: this.cookieService.get('token')
      }
    });

    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
