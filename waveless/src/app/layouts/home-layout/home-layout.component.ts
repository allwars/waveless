import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../features/header/header.component';
import { HeroSliderComponent } from '../../features/hero-slider/hero-slider.component';
import { FilterSidebarComponent } from '../../features/filter-sidebar/filter-sidebar.component';
import { DestinationGridComponent } from '../../features/destination-grid/destination-grid.component';
import { FooterComponent } from '../../features/footer/footer.component';
import { Destination, FilterOption } from '../../core/models/destination.model';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroSliderComponent,
    FilterSidebarComponent,
    DestinationGridComponent,
    FooterComponent
  ],
  template: `
    <div class="home-layout">
      <app-header></app-header>
      <app-hero-slider></app-hero-slider>

      <div class="destination-grid__header">
        <h2 class="destination-grid__title">Vive tus propias aventuras</h2>
        <p class="destination-grid__subtitle">
          Para los que les gusta explorar y conocer mundo sin complejos
        </p>
      </div>

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

      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .home-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .destination-grid {
      &__header {
        text-align: center;
        margin: 2rem auto 0;
        padding: 0 1rem;
        max-width: 1200px;
      }

      &__title {
        font-size: 1.8rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 0.5rem 0;
        line-height: 1.2;
      }

      &__subtitle {
        font-size: 1rem;
        color: #666;
        margin: 0;
        line-height: 1.5;
      }
    }

    .home-layout {
      &__main {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        max-width: 1200px;
        margin: 0 auto 3rem;
        padding: 0 1rem;
        flex: 1;
        width: 100%;
      }

      &__content {
        width: 100%;
      }
    }

    /* MÓVIL */
    @media (min-width: 390px) and (max-width: 743px) {
      .destination-grid {
        &__header {
          margin: 1.5rem auto 0;
        }

        &__title {
          font-size: 1.8rem;
        }

        &__subtitle {
          font-size: 1rem;
        }
      }

      .home-layout__main {
        padding: 0 1rem;
      }
    }

    /* TABLET */
    @media (min-width: 744px) and (max-width: 1023px) {
      .destination-grid {
        &__header {
          margin: 2rem auto 0;
        }

        &__title {
          font-size: 2rem;
        }

        &__subtitle {
          font-size: 1.1rem;
        }
      }

      .home-layout__main {
        padding: 0 1.5rem;
      }
    }

    /* DESKTOP */
    @media (min-width: 1024px) and (max-width: 1440px) {
      .destination-grid {
        &__header {
          margin: 2.5rem auto 0;
          padding: 0 2rem;
        }

        &__title {
          font-size: 2.2rem;
        }

        &__subtitle {
          font-size: 1.1rem;
        }
      }

      .home-layout {
        &__main {
          padding: 0 2rem;
        }

        &__content {
          flex: 1;
        }
      }
    }

    /* DESKTOP GRANDE */
    @media (min-width: 1441px) {
      .destination-grid {
        &__header {
          margin: 3rem auto 0;
          padding: 0 3rem;
          max-width: 1600px;
        }

        &__title {
          font-size: 2.5rem;
        }

        &__subtitle {
          font-size: 1.2rem;
        }
      }

      .home-layout {
        &__main {
          flex-direction: row;
          gap: 3rem;
          padding: 0 3rem;
          max-width: 1600px;
        }

        &__content {
          flex: 1;
        }
      }
    }
  `]
})
export class HomeLayoutComponent {
  @Input() destinations: Destination[] = [];

  filterDestinos: FilterOption[] = [
    { id: 'asia', label: 'Asia' },
    { id: 'africa', label: 'África' },
    { id: 'europa', label: 'Europa' },
    { id: 'america', label: 'América' }
  ];

  filterAventuras: FilterOption[] = [
    { id: 'quads', label: 'Quads' },
    { id: 'parapente', label: 'Parapente' },
    { id: 'rafting', label: 'Rafting' },
    { id: 'explora', label: 'Explora' },
    { id: 'lorem-ipsum', label: 'Lorem ipsum' },
    { id: 'buceo', label: 'Buceo' },
    { id: 'paracaidas', label: 'Paracaídas' },
    { id: 'snowboard', label: 'Snowboard' },
    { id: 'surf', label: 'Surf' }
  ];

  filterAlojamientos: FilterOption[] = [
    { id: 'hotel', label: 'Hotel' },
    { id: 'hostal', label: 'Hostal'},
    { id: 'apartamento', label: 'Apartamento' },
    { id: 'camping', label: 'Camping' }
  ];

  handleFilterChange(filters: any) {
    console.log('Filters changed:', filters);
  }

  handlePriceChange(price: any) {
    console.log('Price changed:', price);
  }
}
