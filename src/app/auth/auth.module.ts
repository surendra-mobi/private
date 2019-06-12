import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router'
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/token.interceptor';

const routs:Routes=[{path:'login',component:LoginComponent, canActivate:[AuthGuard]},{path:'register',component:RegisterComponent, canActivate:[AuthGuard]}];
@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    LoginComponent
   
  ],
  imports: [
    RouterModule.forChild(routs),
    FormsModule,
    CommonModule,
    ReactiveFormsModule
   
  ],
  providers: [AuthService,AuthGuard,{
  provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true

  }],
})
export class AuthModule { }
