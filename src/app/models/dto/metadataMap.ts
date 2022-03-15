import { createMetadataMap } from '@automapper/pojos';
import {
  AddressRequest,
  DetailedRestaurantResponse,
  ServiceProviderRestaurantResponse,
  FeeResponse,
  MenuCategoryResponse,
  MenuItemResponse,
  SummaryRestaurantResponse,
} from '@adam-shamaa/food-services-spec';

export const initializeDTOMetadataMaps = () => {
  createMetadataMap<AddressRequest>('AddressRequest', {
    address: String,
    city: String,
    province: String,
    postalCode: String,
    country: String,
    latitude: Number,
    longitude: Number,
  });

  createMetadataMap<DetailedRestaurantResponse>('DetailedRestaurantResponse', {
    name: String,
    imageUrl: String,
    formattedAddress: String,
    averageRating: Number,
    minEstimatedDeliveryTime: Number,
    maxEstimatedDeliveryTime: Number,
    serviceProviders: 'ServiceProviderRestaurantResponse',
    cheapestServiceProvider: String,
  });

  createMetadataMap<FeeResponse>('FeeResponse', {
    type: String,
    magnitude: Number,
    magnitudeUnits: String,
    currency: String,
  });

  createMetadataMap<MenuCategoryResponse>('MenuCategoryResponse', {
    name: String,
    items: 'MenuItemResponse',
  });

  createMetadataMap<MenuItemResponse>('MenuItemResponse', {
    name: String,
    description: String,
    magnitude: Number,
    magnitudeUnit: String,
    currency: String,
  });

  createMetadataMap<ServiceProviderRestaurantResponse>(
    'ServiceProviderRestaurantResponse',
    {
      minEstimatedDeliveryTime: Number,
      maxEstimatedDeliveryTime: Number,
      rating: Number,
      redirectUrl: String,
      serviceProviderName: String,
      fees: 'FeeResponse',
      menu: 'MenuCategoryResponse',
    }
  );

  createMetadataMap<SummaryRestaurantResponse>('SummaryRestaurantResponse', {
    name: String,
    imageUrl: String,
    averageRating: Number,
    minEstimatedDeliveryTime: Number,
    maxEstimatedDeliveryTime: Number,
    id: String,
  });
};
