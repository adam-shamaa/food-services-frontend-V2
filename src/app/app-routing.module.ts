import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPage} from "./modules/landing/pages/landing/landing.page";
import {DashboardPage} from "./modules/dashboard/pages/dashboard/dashboard.page";
import {AddressGuard} from "./modules/guards/address/address.guard";

const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'dashboard', component: DashboardPage, canActivate: [AddressGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
