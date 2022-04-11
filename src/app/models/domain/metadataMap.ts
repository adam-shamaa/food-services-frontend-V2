import { createMetadataMap } from '@automapper/pojos';
import {
  RestaurantDetails,
  Fee,
  MenuCategory,
  MenuCategoryItem,
  RestaurantSummary,
  ServiceProviderRestaurant,
  ServiceProviders,
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

  createMetadataMap<RestaurantDetails>('RestaurantDetails', {
    name: String,
    imageUrl: String,
    formattedAddress: String,
    averageRating: String,
    minEstimatedDeliveryTime: Number,
    maxEstimatedDeliveryTime: Number,
    serviceProviders: String,
    menu: 'MenuCategory',
  });

  createMetadataMap<RestaurantSummary>('RestaurantSummary', {
    id: String,
    name: String,
    imageUrl: String,
    averageRating: Number,
    minEstimatedDeliveryTime: Number,
    maxEstimatedDeliveryTime: Number,
  });

  createMetadataMap<ServiceProviders>('ServiceProviders', {
    serviceProviders: 'ServiceProviderRestaurant',
    cheapestServiceProvider: String,
  });

  createMetadataMap<ServiceProviderRestaurant>('ServiceProviderRestaurant', {
    serviceProviderName: String,
    minEstimatedDeliveryTime: Number,
    maxEstimatedDeliveryTime: Number,
    redirectUrl: String,
    rating: Number,
    fees: 'Fee',
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
    imageUrl: String,
  });
};
