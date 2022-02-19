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
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  @ViewChild(SettingsComponent) settingsComponent!: SettingsComponent;

  isSettingsPanelShown = false;
  isSelectedRestaurantPanelShown: boolean = false;
  selectedRestaurantID?: string;

  // Pull in Store Data
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
  }

  handleSettingsShow() {
    if (this.isSettingsPanelShown) this.settingsComponent.closePanel();
    else this.settingsComponent.openPanel();
  }

  showDialog(restaurantId: string) {
    if (this.selectedRestaurantID != restaurantId)  {
      this.selectedRestaurantID = restaurantId;
      this.restaurantsService.getRestaurant(restaurantId)
    }
    this.isSelectedRestaurantPanelShown = true;
  }
}
