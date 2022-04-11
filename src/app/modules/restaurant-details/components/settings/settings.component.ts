import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor() {
    // empty constructor
  }

  currentSubtotalValue: number = 20;
  @Output() subtotalValueChange = new EventEmitter<number>();

  handleSubtotalValueChange() {
    this.subtotalValueChange.emit(this.currentSubtotalValue);
  }
}
