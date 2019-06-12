import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'my-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
   formData:any={}
   errors:any[]=[];
  constructor(private authService:AuthService, private router:Router) { }
  ngOnInit() {
  this.formData.username="surendra1";
  }
  register(registerForm){
  this.authService.registerUser(this.formData).subscribe((resdata)=>{
  	this.router.navigate(['/login',{registered:true}]);
  },(errorResponse)=>{
  	this.errors=errorResponse.error.errors;

  });
  }
}
