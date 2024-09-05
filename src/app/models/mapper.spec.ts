import { Address } from './domain/address';
import { RestaurantSummary } from './domain/restaurants';
import {
  AddressDto,
  AddressRequestDto,
  RestaurantSummaryDto,
} from '@adam-shamaa/food-services-aggregator-spec';
import { initializeMappers, mapper } from './mapper';
import { initializeDTOMetadataMaps } from './dto/metadataMap';
import { initializeDomainMetadataMaps } from './domain/metadataMap';

describe('Mapper', () => {
  beforeAll(() => {
    initializeDTOMetadataMaps();
    initializeDomainMetadataMaps();
    initializeMappers();
  });

  describe('Address Mappings', () => {
    const mockAddress: Address = {
      address: 'Sample address',
      street: 'Sample street',
      city: 'Sample city',
      province: 'Sample province',
      country: 'Sample country',
      postalCode: 'Sample postal code',
      latitude: 123,
      longitude: 321,
    };

    const mockAddressDto: AddressDto = {
      address: 'Sample address',
      city: 'Sample city',
      province: 'Sample province',
      country: 'Sample country',
      postalCode: 'Sample postal code',
      latitude: 123,
      longitude: 321,
    };

    const mockAddressRequestDto: AddressRequestDto = {
      address: mockAddressDto,
    };

    it('Should map an address into an addressDto', () => {
      expect(
        mapper.map<Address, AddressDto>(mockAddress, 'AddressDto', 'Address')
      ).toEqual(mockAddressDto);
    });

    it('Should map address into addressRequest', () => {
      expect(
        mapper.map<Address, AddressRequestDto>(
          mockAddress,
          'AddressRequestDto',
          'Address'
        )
      ).toEqual(mockAddressRequestDto);
    });
  });

  describe('Restaurant Summary', () => {
    const mockRestaurantSummaryDto: RestaurantSummaryDto = {
      id: 'test id',
      name: 'test name',
      imageUrl: 'test image url',
      averageRating: 12,
      minEstimatedDeliveryTime: 1,
      maxEstimatedDeliveryTime: 2,
    };

    const expectedRestaurantSummary: RestaurantSummary = {
      id: 'test id',
      name: 'test name',
      imageUrl: 'test image url',
      averageRating: 12,
      minEstimatedDeliveryTime: 1,
      maxEstimatedDeliveryTime: 2,
    };

    it('Should map RestaurantSummaryDto to RestaurantSummary', () => {
      expect(
        mapper.map<RestaurantSummaryDto, RestaurantSummary>(
          mockRestaurantSummaryDto,
          'RestaurantSummary',
          'RestaurantSummaryDto'
        )
      ).toEqual(expectedRestaurantSummary);
    });
  });

  /*
          describe('Restaurant Details Response', () => {
            const mockRestaurantDetailsResponse: RestaurantDetailsResponseDto = {
              restaurantDetails: {
                name: 'test name',
                imageUrl: 'test url',
                formattedAddress: 'test formatted address',
                averageRating: 12,
                minEstimatedDeliveryTime: 1,
                maxEstimatedDeliveryTime: 2,
                cheapestServiceProvider: undefined,
                serviceProviders: [
                  {
                    serviceProviderName: undefined,
                    minEstimatedDeliveryTime: 1,
                    maxEstimatedDeliveryTime: 2,
                    redirectUrl: 'test url 1',
                    fees: [
                      {
                        type: undefined,
                        magnitude: 1,
                        magnitudeUnits: CurrencyUnitsEnumDto.Cents,
                        currency: CurrencyEnumDto.Cad,
                      },
                    ],
                    menu: [],
                  },
                  {
                    serviceProviderName: ServiceProviderNameEnumDto.SkipTheDishes,
                    minEstimatedDeliveryTime: 3,
                    maxEstimatedDeliveryTime: 4,
                    redirectUrl: 'test url 2',
                    fees: [
                      {
                        type: FeeTypeEnumDto.Delivery,
                        magnitude: 1,
                        magnitudeUnits: CurrencyUnitsEnumDto.Cents,
                        currency: CurrencyEnumDto.Cad,
                      },
                      {
                        type: FeeTypeEnumDto.SmallOrder,
                        magnitude: 5,
                        magnitudeUnits: CurrencyUnitsEnumDto.Dollars,
                        currency: CurrencyEnumDto.Usd,
                      },
                    ],
                    menu: [],
                  },
                ],
              },
            };
      
            const expectedAggregatedServiceProviderRestaurants: AggregatedServiceProviderRestaurants =
              {
                id: '',
                cheapestServiceProvider: 'DoorDash',
                name: 'test name',
                imageUrl: 'test url',
                formattedAddress: 'test formatted address',
                rating: 12,
                minEstimatedDeliveryTime: 1,
                maxEstimatedDeliveryTime: 2,
                serviceProviders: [
                  {
                    serviceProviderName: 'DoorDash',
                    minEstimatedDeliveryTime: 1,
                    maxEstimatedDeliveryTime: 2,
                    redirectUrl: 'test url 1',
                    fees: [
                      {
                        type: 'Delivery',
                        magnitude: 1,
                        magnitudeUnits: 'Cents',
                        currency: 'CAD',
                      },
                    ],
                    menu: [],
                  },
                  {
                    serviceProviderName: 'SkipTheDishes',
                    minEstimatedDeliveryTime: 3,
                    maxEstimatedDeliveryTime: 4,
                    redirectUrl: 'test url 2',
                    fees: [
                      {
                        type: 'Delivery',
                        magnitude: 1,
                        magnitudeUnits: 'Cents',
                        currency: 'USD',
                      },
                      {
                        type: 'Small Order',
                        magnitude: 5,
                        magnitudeUnits: 'Dollars',
                        currency: 'CAD',
                      },
                    ],
                    menu: [],
                  },
                ],
              };
      
            it('should map dto to domain model', () => {
                                                        expect(
                                                          mapper.map<
                                                            RestaurantDetailsResponseDto,
                                                            AggregatedServiceProviderRestaurants
                                                          >(
                                                            mockRestaurantDetailsResponse,
                                                            'AggregatedServiceProviderRestaurants',
                                                            'RestaurantDetailsResponseDto'
                                                          )
                                                        ).toEqual(expectedAggregatedServiceProviderRestaurants);
          });
          })
          ;
          */
});
