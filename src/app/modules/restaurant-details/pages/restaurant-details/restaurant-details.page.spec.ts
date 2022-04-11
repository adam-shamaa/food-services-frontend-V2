import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantDetailsPage } from './restaurant-details.page';

describe('RestaurantDetailsPage', () => {
  let component: RestaurantDetailsPage;
  let fixture: ComponentFixture<RestaurantDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantDetailsPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
