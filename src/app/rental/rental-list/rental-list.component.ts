import { Component, OnInit } from '@angular/core';
import { RentalService} from '../service/rental.service';
import { Rental} from '../service/rental.model';

@Component({
  selector: 'my-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {
 rentals: Rental[] = [];

  constructor(private rentalService:RentalService) { }

  ngOnInit() {
  	const rentalObservable=this.rentalService.getRentals();
  	rentalObservable.subscribe((rental:Rental[])=>{
     this.rentals=rental;
   
  	},
  	(err)=>{
  		console.log(err);
  	},()=>{

  	})
  }

}
