export interface AggregatedServiceProviderRestaurants {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  minEstimatedDeliveryTime: number;
  maxEstimatedDeliveryTime: number;
  serviceProviders: ServiceProviderRestaurant[];
  cheapestServiceProvider: string;
  formattedAddress: string;
}

export interface RestaurantSummary {
  id: string;
  name: string;
  imageUrl: string;
  averageRating: number;
  minEstimatedDeliveryTime: number;
  maxEstimatedDeliveryTime: number;
}

export interface ServiceProviderRestaurant {
  serviceProviderName: string;
  minEstimatedDeliveryTime: number;
  maxEstimatedDeliveryTime: number;
  redirectUrl?: string;
  fees: Fee[];
  menu: MenuCategory[];
}

export interface Fee {
  type: string;
  magnitude: number;
  magnitudeUnits: string;
  currency: string;
}

export interface MenuCategory {
  name: string;
  items: MenuCategoryItem[];
}

export interface MenuCategoryItem {
  name: string;
  description: string;
  magnitude: number;
  magnitudeUnit: string;
  currency: string;
}
