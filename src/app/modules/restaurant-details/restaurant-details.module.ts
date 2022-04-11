import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConvertCurrencyUnitsPipe } from '../../services/restaurants/convert-currency-units.pipe';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RestaurantDetailsPage } from './pages/restaurant-details/restaurant-details.page';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AppModule } from '../../app.module';
import { SumPipe } from '../../services/restaurants/sum.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ConvertCurrencyUnitsPipe, RestaurantDetailsPage, SumPipe],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    AutoCompleteModule,
    SliderModule,
    DropdownModule,
    MatButtonToggleModule,
    DialogModule,
    SkeletonModule,
    InfiniteScrollModule,
    DashboardModule,
    MatProgressSpinnerModule,
  ],
})
export class RestaurantDetailsModule {}
