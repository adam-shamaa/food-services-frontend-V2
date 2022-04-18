import { Injectable } from '@angular/core';
import {
  RestaurantDetails,
  RestaurantSummary,
  ServiceProviders,
} from '../../models/domain/restaurants';
import { BehaviorSubject, map, Observable, of, Subject, take } from 'rxjs';
import { RestaurantsFacade } from './restaurants.facade';
import { Address } from '../../models/domain/address';
import { CookieService } from 'ngx-cookie-service';

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

  selectedRestaurant$: Subject<RestaurantDetails | null> = new Subject();
  selectedRestaurant: Observable<RestaurantDetails | null> =
    this.selectedRestaurant$.asObservable();

  selectedRestaurantServiceProviders$: Subject<
    ServiceProviders | null | undefined
  > = new Subject();
  selectedRestaurantServiceProviders: Observable<
    ServiceProviders | null | undefined
  > = this.selectedRestaurantServiceProviders$.asObservable();

  constructor(
    private restaurantServiceFacade: RestaurantsFacade,
    private cookieService: CookieService
  ) {}

  updateAddress(address: Address): Observable<boolean> {
    this.cookieService.set(
      'front-end-address',
      JSON.stringify(address),
      1,
      '/',
      '',
      true,
      'Strict'
    );
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

  getSingleRestaurant(id: string): Observable<boolean> {
    this.selectedRestaurant$.next(null);
    this.restaurantServiceFacade
      .getRestaurantDetails(id)
      .pipe(take(1))
      .subscribe((restaurant) => {
        this.selectedRestaurant$.next(restaurant);
      });
    return of(true);
  }

  getRestaurantServiceProviders(
    id: string,
    subtotal: number
  ): Observable<boolean> {
    this.selectedRestaurantServiceProviders$.next(undefined);
    this.restaurantServiceFacade
      .getServiceProviders(id, subtotal)
      .pipe(take(1))
      .subscribe((serviceProviders) => {
        this.selectedRestaurantServiceProviders$.next(serviceProviders);
      });
    return of(true);
  }
}
