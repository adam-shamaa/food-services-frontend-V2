import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent {
  constructor() {
    // empty constructor
  }

  suggestions: string[] = [];

  @Input() searchQuery: string = '';
  @Output() searchQueryChange = new EventEmitter<string>();

  @Output() searchRestaurantsByQuery = new EventEmitter<string>();

  handleSearchQueryChange(event: any) {
    this.searchQueryChange.next(event.query);
    this.suggestions = [];
  }

  handleSearchRestaurants() {
    this.searchRestaurantsByQuery.next(this.searchQuery);
  }
}
