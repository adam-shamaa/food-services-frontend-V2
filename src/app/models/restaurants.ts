export interface AggregatedServiceProviderRestaurants extends RestaurantMetadata{
  serviceProviders: ServiceProviderRestaurant[]
}

export interface RestaurantMetadata {
  id: string,
  name: string,
  imageURL: string,
  rating: number,
  estimatedDeliveryTime: number[]
}

export interface ServiceProviderRestaurant {
  serviceProviderName: string,
  fees: Fee[],
  menu: Category[]
}

export interface Fee {
  name: string,
  amountCents: number
}

export interface Category {
  categoryName: string,
  categoryItems: CategoryItem[]
}

export interface CategoryItem {
  name: string,
  amountCents: number,
  description: string
}
