import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './modules/landing/pages/landing/landing.page';
import { DashboardPage } from './modules/dashboard/pages/dashboard/dashboard.page';
import { RestaurantDetailsPage } from './modules/restaurant-details/pages/restaurant-details/restaurant-details.page';
import { AddressGuard } from './modules/guards/address/address.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingPage,
    data: {
      title: 'Landing Page | Food-Services',
    },
  },
  {
    path: 'dashboard',
    canActivate: [AddressGuard],
    component: DashboardPage,
    data: {
      title: 'Available Restaurants | Food-Services',
    },
  },
  {
    path: 'dashboard/:restaurantId',
    canActivate: [AddressGuard],
    component: RestaurantDetailsPage,
    data: {
      title: 'Restaurant Details | Food-Services',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
