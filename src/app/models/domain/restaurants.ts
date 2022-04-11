export interface RestaurantDetails {
  name: string;
  imageUrl: string;
  formattedAddress: string;
  averageRating: number;
  minEstimatedDeliveryTime: number;
  maxEstimatedDeliveryTime: number;
  serviceProviders: string;
  menu: MenuCategory[];
}

export interface RestaurantSummary {
  id: string;
  name: string;
  imageUrl: string;
  averageRating: number;
  minEstimatedDeliveryTime: number;
  maxEstimatedDeliveryTime: number;
}

export interface ServiceProviders {
  serviceProviders: ServiceProviderRestaurant[];
  cheapestServiceProvider: string;
}

export interface ServiceProviderRestaurant {
  minEstimatedDeliveryTime: number;
  maxEstimatedDeliveryTime: number;
  rating: number;
  redirectUrl?: string;
  serviceProviderName: string;
  fees: Fee[];
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
