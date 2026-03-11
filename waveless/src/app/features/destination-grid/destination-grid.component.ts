import { Component, Input } from '@angular/core';
import { Destination } from '../../core/models/destination.model';
import { DestinationCardComponent } from '../destination-card/destination-card.component';

@Component({
  selector: 'app-destination-grid',
  standalone: true,
  imports: [DestinationCardComponent],
  template: `
    <div class="destination-grid">
      <h2 class="destination-grid__title">Destinos populares</h2>
      <div class="destination-grid__container">
        @for (destination of destinations; track destination.id) {
          <app-destination-card
            [destination]="destination"
            class="destination-grid__item"
          ></app-destination-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .destination-grid {
      padding: 2rem;
    }

    .destination-grid__title {
      font-size: 2rem;
      margin-bottom: 2rem;
      color: #333;
    }

    .destination-grid__container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    @media (max-width: 768px) {
      .destination-grid {
        padding: 1rem;
      }

      .destination-grid__container {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DestinationGridComponent {
  @Input() destinations: Destination[] = [];
}
