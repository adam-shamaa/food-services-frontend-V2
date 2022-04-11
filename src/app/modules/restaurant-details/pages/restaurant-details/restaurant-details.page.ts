import {
  Component,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RestaurantsService } from '../../../../services/restaurants/restaurants.service';
import { Observable, take, zip } from 'rxjs';
import {
  RestaurantDetails,
  ServiceProviderRestaurant,
  ServiceProviders,
} from '../../../../models/domain/restaurants';
import { ActivatedRoute } from '@angular/router';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Address } from '../../../../models/domain/address';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.page.html',
  styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements OnInit {
  isSettingsPanelShown = true;
  estimatedSubtotalNumber = 20;

  restaurantId: string | undefined;
  currentAddress$: Observable<Address | undefined>;
  restaurant$: Observable<RestaurantDetails | null>;
  restaurant: RestaurantDetails | null = null;

  serviceProviders$: Observable<ServiceProviders | null | undefined>;
  serviceProviders: ServiceProviders | undefined | null = null;
  selectedServiceProvider?: ServiceProviderRestaurant;

  constructor(
    private restaurantService: RestaurantsService,
    private route: ActivatedRoute
  ) {
    this.currentAddress$ = restaurantService.currentAddress;
    this.restaurant$ = restaurantService.selectedRestaurant;
    this.restaurant$.subscribe((restaurant) => {
      this.restaurant = restaurant;
    });
    this.serviceProviders$ =
      restaurantService.selectedRestaurantServiceProviders$;
    this.serviceProviders$.subscribe((serviceProviders) => {
      this.serviceProviders = serviceProviders;
      this.selectedServiceProvider = serviceProviders?.serviceProviders.filter(
        (serviceProvider) =>
          serviceProvider.serviceProviderName ==
          serviceProviders?.cheapestServiceProvider
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

    window.scroll(0, window.scrollY + y - 225);
  }

  ngOnInit(): void {
    zip(this.route.paramMap, this.route.queryParamMap)
      .pipe(take(1))
      .subscribe((pathParams) => {
        this.restaurantId = pathParams[0].get('restaurantId')!;
        this.restaurantService.getSingleRestaurant(
          pathParams[0].get('restaurantId')!
        );
      });
  }

  handleEstimatedCartSizeChange(estimatedCartDollars: number) {
    this.restaurantService.getRestaurantServiceProviders(
      this.restaurantId!,
      estimatedCartDollars * 100
    );
  }

  handleServiceProviderChange(buttonChange: MatButtonToggleChange) {
    this.selectedServiceProvider =
      this.serviceProviders?.serviceProviders.filter(
        (serviceProvider) =>
          serviceProvider.serviceProviderName == buttonChange.value
      )[0];
  }

  openNewWindow(url: string) {
    window.open(url, '_blank');
  }
}
