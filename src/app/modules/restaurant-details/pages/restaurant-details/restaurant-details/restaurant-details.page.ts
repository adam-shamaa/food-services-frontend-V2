import { Component, HostListener, OnInit } from '@angular/core';
import { RestaurantsService } from '../../../../../services/restaurants/restaurants.service';
import { Observable, take, zip } from 'rxjs';
import {
  AggregatedServiceProviderRestaurants,
  ServiceProviderRestaurant,
} from '../../../../../models/domain/restaurants';
import { ActivatedRoute } from '@angular/router';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ViewportScroller } from '@angular/common';
import { Address } from '../../../../../models/domain/address';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.page.html',
  styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements OnInit {
  selectedServiceProvider?: ServiceProviderRestaurant;
  isToggleGroupVertical = false;

  currentAddress$: Observable<Address | undefined>;
  restaurant$: Observable<AggregatedServiceProviderRestaurants | null>;
  restaurant: AggregatedServiceProviderRestaurants | null = null;

  constructor(
    private restaurantService: RestaurantsService,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {
    this.currentAddress$ = restaurantService.currentAddress;
    this.restaurant$ = restaurantService.selectedRestaurant;
    this.restaurant$.subscribe((restaurant) => {
      this.restaurant = restaurant;
      this.selectedServiceProvider = this.restaurant?.serviceProviders.filter(
        (serviceProvider) =>
          serviceProvider.serviceProviderName ==
          this.restaurant?.cheapestServiceProvider
      )[0];
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const elements = document.getElementsByClassName('active');
    if (elements.length == 0) return;
    elements.item(0)!.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  scroll(anchor: number) {
    const el = document.getElementById(String(anchor));
    const y = el!.getBoundingClientRect().y;

    window.scroll(0, window.scrollY + y - 150);
  }

  ngOnInit(): void {
    zip(this.route.paramMap, this.route.queryParamMap)
      .pipe(take(1))
      .subscribe((pathParams) => {
        this.restaurantService.getRestaurant(
          pathParams[0].get('restaurantId')!
        );
      });
    this.onResize({ target: { innerWidth: window.innerWidth } });
  }

  handleServiceProviderChange(buttonChange: MatButtonToggleChange) {
    this.selectedServiceProvider = this.restaurant!.serviceProviders.filter(
      (serviceProvider) =>
        serviceProvider.serviceProviderName == buttonChange.value
    )[0];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any } }) {
    this.isToggleGroupVertical = event.target.innerWidth < 890;
  }

  openNewWindow(url: string) {
    window.open(url, '_blank');
  }
}
