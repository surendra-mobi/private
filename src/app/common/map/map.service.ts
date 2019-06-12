import {Injectable} from "@angular/core";
import {Observable} from "rxjs"
import { CamelizePipe } from 'ngx-pipes';

@Injectable()
export class MapService{
 public geoCoder;
 locationCache:any={};
 constructor(private camelizePipe:CamelizePipe){

 }
 private cacheLocation(location, coordinates){
 	                   

    const clocation=this.camelize(location);
    this.locationCache[clocation]=coordinates;
 }
 private camelize(location){
 	return this.camelizePipe.transform(location);
 }
 private isGeoLocationCached(location){ 
  	 return this.locationCache[this.camelize(location)];
 }
 
 public geocodeLocation(location:string):Observable<any>{
 	    if (!this.geoCoder) { this.geoCoder = new (<any>window).google.maps.Geocoder(); }

 		return new Observable((observer) => {
 			this.geoCoder.geocode({address: location}, (result, status) => {
				if (status === 'OK') {
					const geometry = result[0].geometry.location;
					const coordinates = {lat: geometry.lat(), lng: geometry.lng()};
					    this.cacheLocation(location, coordinates);
				  		observer.next(coordinates);

					
				} else {
					observer.error('Location could not be geocoded');
				}
			});
 		});
 }
 public getGeoLocation(location: string): Observable<any> {
			if(this.isGeoLocationCached(location)){  
			return new Observable((observer) => {  
				observer.next(this.locationCache[this.camelize(location)]);
			});
			}else{
			return this.geocodeLocation(location);
		}
	
	}
}