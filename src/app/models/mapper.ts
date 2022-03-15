import { createMapper } from '@automapper/core';
import { pojos } from '@automapper/pojos';
import {
  AggregatedServiceProviderRestaurants,
  Fee,
  MenuCategory,
  MenuCategoryItem,
  RestaurantSummary,
  ServiceProviderRestaurant,
} from './domain/restaurants';
import {
  AddressRequest,
  DetailedRestaurantResponse,
  ServiceProviderRestaurantResponse,
  FeeResponse,
  MenuCategoryResponse,
  MenuItemResponse,
  SummaryRestaurantResponse,
} from '@adam-shamaa/food-services-spec';
import { Address } from './domain/address';

export const mapper = createMapper({
  name: 'someName',
  pluginInitializer: pojos,
});

export function initializeMappers() {
  mapper.createMap<
    DetailedRestaurantResponse,
    AggregatedServiceProviderRestaurants
  >('DetailedRestaurantResponse', 'AggregatedServiceProviderRestaurants');
  mapper.createMap<Address, AddressRequest>('Address', 'AddressRequest');
  mapper.createMap<FeeResponse, Fee>('FeeResponse', 'Fee');
  mapper.createMap<MenuCategoryResponse, MenuCategory>(
    'MenuCategoryResponse',
    'MenuCategory'
  );
  mapper.createMap<MenuItemResponse, MenuCategoryItem>(
    'MenuItemResponse',
    'MenuCategoryItem'
  );
  mapper.createMap<
    ServiceProviderRestaurantResponse,
    ServiceProviderRestaurant
  >('ServiceProviderRestaurantResponse', 'ServiceProviderRestaurant');
  mapper.createMap<SummaryRestaurantResponse, RestaurantSummary>(
    'SummaryRestaurantResponse',
    'RestaurantSummary'
  );
}
