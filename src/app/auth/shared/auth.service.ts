import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import  "rxjs/Rx";
import * as jwt from 'jwt-decode';
import * as moment from 'moment';
class DecodedToken{
	exp:number=0;
	username:string="";
}
@Injectable()
export class AuthService{
	   private decodedToken;

       constructor(private http:HttpClient){
           this.decodedToken=JSON.parse(localStorage.getItem("skm_meta")) || new DecodedToken() ;
       }
		public  registerUser(userData: any) : Observable<any> {
			return this.http.post('/api/v1/users/register',userData);
		}
		public  loginUser(userData: any) : Observable<any> {
			return this.http.post('/api/v1/users/auth',userData).map((token:string)=>{
               return this.saveToken(token);
			});
		}
		private saveToken(token: string):string{
			 this.decodedToken=jwt(token); 
             localStorage.setItem("skm_token",token);
             localStorage.setItem("skm_meta", JSON.stringify(this.decodedToken));

             return token;
		}
		public isAuthenticated():boolean{
			console.log(this.getExpiration());
           return moment().isBefore(this.getExpiration());

		}
		private getExpiration(){
			return moment.unix(this.decodedToken.exp);
		}
		public logout(){
			localStorage.removeItem("skm_meta");
			localStorage.removeItem("skm_token");
			this.decodedToken=new DecodedToken();
		}
		public getUserName():string{
            return this.decodedToken.username;
		}
		public getAuthToken():string{
			return localStorage.getItem("skm_token");
		}
}
