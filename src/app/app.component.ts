import { Component, OnInit } from '@angular/core';
import { initializeMappers } from './models/mapper';
import { initializeDTOMetadataMaps } from './models/dto/metadataMap';
import { initializeDomainMetadataMaps } from './models/domain/metadataMap';
import { NavigationEnd, Router } from '@angular/router';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'food-services-frontend';

  ngOnInit(): void {
    initializeDTOMetadataMaps();
    initializeDomainMetadataMaps();
    initializeMappers();
  }

  constructor(public router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-9289N96EH1', {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }
}
