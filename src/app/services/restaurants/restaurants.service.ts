import { Injectable } from '@angular/core';
import {
  AggregatedServiceProviderRestaurants,
  RestaurantSummary,
} from '../../models/domain/restaurants';
import {
  BehaviorSubject,
  delay,
  map,
  Observable,
  of,
  Subject,
  take,
} from 'rxjs';
import { RestaurantsFacade } from './restaurants.facade';
import { Address } from '../../models/domain/address';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  currentAddress$: BehaviorSubject<Address | undefined> = new BehaviorSubject<
    Address | undefined
  >(undefined);
  currentAddress: Observable<Address | undefined> =
    this.currentAddress$.asObservable();

  availableRestaurants$: Subject<RestaurantSummary[] | null> = new Subject();
  availableRestaurants: Observable<RestaurantSummary[] | null> =
    this.availableRestaurants$.asObservable();

  selectedRestaurant$: Subject<AggregatedServiceProviderRestaurants | null> =
    new Subject();
  selectedRestaurant: Observable<AggregatedServiceProviderRestaurants | null> =
    this.selectedRestaurant$.asObservable();

  constructor(private restaurantServiceFacade: RestaurantsFacade) {}

  updateAddress(address: Address): Observable<boolean> {
    return this.restaurantServiceFacade.postAddress(address).pipe(
      map((addressUpdated) => {
        if (addressUpdated) {
          this.currentAddress$.next(address);
        }
        return addressUpdated;
      })
    );
  }

  getRestaurants(searchQuery: string): Observable<boolean> {
    this.availableRestaurants$.next(null);
    this.restaurantServiceFacade
      .getRestaurants(searchQuery)
      .pipe(take(1))
      .subscribe((restaurants) => {
        this.availableRestaurants$.next(restaurants);
      });
    return of(true);
  }

  getRestaurant(id: string): Observable<boolean> {
    this.selectedRestaurant$.next(null);
    this.restaurantServiceFacade
      .getRestaurantDetails(id)
      .pipe(take(1), delay(5000))
      .subscribe((restaurant) => {
        this.selectedRestaurant$.next(restaurant);
      });
    return of(true);
  }
}
