import { TestBed } from '@angular/core/testing';

import { RestaurantsFacade } from './restaurants.facade';

describe('RestaurantService', () => {
  let service: RestaurantsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
