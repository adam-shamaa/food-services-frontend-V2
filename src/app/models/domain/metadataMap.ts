import { createMetadataMap } from '@automapper/pojos';
import {
  AggregatedServiceProviderRestaurants,
  Fee,
  MenuCategory,
  MenuCategoryItem,
  RestaurantSummary,
  ServiceProviderRestaurant,
} from './restaurants';
import { Address } from './address';

export const initializeDomainMetadataMaps = () => {
  createMetadataMap<Address>('Address', {
    address: String,
    street: String,
    city: String,
    province: String,
    country: String,
    postalCode: String,
    latitude: Number,
    longitude: Number,
  });

  createMetadataMap<AggregatedServiceProviderRestaurants>(
    'AggregatedServiceProviderRestaurants',
    {
      id: String,
      name: String,
      imageUrl: String,
      rating: String,
      minEstimatedDeliveryTime: Number,
      maxEstimatedDeliveryTime: Number,
      serviceProviders: 'ServiceProviderRestaurant',
      cheapestServiceProvider: String,
      formattedAddress: String,
    }
  );

  createMetadataMap<RestaurantSummary>('RestaurantSummary', {
    id: String,
    name: String,
    imageUrl: String,
    averageRating: Number,
    minEstimatedDeliveryTime: Number,
    maxEstimatedDeliveryTime: Number,
  });

  createMetadataMap<ServiceProviderRestaurant>('ServiceProviderRestaurant', {
    serviceProviderName: String,
    minEstimatedDeliveryTime: Number,
    maxEstimatedDeliveryTime: Number,
    redirectUrl: String,
    fees: 'Fee',
    menu: 'MenuCategory',
  });

  createMetadataMap<Fee>('Fee', {
    type: String,
    magnitude: Number,
    magnitudeUnits: String,
    currency: String,
  });

  createMetadataMap<MenuCategory>('MenuCategory', {
    name: String,
    items: 'MenuCategoryItem',
  });

  createMetadataMap<MenuCategoryItem>('MenuCategoryItem', {
    name: String,
    description: String,
    magnitude: Number,
    magnitudeUnit: String,
    currency: String,
  });
};
