import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  username?: string;
  resp: any;
  constructor(
    protected cookieService: CookieService,
  ) {}

  // 判断用户是否已登录，判断标准：token是否为空
  public isLoggedIn(): boolean {
    const user = this.cookieService.get("token")
    if (user) {
      return true;
    }
    return false;
  }
}
