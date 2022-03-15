import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { RestaurantPreviewComponent } from './components/restaurant-preview/restaurant-preview.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    DashboardPage,
    RestaurantPreviewComponent,
    AutocompleteComponent,
    SettingsComponent,
  ],
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
  ],
})
export class DashboardModule {}
