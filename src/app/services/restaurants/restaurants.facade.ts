import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Address } from '../../models/domain/address';
import { mapper } from '../../models/mapper';
import {
  AddressRequest,
  DetailedRestaurantResponse,
  SummaryRestaurantResponse,
} from '@adam-shamaa/food-services-spec';
import {
  AggregatedServiceProviderRestaurants,
  RestaurantSummary,
} from '../../models/domain/restaurants';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsFacade {
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  postAddress(address: Address): Observable<boolean> {
    return this.httpClient
      .post(
        this.baseUrl + '/address',
        mapper.map<Address, AddressRequest>(
          address,
          'AddressRequest',
          'Address'
        ),
        { observe: 'response', withCredentials: true }
      )
      .pipe(map((response) => response.status == 200));
  }

  getRestaurants(searchQuery: string): Observable<RestaurantSummary[]> {
    return this.httpClient
      .get<SummaryRestaurantResponse[]>(this.baseUrl + '/restaurants', {
        observe: 'response',
        withCredentials: true,
        params: { searchQuery: searchQuery },
      })
      .pipe(
        map((response) => response.body),
        map((list) =>
          list!.map((res) => {
            return mapper.map<SummaryRestaurantResponse, RestaurantSummary>(
              res,
              'RestaurantSummary',
              'SummaryRestaurantResponse'
            );
          })
        ),
        map((res) => {
          return res;
        })
      );
  }

  getRestaurantDetails(
    restaurantId: string
  ): Observable<AggregatedServiceProviderRestaurants> {
    return this.httpClient
      .get<DetailedRestaurantResponse>(
        this.baseUrl + '/restaurants/' + restaurantId,
        {
          observe: 'response',
          withCredentials: true,
          params: { subtotalCents: 1000 },
        }
      )
      .pipe(
        map((response) => response.body),
        map((responseBody) => {
          console.log(responseBody);
          return mapper.map<
            DetailedRestaurantResponse,
            AggregatedServiceProviderRestaurants
          >(
            responseBody!,
            'AggregatedServiceProviderRestaurants',
            'DetailedRestaurantResponse'
          );
        })
      );
  }
}
