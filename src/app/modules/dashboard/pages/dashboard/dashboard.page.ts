import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsComponent } from '../../components/settings/settings.component';
import { Observable } from 'rxjs';
import { RestaurantsService } from '../../../../services/restaurants/restaurants.service';
import { Address } from '../../../../models/domain/address';
import { RestaurantSummary } from '../../../../models/domain/restaurants';
import { Router } from '@angular/router';
import { SearchResult } from '../../components/autocomplete/autocomplete.component';

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
  allAvailableRestaurantsToAddress: RestaurantSummary[] | null = null;
  availableRestaurants: RestaurantSummary[] | null = null;
  displayedRestaurants: RestaurantSummary[] | null = null;

  // Search Query Related
  allSearchResults: RestaurantSummary[] = [];
  topThreeSearchResults: SearchResult[] = [];
  prevSearchRestaurantsCuisinesAndItemsQuery: string = '';

  constructor(
    private restaurantsService: RestaurantsService,
    private router: Router
  ) {
    this.availableRestaurants$ = this.restaurantsService.availableRestaurants;
    this.currentAddress$ = this.restaurantsService.currentAddress;

    this.availableRestaurants$.subscribe((availableRestaurants) => {
      if (availableRestaurants == null) {
        this.availableRestaurants = null;
        this.displayedRestaurants = null;
        return;
      }
      if (this.prevSearchRestaurantsCuisinesAndItemsQuery == '') {
        this.allAvailableRestaurantsToAddress = availableRestaurants;
      }
      this.indexOfAvailableRestaurantsShown = 0;
      this.availableRestaurants = availableRestaurants;
      this.displayedRestaurants = [];
      this.appendDisplayedRestaurants();
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

  ngOnInit(): void {
    this.searchRestaurantsCuisinesAndItems('');
  }

  // Autocomplete Search
  handleRestaurantsSearchQueryChange(searchQuery: string) {
    this.allSearchResults =
      this.getRestaurantSearchResultsSuggestions(searchQuery);
    this.topThreeSearchResults = this.allSearchResults.slice(0, 2);
  }

  handleRestaurantsCuisinesItemsSearch(searchQuery: string) {
    this.prevSearchRestaurantsCuisinesAndItemsQuery = searchQuery;
    this.searchRestaurantsCuisinesAndItems(searchQuery);
  }

  handleRestaurantSearchSuggestionSelected(restaurantId: string) {
    this.viewRestaurantDetails(restaurantId);
  }

  handleViewAllSearchResultsSelected() {
    this.displayedRestaurants = null;
    setTimeout(() => {
      this.displayedRestaurants = this.allSearchResults;
    }, 500);
  }

  handleSearchQueryCleared() {
    if (this.prevSearchRestaurantsCuisinesAndItemsQuery.trim() == '') return;
    this.prevSearchRestaurantsCuisinesAndItemsQuery = '';
    this.searchRestaurantsCuisinesAndItems('');
  }

  /*
  handleSortRestaurantsBy(filterBy: FilterByOption) {
    if (this.displayedRestaurants == null) return;
    let comparator : (restaurant1 : RestaurantSummary, restaurant2 : RestaurantSummary) => number = (o1, o2) => 0;
    switch (filterBy) {
      case FilterByOption.default:
        return;
      case FilterByOption.lowest_fees:
        comparator = (o1, o2) => o1. - o2.minimumFeeServiceProvider.ratingOfTen
        return;
      case FilterByOption.fastest_delivery:
        comparator = (o1, o2) => o1.maxEstimatedDeliveryTime - o2.maxEstimatedDeliveryTime
        return;
    }
    this.displayedRestaurants.sort(comparator);
  }
   */

  // Utilities
  getRestaurantSearchResultsSuggestions(
    searchQuery: string
  ): RestaurantSummary[] {
    return (
      this.allAvailableRestaurantsToAddress?.filter((restaurant) => {
        return restaurant.name
          .toLowerCase()
          .match(searchQuery.toLowerCase().trim());
      }) || []
    );
  }

  searchRestaurantsCuisinesAndItems(searchQuery: string) {
    this.restaurantsService.getRestaurants(searchQuery);
  }

  handleSettingsShow() {
    if (this.isSettingsPanelShown) this.settingsComponent.closePanel();
    else this.settingsComponent.openPanel();
  }

  viewRestaurantDetails(restaurantId: string) {
    this.router.navigate(['/dashboard/' + restaurantId], {
      queryParams: {
        estimatedCartSubtotal: '20',
      },
    });
  }
}
