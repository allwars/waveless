import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from '../../layouts/home-layout/home-layout.component';
import { DestinationService } from '../../core/services/destination.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HomeLayoutComponent],
  template: `
    <app-home-layout [destinations]="(destinations$ | async)!"></app-home-layout>
  `
})
export class HomePageComponent implements OnInit {
  private destinationService = inject(DestinationService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  destinations$ = this.destinationService.getDestinations();

  ngOnInit(): void {
    this.titleService.setTitle('WaveLess - Vive tus propias aventuras');
    this.metaService.updateTag({
      name: 'description',
      content: 'Para los que les gusta explorar y conocer mundo sin complejos. Encuentra tu próxima aventura.'
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'WaveLess - Vive tus propias aventuras'
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Explora destinos únicos y vive experiencias inolvidables.'
    });
    this.metaService.updateTag({
      property: 'og:type',
      content: 'website'
    });
  }
}
