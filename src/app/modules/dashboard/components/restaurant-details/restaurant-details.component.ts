import {Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {AggregatedServiceProviderRestaurants, ServiceProviderRestaurant} from "../../../../models/restaurants";

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit, OnChanges {

  @Input() restaurant: AggregatedServiceProviderRestaurants | null = null;
  selectedServiceProvider?: ServiceProviderRestaurant;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurant']) {
      this.selectedServiceProvider = this.restaurant?.serviceProviders[0];
    }
  }

  handleServiceProviderChange(buttonChange: MatButtonToggleChange) {
    this.selectedServiceProvider = this.restaurant!.serviceProviders.filter(serviceProvider => serviceProvider.serviceProviderName == buttonChange.value)[0]
  }

}
