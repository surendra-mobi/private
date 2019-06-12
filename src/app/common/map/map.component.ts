import { Component, OnInit,Input } from '@angular/core';
import {MapService} from './map.service';
@Component({
  selector: 'my-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() address:string;
  title: string = 'My first AGM project';
  lat: number ;
  lng: number ;
  isPositionError:boolean=false;
  constructor(private mapService:MapService) { }

  ngOnInit() {
  }
  mapReadyHandler(){

  	this.mapService.getGeoLocation(this.address).subscribe(
      (coordinates) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;

  },()=>{
  	this.isPositionError=true;
  });
  }
}
