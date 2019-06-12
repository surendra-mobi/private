import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {Routes, RouterModule} from '@angular/router'
import {HeaderComponent} from './common/header/header.component';
import { TestComponent } from './test/test.component';
import { RentalComponent } from './rental/rental.component';

import { RentalModule } from './rental/rental.module';
import { AuthModule } from './auth/auth.module';


const routs:Routes=[{path:'',redirectTo:'rentals', pathMatch:'full'},{path:'test',component:TestComponent}];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TestComponent,
    
   
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routs),
    RentalModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
