import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { RestaurantsService } from '../../../services/restaurants/restaurants.service';
import { CookieService } from 'ngx-cookie-service';
import { Address } from '../../../models/domain/address';

@Injectable({
  providedIn: 'root',
})
export class AddressGuard implements CanActivate {
  constructor(
    private restaurantsService: RestaurantsService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | UrlTree {
    return this.restaurantsService.currentAddress.pipe(
      take(1),
      switchMap((currentAddress) => {
        if (currentAddress != null) {
          return of(true);
        }

        const frontEndAddressCookie =
          this.cookieService.get('front-end-address');
        if (frontEndAddressCookie == '') {
          return of(this.router.parseUrl(''));
        }

        const cookieAddress = JSON.parse(frontEndAddressCookie) as Address;

        return this.restaurantsService.updateAddress(cookieAddress);
      })
    );
  }
}
