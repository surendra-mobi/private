import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Booking } from "../../booking/shared/booking.model"
@Injectable()
export class HelperService{
	private getRageOfDates(startAt, endAt, dateformat){
          const tempDates=[];
          let mstartAt=moment(startAt);
          const mendAt=moment(endAt);
          while(mstartAt < mendAt){
          	    tempDates.push(mstartAt.format(dateformat));
          	    mstartAt=mstartAt.add(1,"day");
          }
          tempDates.push(mendAt.format(dateformat));
          return tempDates;
	}
	public  getBookingRangeOfDates(startAt, endAt){
		return this.getRageOfDates(startAt, endAt,Booking.DATE_FORMAT);
	}
	private formateDate(date, dateformate){
         return moment(date).format(dateformate);
	}
	public formatBookingDateFormat(date){
		 return this.formateDate(date, Booking.DATE_FORMAT)
	}
}