import { Injectable } from '@angular/core';
import {AggregatedServiceProviderRestaurants, RestaurantMetadata} from "../../models/restaurants";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import MockSelectedRestaurant from "../../mocks/restaurants/SingleRestaurants.json"
import MockAvailableRestaurants from "../../mocks/restaurants/RestaurantMetadata.json"
import MockSelectedRestaurant2 from "../../mocks/restaurants/SingleRestaurants2.json"
import {Address} from "../../modules/landing/components/address-search/address-search.component";

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  currentAddress$: BehaviorSubject<Address | undefined> = new BehaviorSubject<Address | undefined>(undefined);
  currentAddress: Observable<Address | undefined> = this.currentAddress$.asObservable();

  availableRestaurants$: Subject<RestaurantMetadata[] | null> = new Subject();
  availableRestaurants: Observable<RestaurantMetadata[] | null> = this.availableRestaurants$.asObservable();

  selectedRestaurant$: Subject<AggregatedServiceProviderRestaurants | null> = new Subject();
  selectedRestaurant: Observable<AggregatedServiceProviderRestaurants | null> = this.selectedRestaurant$.asObservable();

  constructor() { }

  updateAddress(address: Address) {
    this.currentAddress$.next(address);
  }

  getRestaurants() : Observable<boolean> {
    this.availableRestaurants$.next(null);
    setTimeout(() => {
      this.availableRestaurants$.next(MockAvailableRestaurants as RestaurantMetadata[]);
    }, 0)
    return of(true);
  }

  getRestaurant(id: string) : Observable<boolean> {
    this.selectedRestaurant$.next( null);
    setTimeout(() => {
      this.selectedRestaurant$.next( MockSelectedRestaurant as AggregatedServiceProviderRestaurants);
    }, 0)

    return of(true);
  }
}
