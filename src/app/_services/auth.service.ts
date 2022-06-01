import { UserLogin } from './../model/user/user-login';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:5000/api/user/v1/';

// 附加请求头
 const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json'}),

   // 增加观察整个響應而非默认的相应体
   observe: "response" as 'body'
 };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
 userLogin: UserLogin = new UserLogin()
  // 用户登录
  login(pwd: string, mail: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        pwd,
        mail,
      },
      httpOptions
    );
  }

  // 用户注册
  register(username: string, email: string, password: string): Observable<any> {

    return this.http.post(
      AUTH_API + 'register',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  // 用户登出(拦截)
  logout(): Observable<any> {
    return this.http.get(AUTH_API + 'logout', { responseType: 'json' });
  }

  // 返回用戶信息(拦截)
  detail():Observable<any> {
    return this.http.get(AUTH_API + 'detail',  httpOptions)
  }

  // 获取用户名，仅在登录后调用(拦截)
  getUsername(): Observable<any> {
    return this.http.get(AUTH_API + 'name', { responseType: 'json' });
  }
}
