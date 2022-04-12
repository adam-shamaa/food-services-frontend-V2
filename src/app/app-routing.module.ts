import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './modules/landing/pages/landing/landing.page';
import { DashboardPage } from './modules/dashboard/pages/dashboard/dashboard.page';
import { RestaurantDetailsPage } from './modules/restaurant-details/pages/restaurant-details/restaurant-details.page';
import { AddressGuard } from './modules/guards/address/address.guard';

const routes: Routes = [
  { path: '', component: LandingPage },
  {
    path: 'dashboard',
    canActivate: [AddressGuard],
    children: [
      {
        path: '',
        component: DashboardPage,
      },
      {
        path: ':restaurantId',
        component: RestaurantDetailsPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
