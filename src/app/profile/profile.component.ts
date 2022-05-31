import { UserInfo } from './../model/user/user-info';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

/**
 * 开发顺序：
 * 1. 先在service层中写与后端交互的接口（返回值为Observable），
 * 2. 新建component，subscribe
 * 3. 新建返回值的VO类
 * 4. 把返回值逐一赋值给VO
 * 5. 在HTML中展示{{object.property}}
 */


// 展示用户资料(id, username, email)
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  // model的初始化
  user: UserInfo = new UserInfo();
  constructor(private authService: AuthService) {
   }

  ngOnInit(): void {

    this.authService.detail().subscribe({
        next:resp=>{
          const usrData = resp.body.data

          // 把後端返回的JSON賦值給用戶model
          this.user.id = usrData.id
          this.user.mail = usrData.mail
          this.user.username = usrData.username
        }
    })
  }
}
