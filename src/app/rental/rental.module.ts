import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalDetailsComponent } from './rental-details/rental-details.component';
import { RentalItemComponent } from './rental-item/rental-item.component';

import { RentalService} from './service/rental.service';
import { HelperService} from '../common/service/helper.service';

import {Routes, RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {NgPipesModule} from 'ngx-pipes';
import { MapModule } from '../common/map/map.module';
import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalDetailBookingComponent } from './rental-details/rental-detail-booking/rental-detail-booking.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';

const routs:Routes=[{path:'rentals',
component:RentalComponent,
children:[{path:'', component:RentalListComponent},{path:':rentalID', component:RentalDetailsComponent, canActivate:[AuthGuard]}]
}];

@NgModule({
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalDetailsComponent,
    RentalItemComponent,
    RentalDetailBookingComponent
  ],
  imports: [
   CommonModule,
   RouterModule.forChild(routs),
   HttpClientModule,
   NgPipesModule,
   MapModule,
   Daterangepicker,
   FormsModule
  ],
  providers:[RentalService,HelperService]
  
})
export class RentalModule{
	
}