import { createMetadataMap } from '@automapper/pojos';
import {
  AddressDto,
  FeeDto,
  MenuCategoryDto,
  MenuItemDto,
  RestaurantSummaryDto,
  AddressRequestDto,
  RestaurantSummarysResponseDto,
  RestaurantDetailsResponseDto,
  RestaurantServiceProviderDto,
  RestaurantServiceProvidersResponseDto,
} from '@adam-shamaa/food-services-aggregator-spec';
import { RestaurantDetailsDto } from '@adam-shamaa/food-services-aggregator-spec/model/restaurantDetails';
import { ServiceProviderNameEnumDto } from '@adam-shamaa/food-services-aggregator-spec/model/serviceProviderNameEnum';

export const initializeDTOMetadataMaps = () => {
  // ***** Address ******
  createMetadataMap<AddressRequestDto>('AddressRequestDto', {
    address: 'AddressDto',
  });
  createMetadataMap<AddressDto>('AddressDto', {
    address: String,
    city: String,
    province: String,
    postalCode: String,
    country: String,
    latitude: Number,
    longitude: Number,
  });

  createMetadataMap<RestaurantDetailsResponseDto>(
    'RestaurantDetailsResponseDto',
    {
      restaurantDetails: 'RestaurantDetailsDto',
    }
  );

  // ***** Restaurant Details ******
  createMetadataMap<RestaurantDetailsDto>('RestaurantDetailsDto', {
    name: String,
    imageUrl: String,
    formattedAddress: String,
    averageRating: Number,
    minEstimatedDeliveryTime: Number,
    maxEstimatedDeliveryTime: Number,
    serviceProviders: String,
    menu: 'MenuCategoryDto',
  });

  createMetadataMap<MenuCategoryDto>('MenuCategoryDto', {
    name: String,
    items: 'MenuItemDto',
  });

  createMetadataMap<MenuItemDto>('MenuItemDto', {
    name: String,
    description: String,
    magnitude: Number,
    magnitudeUnit: String,
    currency: String,
    imageUrl: String,
  });

  // ***** Restaurant Service Providers ******
  createMetadataMap<RestaurantServiceProvidersResponseDto>(
    'RestaurantServiceProvidersResponseDto',
    {
      serviceProviders: 'RestaurantServiceProviderDto',
      cheapestServiceProvider: String,
    }
  );

  createMetadataMap<RestaurantServiceProviderDto>(
    'RestaurantServiceProviderDto',
    {
      minEstimatedDeliveryTime: Number,
      maxEstimatedDeliveryTime: Number,
      rating: Number,
      redirectUrl: String,
      serviceProviderName: String,
      fees: 'FeeDto',
    }
  );

  createMetadataMap<FeeDto>('FeeDto', {
    type: String,
    magnitude: Number,
    magnitudeUnits: String,
    currency: String,
  });

  createMetadataMap<RestaurantSummarysResponseDto>(
    'RestaurantSummarysResponseDto',
    {
      availableRestaurants: 'RestaurantSummaryDto',
    }
  );

  createMetadataMap<RestaurantSummaryDto>('RestaurantSummaryDto', {
    name: String,
    imageUrl: String,
    averageRating: Number,
    minEstimatedDeliveryTime: Number,
    maxEstimatedDeliveryTime: Number,
    id: String,
  });
};
