import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressSearchComponent } from './components/address-search/address-search.component';
import { LandingPage } from './pages/landing/landing.page';
import { GoogleMapsModule } from '@angular/google-maps';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AddressSearchComponent, LandingPage],
  exports: [AddressSearchComponent, LandingPage],
  imports: [
    CommonModule,
    GoogleMapsModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
  ],
})
export class LandingModule {}
