import { createMapper, mapFrom } from '@automapper/core';
import { pojos } from '@automapper/pojos';
import {
  RestaurantDetails,
  Fee,
  MenuCategory,
  MenuCategoryItem,
  RestaurantSummary,
  ServiceProviderRestaurant,
  ServiceProviders,
} from './domain/restaurants';
import {
  AddressRequestDto,
  FeeDto,
  MenuCategoryDto,
  MenuItemDto,
  RestaurantDetailsDto,
  RestaurantSummaryDto,
  RestaurantSummarysResponseDto,
  AddressDto,
  RestaurantServiceProviderDto,
  RestaurantServiceProvidersResponseDto,
} from '@adam-shamaa/food-services-aggregator-spec';
import { Address } from './domain/address';

export const mapper = createMapper({
  name: 'someName',
  pluginInitializer: pojos,
});

export function initializeMappers() {
  // **** ADDRESS ****
  mapper
    .createMap<Address, AddressRequestDto>('Address', 'AddressRequestDto')
    .forMember(
      (dest) => dest.address,
      mapFrom((source) =>
        mapper.map<Address, AddressDto>(source, 'AddressDto', 'Address')
      )
    );
  mapper.createMap<Address, AddressDto>('Address', 'AddressDto');

  // **** FEE ****
  mapper.createMap<FeeDto, Fee>('FeeDto', 'Fee');

  // **** MENU ****
  mapper.createMap<MenuCategoryDto, MenuCategory>(
    'MenuCategoryDto',
    'MenuCategory'
  );
  mapper.createMap<MenuItemDto, MenuCategoryItem>(
    'MenuItemDto',
    'MenuCategoryItem'
  );

  // **** RESTAURANT SUMMARY ****
  mapper.createMap<RestaurantSummarysResponseDto, RestaurantSummary[]>(
    'RestaurantSummarysResponseDto',
    'RestaurantSummary'
  );

  mapper.createMap<RestaurantSummaryDto, RestaurantSummary>(
    'RestaurantSummaryDto',
    'RestaurantSummary'
  );

  // **** RESTAURANT DETAILS ****
  mapper.createMap<RestaurantDetailsDto, RestaurantDetails>(
    'RestaurantDetailsDto',
    'RestaurantDetails'
  );

  // **** SERVICE PROVIDERS ****
  mapper.createMap<RestaurantServiceProvidersResponseDto, ServiceProviders>(
    'RestaurantServiceProvidersResponseDto',
    'ServiceProviders'
  );

  mapper.createMap<RestaurantServiceProviderDto, ServiceProviderRestaurant>(
    'RestaurantServiceProviderDto',
    'ServiceProviderRestaurant'
  );
}
