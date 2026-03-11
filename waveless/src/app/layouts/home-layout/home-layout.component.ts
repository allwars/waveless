import { Component, Input } from '@angular/core';
import { HeroComponent } from '../../features/hero/hero.component';
import { FilterSidebarComponent } from '../../features/filter-sidebar/filter-sidebar.component';
import { DestinationGridComponent } from '../../features/destination-grid/destination-grid.component';
import { Destination, FilterOption } from '../../core/models/destination.model';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [HeroComponent, FilterSidebarComponent, DestinationGridComponent],
  template: `
    <div class="home-layout">
      <app-hero></app-hero>

      <div class="home-layout__main">
        <app-filter-sidebar
          [destinos]="filterDestinos"
          [aventuras]="filterAventuras"
          [alojamientos]="filterAlojamientos"
          (onFilterChange)="handleFilterChange($event)"
          (onPriceChange)="handlePriceChange($event)"
        ></app-filter-sidebar>

        <main class="home-layout__content">
          <app-destination-grid [destinations]="destinations"></app-destination-grid>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .home-layout__main {
      display: grid;
      grid-template-columns: 300px 1fr;
      min-height: 100vh;
    }

    @media (max-width: 768px) {
      .home-layout__main {
        grid-template-columns: 1fr;
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
    // Aquí iría la lógica de filtrado
  }

  handlePriceChange(price: any) {
    console.log('Price changed:', price);
    // Aquí iría la lógica de filtrado por precio
  }
}
