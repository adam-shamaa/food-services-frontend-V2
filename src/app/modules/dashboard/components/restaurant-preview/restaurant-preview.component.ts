import {Component, Input, OnInit} from '@angular/core';
import {RestaurantMetadata} from "../../../../models/restaurants";

@Component({
  selector: 'app-restaurant-preview',
  templateUrl: './restaurant-preview.component.html',
  styleUrls: ['./restaurant-preview.component.scss']
})
export class RestaurantPreviewComponent implements OnInit {

  constructor() { }

  @Input() restaurant?: RestaurantMetadata

  ngOnInit(): void {
  }

}
