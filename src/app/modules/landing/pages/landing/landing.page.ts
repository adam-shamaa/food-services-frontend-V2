import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnInit, QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import instructions from "./landing-instructions.json"
import {RestaurantsService} from "../../../../services/restaurants/restaurants.service";
import {Address, AddressSearchComponent} from "../../components/address-search/address-search.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss']
})
export class LandingPage implements OnInit {

  @ViewChild(AddressSearchComponent) addressSearchComponent!: AddressSearchComponent;

  instructionsList = instructions;

  constructor(private restaurantsService: RestaurantsService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
  }

  handleSearch(address: Address) {
    this.restaurantsService.updateAddress(address);
    this.ngZone.run(() => {
      this.router.navigateByUrl("dashboard")
    })
  }

  handleFooterCTAClick() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    this.addressSearchComponent.searchField?.nativeElement.focus({preventScroll: true});
  }
}
