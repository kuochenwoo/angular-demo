import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api/user/v1/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // 展示未登录页面
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'json' });
  }

  // 根据用户页面，即实际业务页面(拦截)
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'json' });
  }
}
