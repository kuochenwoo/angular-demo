import { UserLogin } from './../model/user/user-login';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { CookieService } from "ngx-cookie-service";
import { SubSink } from 'subsink';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    mail: null,
    pwd: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string = ''
  private subs = new SubSink();
  userLogin: UserLogin = new UserLogin();
  constructor(private authService: AuthService, private storageService: StorageService, private cookieService: CookieService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.authService.getUsername().subscribe({
        next: resp => {
          this.roles = resp.data;
        },
      })
    } else {
      this.isLoggedIn = false
    }
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // 提交表单
  onSubmit(): void {
    this.userLogin = this.form

    this.authService.login(this.userLogin.pwd, this.userLogin.mail).subscribe({


      next: data => {
        // 此时data为整个响应，header与body
        // console.log("返回体： ", data.body)

        // 返回碼為0：登錄成功
        if(data.body.code === 0) {
          const token = data.body.data
          this.cookieService.delete('token')
          this.cookieService.set('token', token)

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
        }

        // 返回碼不為0：登錄失敗
        else {
          this.errorMessage = data.body.msg;
          this.isLoginFailed = true;
        }


      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  // 重新载入页面，导致304
  reloadPage(): void {
    window.location.reload();
  }
}
