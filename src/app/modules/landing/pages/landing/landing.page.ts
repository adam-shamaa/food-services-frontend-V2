import {ApplicationRef, ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import instructions from "./landing-instructions.json"
import {RestaurantsService} from "../../../../services/restaurants/restaurants.service";
import {Address} from "../../components/address-search/address-search.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss']
})
export class LandingPage implements OnInit {

  public instructionsList: {imageURL: string, titleSummary: string, title: string, titleDescription: string}[] = instructions;

  constructor(private restaurantsService: RestaurantsService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

  }

  handleSearch(address: Address) {
    this.restaurantsService.updateAddress(address);
    this.ngZone.run(() => {
      this.router.navigateByUrl("dashboard")
    })
  }

}
