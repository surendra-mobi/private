import {Rental} from '../../rental/service/rental.model';
export class Booking{
	static readonly DATE_FORMAT="Y-MM-DD";
	_id:string;
	startAt:string;
	endAt:string;
	totalPrice:number;
    days:number;
    guests:number;
    createdAt:string;
    rental:Rental
}