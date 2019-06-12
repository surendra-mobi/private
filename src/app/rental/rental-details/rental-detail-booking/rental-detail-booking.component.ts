import { Component, OnInit, Input} from '@angular/core';
import { Rental } from "../../service/rental.model";
@Component({
  selector: 'my-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental:Rental
  constructor() { }
  public daterange: any = {};
  public options: any = {
        locale: { format: 'YYYY-MM-DD' },
        alwaysShowCalendars: false,
        opens:'left'
  };
  ngOnInit() {
  }
  public selectedDate(value: any, datepicker?: any) {
        datepicker.start = value.start;
        datepicker.end = value.end;
        this.daterange.start = value.start;
        this.daterange.end = value.end;
        this.daterange.label = value.label;
    }

}
