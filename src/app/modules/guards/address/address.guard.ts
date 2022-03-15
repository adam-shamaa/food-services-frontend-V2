import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { RestaurantsService } from '../../../services/restaurants/restaurants.service';

@Injectable({
  providedIn: 'root',
})
export class AddressGuard implements CanActivate {
  constructor(
    private restaurantsService: RestaurantsService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.restaurantsService.currentAddress.pipe(
      take(1),
      map((currentAddress) => {
        if (currentAddress == null) {
          this.router.navigateByUrl('/');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
