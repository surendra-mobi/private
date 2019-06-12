import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'; 
import { RentalService} from '../service/rental.service';
import { Rental} from '../service/rental.model';
@Component({
  selector: 'my-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.scss']
})
export class RentalDetailsComponent implements OnInit {
  currentId:String;
  rental:Rental;
  constructor(private route:ActivatedRoute, private rentalService:RentalService) { }

  ngOnInit() {
  this.route.params.subscribe((params)=>{
          this.currentId=params['rentalID'];
          this.getRentalById(this.currentId);
  })
  }
  getRentalById(rentalid:String){
  	this.rentalService.getRentalById(rentalid).subscribe((rental:Rental)=>{
  		this.rental=rental;
  	});
  }

}
