import { Component, OnInit, Input} from '@angular/core';
import { Rental } from "../../service/rental.model";
import { Booking } from "../../../booking/shared/booking.model";
import { HelperService } from "../../../common/service/helper.service";
import * as moment from "moment";
@Component({
  selector: 'my-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental:Rental;
  newBooking:Booking;
  private bookedOutDates:any[]=[];
  constructor(private helper:HelperService) { }
  public daterange: any = {};
  public options: any = {
        locale: { format: Booking.DATE_FORMAT },
        alwaysShowCalendars: false,
        opens:'left',
        isInvalidDate:this.checkforInvalidDate.bind(this)
  };
  ngOnInit() {
         this.getBookedOutDates();
         this.newBooking=new Booking();
  }
  private checkforInvalidDate(date){
          return this.bookedOutDates.includes(this.helper.formatBookingDateFormat(date)) || date.diff(moment(),"days") <0; 
          
  }
  private getBookedOutDates(){
  	const bookings=this.rental.bookings;
  	if(bookings && bookings.length >0){
  		bookings.forEach((booking:Booking)=>{
  			const dateRange=this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
  			this.bookedOutDates.push(...dateRange)
           
  		});
  	}
  }
  public selectedDate(value: any, datepicker?: any) {
        this.newBooking.startAt=this.helper.formatBookingDateFormat(value.start);
        this.newBooking.endAt=this.helper.formatBookingDateFormat(value.end);
        this.newBooking.days=-(value.start.diff(value.end,"days"));
        this.newBooking.totalPrice=(this.newBooking.days * this.rental.dailyRate);
                debugger;

        console.log(this.newBooking);
        debugger;
       // this.daterange.start = value.start;
        //this.daterange.end = value.end;
        //this.daterange.label = value.label;
    }

}
