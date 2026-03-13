import { Component, Input } from '@angular/core';
import { Destination } from '../../core/models/destination.model';
import { DestinationCardComponent } from '../destination-card/destination-card.component';

@Component({
  selector: 'app-destination-grid',
  standalone: true,
  imports: [DestinationCardComponent],
  template: `
    <section class="destination-grid">
      <div class="destination-grid__filter-header">
        <h3 class="destination-grid__filter-title">Asia</h3>
      </div>

      <div class="destination-grid__container">
        @for (destination of destinations; track destination.id) {
          <app-destination-card
            [destination]="destination"
          ></app-destination-card>
        }
      </div>
    </section>
  `,
  styles: [`
    .destination-grid {
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;

      &__filter-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 0.75rem;
      }

      &__filter-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #342E34;
        margin: 0;
      }

      &__container {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }

    /* MÓVIL */
    @media (min-width: 390px) and (max-width: 743px) {
      .destination-grid {
        padding: 1rem;

        &__filter-title {
          font-size: 1.25rem;
        }

        &__container {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
      }
    }

    /* TABLET */
    @media (min-width: 744px) and (max-width: 1023px) {
      .destination-grid {
        padding: 1.5rem;

        &__filter-title {
          font-size: 1.4rem;
        }

        &__container {
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
      }
    }

    /* DESKTOP */
    @media (min-width: 1024px) and (max-width: 1440px) {
      .destination-grid {
        padding: 1rem 0;

        &__filter-title {
          font-size: 1.5rem;
        }

        &__container {
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
      }
    }

    /* DESKTOP GRANDE */
    @media (min-width: 1441px) {
      .destination-grid {
        padding: 1.5rem 0;
        max-width: 1600px;

        &__filter-title {
          font-size: 1.8rem;
        }

        &__container {
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
      }
    }
  `]
})
export class DestinationGridComponent {
  @Input() destinations: Destination[] = [];
}
