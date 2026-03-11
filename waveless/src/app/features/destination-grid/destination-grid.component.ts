import { Component, Input } from '@angular/core';
import { Destination } from '../../core/models/destination.model';
import { DestinationCardComponent } from '../destination-card/destination-card.component';

@Component({
  selector: 'app-destination-grid',
  standalone: true,
  imports: [DestinationCardComponent],
  template: `
    <section class="destination-grid">
      <div class="destination-grid__header">
        <h2 class="destination-grid__title">Vive tus propias aventuras</h2>
        <p class="destination-grid__subtitle">
          Para los que les gusta explorar y conocer mundo sin complejos
        </p>
      </div>

      <div class="destination-grid__filter-header">
        <h3 class="destination-grid__filter-title">Asia</h3>
        <button class="destination-grid__filter-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          Filtrar mi búsqueda
        </button>
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
    /* ===== MOBILE FIRST ===== */
    .destination-grid {
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .destination-grid__header {
      text-align: left;
      margin-bottom: 1.5rem;
    }

    .destination-grid__title {
      font-size: 1.8rem;
      font-weight: 700;
      color: #333;
      margin: 0 0 0.5rem 0;
      line-height: 1.2;
    }

    .destination-grid__subtitle {
      font-size: 1rem;
      color: #666;
      margin: 0;
      line-height: 1.5;
    }

    .destination-grid__filter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #eaeaea;
    }

    .destination-grid__filter-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #ff6b35;
      margin: 0;
    }

    .destination-grid__filter-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: none;
      border: 1px solid #ddd;
      border-radius: 30px;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      color: #666;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .destination-grid__filter-btn:hover {
      border-color: #ff6b35;
      color: #ff6b35;
    }

    .destination-grid__container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    /* ===== TABLET PEQUEÑA (480px en adelante) ===== */
    @media (min-width: 480px) {
      .destination-grid {
        padding: 1.5rem;
      }

      .destination-grid__container {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      .destination-grid__title {
        font-size: 2rem;
      }
    }

    /* ===== TABLET (768px en adelante) ===== */
    @media (min-width: 768px) {
      .destination-grid {
        padding: 2rem;
      }

      .destination-grid__container {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }

      .destination-grid__title {
        font-size: 2.2rem;
      }

      .destination-grid__subtitle {
        font-size: 1.1rem;
      }

      .destination-grid__filter-title {
        font-size: 1.5rem;
      }
    }

    /* ===== DESKTOP (1024px en adelante) ===== */
    @media (min-width: 1024px) {
      .destination-grid__container {
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
      }

      .destination-grid__title {
        font-size: 2.5rem;
      }
    }

    /* ===== DESKTOP GRANDE (1200px en adelante) ===== */
    @media (min-width: 1200px) {
      .destination-grid__container {
        gap: 2.5rem;
      }
    }
  `]
})
export class DestinationGridComponent {
  @Input() destinations: Destination[] = [];
}
