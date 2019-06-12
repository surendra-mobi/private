import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  errors:[]=[];
  notifyMessage:string='';
  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe((params)=>{
    	if(params['registered']==="true"){
            this.notifyMessage="You have been successfully registered you can login now!";
    	} 
    });
  }
  initForm(){
      this.loginForm=this.fb.group({
      email:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password:['', Validators.required]
      })
  }
  isInValidform(fieldname):boolean{
  return this.loginForm.controls[fieldname].invalid && (this.loginForm.controls[fieldname].dirty || this.loginForm.controls[fieldname].touched);
  }
  login(){
      this.authService.loginUser(this.loginForm.value).subscribe((response)=>{
          this.router.navigate(["/rentals"]);
      }, (errorResponse)=>{
          this.errors=errorResponse.error.errors;
      });
  }
}
