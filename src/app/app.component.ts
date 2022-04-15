import { Component, OnInit } from '@angular/core';
import { initializeMappers } from './models/mapper';
import { initializeDTOMetadataMaps } from './models/dto/metadataMap';
import { initializeDomainMetadataMaps } from './models/domain/metadataMap';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Title } from '@angular/platform-browser';

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

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.titleService.setTitle(
          this.route.root!.firstChild!.snapshot!.data['title']
        );
      });
  }

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private titleService: Title
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-9289N96EH1', {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }
}
