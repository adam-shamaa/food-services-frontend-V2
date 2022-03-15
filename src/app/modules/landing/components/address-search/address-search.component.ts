import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Address } from '../../../../models/domain/address';

@Component({
  selector: 'app-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.scss'],
})
export class AddressSearchComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapSearchField') searchField: ElementRef | undefined;
  @Output() handleSearch: EventEmitter<Address> = new EventEmitter();
  address: string = '';
  placedChangedListener: google.maps.MapsEventListener | undefined;

  constructor() {
    // empty constructor
  }

  ngAfterViewInit(): void {
    if (this.searchField) {
      const autocompleteBox = new google.maps.places.Autocomplete(
        this.searchField.nativeElement,
        {
          types: ['address'],
          componentRestrictions: {
            country: 'CA',
          },
        }
      );

      this.placedChangedListener = autocompleteBox.addListener(
        'place_changed',
        () => {
          const address = autocompleteBox.getPlace();

          this.handleSearch.emit({
            address: address.formatted_address!,
            street:
              address.address_components!.find((element) =>
                element.types.includes('street_number')
              )?.long_name! +
              ' ' +
              address.address_components!.find((element) =>
                element.types.includes('route')
              )?.long_name!,
            city: address.address_components!.find((element) =>
              element.types.includes('locality')
            )?.long_name!,
            province: address.address_components!.find((element) =>
              element.types.includes('administrative_area_level_1')
            )?.long_name!,
            country: address.address_components!.find((element) =>
              element.types.includes('country')
            )?.long_name!,
            postalCode: address.address_components!.find((element) =>
              element.types.includes('postal_code')
            )?.long_name!,
            latitude: address.geometry!.viewport!.getCenter().lat(),
            longitude: address.geometry!.viewport!.getCenter().lng(),
          });
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.placedChangedListener?.remove();
  }
}
