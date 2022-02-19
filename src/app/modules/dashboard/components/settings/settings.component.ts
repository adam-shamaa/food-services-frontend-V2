import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnInit, Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  @Input() isPanelShown = false;
  @Output() isPanelShownChange = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  openPanel() {
    this.isPanelShownChange.emit(true);
  }

  closePanel() {
    this.isPanelShownChange.emit(false);
  }

  restaurantSearch: string = ""
  test: string[] = ["Lowest Fees", "Fastest Delivery"]
  currentValue: number = 50;
}
