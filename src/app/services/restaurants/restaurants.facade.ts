import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Address } from '../../models/domain/address';
import { mapper } from '../../models/mapper';
import {
  AddressRequestDto,
  RestaurantDetailsResponseDto,
  RestaurantSummarysResponseDto,
  RestaurantSummaryDto,
  RestaurantDetailsDto,
  RestaurantServiceProvidersResponseDto,
} from '@adam-shamaa/food-services-spec';
import {
  RestaurantDetails,
  RestaurantSummary,
  ServiceProviders,
} from '../../models/domain/restaurants';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsFacade {
  private baseUrl = environment.API_BASE_PATH;

  constructor(private httpClient: HttpClient) {}

  postAddress(address: Address): Observable<boolean> {
    return this.httpClient
      .post(
        this.baseUrl + '/address',
        mapper.map<Address, AddressRequestDto>(
          address,
          'AddressRequestDto',
          'Address'
        ),
        { observe: 'response', withCredentials: true }
      )
      .pipe(map((response) => response.status == 200));
  }

  getRestaurants(searchQuery: string): Observable<RestaurantSummary[]> {
    return this.httpClient
      .get<RestaurantSummarysResponseDto>(this.baseUrl + '/restaurants', {
        observe: 'response',
        withCredentials: true,
        params: { searchQuery: searchQuery, withCredentials: true },
      })
      .pipe(
        map((response) => response.body),
        map((res) => {
          return res!.availableRestaurants!.map((restaurant) =>
            mapper.map<RestaurantSummaryDto, RestaurantSummary>(
              restaurant,
              'RestaurantSummary',
              'RestaurantSummaryDto'
            )
          );
        })
      );
  }

  getRestaurantDetails(restaurantId: string): Observable<RestaurantDetails> {
    return this.httpClient
      .get<RestaurantDetailsResponseDto>(
        this.baseUrl + '/restaurants/' + restaurantId,
        {
          observe: 'response',
          withCredentials: true,
        }
      )
      .pipe(
        map((response) => response.body),
        map((responseBody) => {
          return mapper.map<RestaurantDetailsDto, RestaurantDetails>(
            responseBody!.restaurantDetails!,
            'RestaurantDetails',
            'RestaurantDetailsDto'
          );
        }),
        map((res) => {
          console.log(res);
          return res;
        })
      );
  }

  getServiceProviders(
    restaurantId: string,
    subtotal: number
  ): Observable<ServiceProviders> {
    return this.httpClient
      .get<RestaurantServiceProvidersResponseDto>(
        this.baseUrl + '/restaurants/' + restaurantId + '/service-providers',
        {
          observe: 'response',
          withCredentials: true,
          params: { subtotalCents: subtotal },
        }
      )
      .pipe(
        map((response) => response.body),
        map((responseBody) => {
          return mapper.map<
            RestaurantServiceProvidersResponseDto,
            ServiceProviders
          >(
            responseBody!,
            'ServiceProviders',
            'RestaurantServiceProvidersResponseDto'
          );
        }),
        map((res) => {
          console.log(res);
          return res;
        })
      );
  }
}
