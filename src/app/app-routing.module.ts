import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';

// 页面路由列表
const routes: Routes = [

  // 显示未登录页面内容
  { path: 'home', component: HomeComponent },

  // 用户登录并存储token到cookie
  { path: 'login', component: LoginComponent },

  // 用户注册并跳转到登录页面
  { path: 'register', component: RegisterComponent },

  // 展示用戶信息
  { path: 'profile', component: ProfileComponent },

  // 显示用戶内容
  { path: 'user', component: BoardUserComponent },

  // 默认页面：Home
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
