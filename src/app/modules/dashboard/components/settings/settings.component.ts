import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  panelShown = false;

  ngOnInit(): void {
  }

  openPanel() {
    this.panelShown = true;
  }

  closePanel() {
    this.panelShown = false;
  }

  restaurantSearch: string = ""
  test: string[] = ["a", "b", "c", "d"]
  currentValue: number = 50;
}
