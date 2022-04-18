import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsComponent } from '../../../restaurant-details/components/settings/settings.component';
import { Observable } from 'rxjs';
import { RestaurantsService } from '../../../../services/restaurants/restaurants.service';
import { Address } from '../../../../models/domain/address';
import { RestaurantSummary } from '../../../../models/domain/restaurants';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild(SettingsComponent) settingsComponent!: SettingsComponent;

  isSettingsPanelShown = true;
  indexOfAvailableRestaurantsShown: number = 0;
  availableRestaurantsIncrement: number = 15;

  // Pull in Store Data
  currentAddress$: Observable<Address | undefined>;
  availableRestaurants$: Observable<RestaurantSummary[] | null>;
  availableRestaurants: RestaurantSummary[] | null = null;
  displayedRestaurants: RestaurantSummary[] | null = null;

  // Search Query Related
  restaurantsSearchQuery: string = '';

  constructor(
    private restaurantsService: RestaurantsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.availableRestaurants$ = this.restaurantsService.availableRestaurants;
    this.currentAddress$ = this.restaurantsService.currentAddress;
  }

  ngOnInit(): void {
    this.availableRestaurants$.subscribe((availableRestaurants) => {
      if (availableRestaurants == null) {
        this.displayedRestaurants = this.availableRestaurants = null;
        return;
      }
      this.indexOfAvailableRestaurantsShown = 0;
      this.availableRestaurants = availableRestaurants;
      this.displayedRestaurants = [];
      this.appendDisplayedRestaurants();
    });

    this.route.queryParamMap.subscribe((queryParamMap) => {
      this.restaurantsSearchQuery = queryParamMap.get('searchQuery') || '';
      this.restaurantsService.getRestaurants(this.restaurantsSearchQuery);
    });
  }

  appendDisplayedRestaurants() {
    this.displayedRestaurants?.push(
      ...this.availableRestaurants!.slice(
        this.indexOfAvailableRestaurantsShown,
        this.indexOfAvailableRestaurantsShown +
          this.availableRestaurantsIncrement
      )
    );
    this.indexOfAvailableRestaurantsShown += this.availableRestaurantsIncrement;
  }

  // Autocomplete Search
  handleRestaurantsSearchQueryChange(restaurantSearchQuery: string) {
    this.router.navigate(['/dashboard'], {
      queryParams: {
        searchQuery: restaurantSearchQuery,
      },
    });
  }
}
