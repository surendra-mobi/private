import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	  url:string;
	  constructor(private auth:AuthService, private router:Router){

	  }
	  
     
      handleAuthStat():boolean{
           if(this.isLoginOrRegistration()){
           	this.router.navigate(['/rentals']);
           	return false;
           }
           return true;
      }
      handleNotAuthStat():boolean{
      	 if(this.isLoginOrRegistration()){
             	return true;
           }
           this.router.navigate(['/login']);
           return false;


      }
      
      isLoginOrRegistration():boolean{
          if(this.url.includes("login") || this.url.includes("register")){
          	return true;
          }
          return false;
      }
	  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
         this.url=state.url;
         if(this.auth.isAuthenticated()){
         	return this.handleAuthStat();
         }
         return this.handleNotAuthStat();
      }
}