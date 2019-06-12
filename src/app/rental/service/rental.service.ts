import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {Rental} from "./rental.model";
@Injectable()
export class RentalService{
	constructor(private http:HttpClient){

}
	
public  getRentalById(rentalid: String) : Observable<any> {
    return this.http.get('/api/v1/rentals/'+rentalid);
	
}
public getRentals() : Observable<any>  {
	var res= this.http.get('/api/v1/rentals');
	return res;
   
}
}