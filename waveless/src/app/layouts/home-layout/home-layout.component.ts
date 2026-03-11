import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../features/header/header.component';
import { HeroSliderComponent } from '../../features/hero-slider/hero-slider.component';
import { FilterSidebarComponent } from '../../features/filter-sidebar/filter-sidebar.component';
import { DestinationGridComponent } from '../../features/destination-grid/destination-grid.component';
import { Destination, FilterOption } from '../../core/models/destination.model';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroSliderComponent,
    FilterSidebarComponent,
    DestinationGridComponent
  ],
  template: `
    <div class="home-layout">
      <app-header></app-header>
      <app-hero-slider></app-hero-slider>

      <div class="home-layout__main">
        <main class="home-layout__content">
          <app-destination-grid [destinations]="destinations"></app-destination-grid>
        </main>

        <app-filter-sidebar
          [destinos]="filterDestinos"
          [aventuras]="filterAventuras"
          [alojamientos]="filterAlojamientos"
          (onFilterChange)="handleFilterChange($event)"
          (onPriceChange)="handlePriceChange($event)"
        ></app-filter-sidebar>
      </div>
    </div>
  `,
  styles: [`
    /* ===== MOBILE FIRST ===== */
    .home-layout__main {
      display: grid;
      grid-template-columns: 1fr;
      min-height: 100vh;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    /* ===== DESKTOP (≥ 1024px) ===== */
    @media (min-width: 1024px) {
      .home-layout__main {
        grid-template-columns: 1fr 300px;
        gap: 2rem;
        padding: 2rem;
      }
    }
  `]
})
export class HomeLayoutComponent {
  @Input() destinations: Destination[] = [];

  filterDestinos: FilterOption[] = [
    { id: 'asia', label: 'Asia', count: 12 },
    { id: 'africa', label: 'África', count: 8 },
    { id: 'europa', label: 'Europa', count: 15 },
    { id: 'america', label: 'América', count: 10 }
  ];

  filterAventuras: FilterOption[] = [
    { id: 'quads', label: 'Quads', count: 6 },
    { id: 'parapente', label: 'Parapente', count: 4 },
    { id: 'rafting', label: 'Rafting', count: 8 },
    { id: 'explora', label: 'Explora', count: 12 },
    { id: 'lorem-ipsum', label: 'Lorem ipsum', count: 5 },
    { id: 'buceo', label: 'Buceo', count: 5 },
    { id: 'paracaidas', label: 'Paracaídas', count: 3 },
    { id: 'snowboard', label: 'Snowboard', count: 7 },
    { id: 'surf', label: 'Surf', count: 9 }
  ];

  filterAlojamientos: FilterOption[] = [
    { id: 'hotel', label: 'Hotel', count: 20 },
    { id: 'hostal', label: 'Hostal', count: 15 },
    { id: 'apartamento', label: 'Apartamento', count: 12 },
    { id: 'camping', label: 'Camping', count: 8 }
  ];

  handleFilterChange(filters: any) {
    console.log('Filters changed:', filters);
  }

  handlePriceChange(price: any) {
    console.log('Price changed:', price);
  }
}
