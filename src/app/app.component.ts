import { Component, OnInit } from '@angular/core';
import { initializeMappers } from './models/mapper';
import { initializeDTOMetadataMaps } from './models/dto/metadataMap';
import { initializeDomainMetadataMaps } from './models/domain/metadataMap';

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
}
