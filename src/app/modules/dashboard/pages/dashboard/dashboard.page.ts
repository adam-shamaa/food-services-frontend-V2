import {
  AfterContentInit,
  AfterViewInit, ApplicationRef, ChangeDetectorRef,
  Component,
  ContentChild, ContentChildren,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild
} from '@angular/core';
import {SettingsComponent} from "../../components/settings/settings.component";
import {interval, Observable, Subject} from "rxjs";
import {RestaurantsService} from "../../../../services/restaurants/restaurants.service";
import {AggregatedServiceProviderRestaurants, RestaurantMetadata} from "../../../../models/restaurants";
import {Address} from "../../../landing/components/address-search/address-search.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  @ViewChild(SettingsComponent) settingsComponent!: SettingsComponent;

  settingsPanelShown = false;
  isVisible: boolean = false;
  selectedRestaurantID?: string;

  // Store Related Data
  currentAddress$: Observable<Address | undefined>;
  availableRestaurants$: Observable<RestaurantMetadata[] | null>;
  selectedRestaurant$: Observable<AggregatedServiceProviderRestaurants | null>;


  constructor(private restaurantsService: RestaurantsService) {
    this.availableRestaurants$ = this.restaurantsService.availableRestaurants;
    this.selectedRestaurant$ = this.restaurantsService.selectedRestaurant;
    this.currentAddress$ = this.restaurantsService.currentAddress;
  }

  ngOnInit(): void {
    this.restaurantsService.getRestaurants()
    this.restaurantsService.updateAddress({
      formatted_address: "123 Street Address",
      street: "",
      city: "",
      province: "",
      country: "",
      postalCode: "",
      latitude: 123,
      longitude: 321
    })
  }

  handleSettingsShow() {
    if (this.settingsPanelShown) this.settingsComponent.closePanel();
    else this.settingsComponent.openPanel();

    this.settingsPanelShown = !this.settingsPanelShown;
  }

  showDialog(restaurantId: string) {
    if (this.selectedRestaurantID != restaurantId)  {
      this.selectedRestaurantID = restaurantId;
      this.restaurantsService.getRestaurant(restaurantId)
    }
    this.isVisible = true;
  }

}
