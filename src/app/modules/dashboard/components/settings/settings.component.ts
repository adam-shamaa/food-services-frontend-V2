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

  @Input() isPanelShown = false;
  @Output() isPanelShownChange = new EventEmitter<boolean>();

  openPanel() {
    this.isPanelShownChange.emit(true);
  }

  closePanel() {
    this.isPanelShownChange.emit(false);
  }

  currentValue: number = 50;
}
