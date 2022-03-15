import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface SearchResult {
  id: string;
  name: string;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent {
  constructor() {
    // empty constructor
  }

  searchQuery: string = '';
  @Input() suggestions: SearchResult[] = [];
  @Output() searchQueryChange = new EventEmitter<string>();
  @Output() viewAllRestaurantsSelected = new EventEmitter<string>();
  @Output() suggestionSelection = new EventEmitter<string>();
  @Output() searchCuisinesSelected = new EventEmitter<string>();
  @Output() searchQueryCleared = new EventEmitter<string>();

  handleSearchQueryChange(event: any) {
    this.searchQueryChange.next(this.searchQuery);
  }

  handleSuggestionSelection(event: any) {
    this.suggestionSelection.next(event.id);
  }

  handleSearchCuisines() {
    this.searchCuisinesSelected.emit(this.searchQuery);
  }

  handleViewAllRestaurants() {
    this.viewAllRestaurantsSelected.emit('');
  }

  handleSearchQueryCleared(event: any) {
    this.searchQueryCleared.emit('');
  }
}
