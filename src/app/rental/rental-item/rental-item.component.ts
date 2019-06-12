import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-rental-item',
  templateUrl: './rental-item.component.html',
  styleUrls: ['./rental-item.component.scss']
})
export class RentalItemComponent implements OnInit {
   @Input() rental:any;
  constructor() { }

  ngOnInit() {
  }

}
