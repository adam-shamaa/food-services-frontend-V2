import {Component, NgZone, ViewChild} from '@angular/core';
import instructions from './landing-instructions.json';
import {RestaurantsService} from '../../../../services/restaurants/restaurants.service';
import {AddressSearchComponent} from '../../components/address-search/address-search.component';
import {Router} from '@angular/router';
import {take} from 'rxjs';
import {Address} from '../../../../models/domain/address';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {
  @ViewChild(AddressSearchComponent)
  addressSearchComponent!: AddressSearchComponent;

  instructionsList = instructions;


  constructor(
      private restaurantsService: RestaurantsService,
      private router: Router,
      private ngZone: NgZone
  ) {
  }

  handleSearch(address: Address) {
    this.restaurantsService
        .updateAddress(address)
        .pipe(take(1))
        .subscribe((addressUpdated) => {
          if (!addressUpdated) {
            return;
          }
          this.ngZone.run(() => {
            this.router.navigateByUrl('dashboard');
          });
        });
  }

  handleFooterCTAClick() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.addressSearchComponent.searchField?.nativeElement.focus({
      preventScroll: true,
    });
  }
}
