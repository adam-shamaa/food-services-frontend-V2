import { TestBed } from '@angular/core/testing';
import { RestaurantsUtility } from './restaurants.utility';

describe('RestaurantsUtility', () => {
  let service: RestaurantsUtility;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantsUtility);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
