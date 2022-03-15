import { Component, Input, OnInit } from '@angular/core';
import { RestaurantSummary } from '../../../../models/domain/restaurants';

@Component({
  selector: 'app-restaurant-preview',
  templateUrl: './restaurant-preview.component.html',
  styleUrls: ['./restaurant-preview.component.scss'],
})
export class RestaurantPreviewComponent {
  constructor() {
    // empty constructor
  }

  @Input() restaurant?: RestaurantSummary;
}
