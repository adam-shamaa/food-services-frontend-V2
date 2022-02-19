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
  isToggleGroupVertical = false;

  constructor() { }

  ngOnInit(): void {
    this.onResize({target: { innerWidth: window.innerWidth } } );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurant']) {
      this.selectedServiceProvider = this.restaurant?.serviceProviders[0];
    }
  }

  handleServiceProviderChange(buttonChange: MatButtonToggleChange) {
    this.selectedServiceProvider = this.restaurant!.serviceProviders.filter(serviceProvider => serviceProvider.serviceProviderName == buttonChange.value)[0]
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any; }; }) {
    this.isToggleGroupVertical = event.target.innerWidth < 890;
  }

}
