import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FilterChipComponent } from '../../shared/molecules/filter-chip/filter-chip.component';
import { PriceRangeComponent } from '../../shared/molecules/price-range/price-range.component';
import { ButtonComponent } from '../../shared/atoms/button/button.component';
import { FilterOption } from '../../core/models/destination.model';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [FilterChipComponent, PriceRangeComponent, ButtonComponent],
  template: `
    <aside class="filter-sidebar">
      <div class="filter-sidebar__section">
        <h3 class="filter-sidebar__title">Destinos</h3>
        <div class="filter-sidebar__chips">
          @for (destino of destinos; track destino.id) {
            <app-filter-chip
              [label]="destino.label"
              [count]="destino.count"
              [selected]="selectedDestinos.includes(destino.id)"
              (onToggle)="toggleDestino(destino.id)"
            ></app-filter-chip>
          }
        </div>
      </div>

      <div class="filter-sidebar__section">
        <h3 class="filter-sidebar__title">Aventura</h3>
        <div class="filter-sidebar__chips">
          @for (aventura of aventuras; track aventura.id) {
            <app-filter-chip
              [label]="aventura.label"
              [variant]="'activity'"
              [count]="aventura.count"
              [selected]="selectedAventuras.includes(aventura.id)"
              (onToggle)="toggleAventura(aventura.id)"
            ></app-filter-chip>
          }
        </div>
        <!-- Usamos ButtonComponent en lugar de un botón nativo -->
        <app-button
          variant="secondary"
          size="small"
          class="filter-sidebar__more-btn"
          (onClick)="showMoreAventuras()">
          Ver 21 más →
        </app-button>
      </div>

      <div class="filter-sidebar__section">
        <app-price-range
          title="Precio"
          (onPriceChange)="onPriceChange.emit($event)"
        ></app-price-range>
      </div>

      <div class="filter-sidebar__section">
        <h3 class="filter-sidebar__title">Alojamiento</h3>
        <div class="filter-sidebar__chips">
          @for (alojamiento of alojamientos; track alojamiento.id) {
            <app-filter-chip
              [label]="alojamiento.label"
              [count]="alojamiento.count"
              [selected]="selectedAlojamientos.includes(alojamiento.id)"
              (onToggle)="toggleAlojamiento(alojamiento.id)"
            ></app-filter-chip>
          }
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .filter-sidebar {
      padding: 1.5rem;
      background: white;
      border-right: 1px solid #eaeaea;
    }

    .filter-sidebar__section {
      margin-bottom: 2rem;
    }

    .filter-sidebar__title {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }

    .filter-sidebar__chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .filter-sidebar__more-btn {
      margin-top: 0.5rem;
    }

    @media (max-width: 768px) {
      .filter-sidebar {
        border-right: none;
        border-bottom: 1px solid #eaeaea;
      }
    }
  `]
})
export class FilterSidebarComponent {
  @Input() destinos: FilterOption[] = [];
  @Input() aventuras: FilterOption[] = [];
  @Input() alojamientos: FilterOption[] = [];

  selectedDestinos: string[] = [];
  selectedAventuras: string[] = [];
  selectedAlojamientos: string[] = [];

  @Output() onFilterChange = new EventEmitter<any>();
  @Output() onPriceChange = new EventEmitter<any>();

  toggleDestino(id: string) {
    const index = this.selectedDestinos.indexOf(id);
    if (index === -1) {
      this.selectedDestinos.push(id);
    } else {
      this.selectedDestinos.splice(index, 1);
    }
    this.emitFilters();
  }

  toggleAventura(id: string) {
    const index = this.selectedAventuras.indexOf(id);
    if (index === -1) {
      this.selectedAventuras.push(id);
    } else {
      this.selectedAventuras.splice(index, 1);
    }
    this.emitFilters();
  }

  toggleAlojamiento(id: string) {
    const index = this.selectedAlojamientos.indexOf(id);
    if (index === -1) {
      this.selectedAlojamientos.push(id);
    } else {
      this.selectedAlojamientos.splice(index, 1);
    }
    this.emitFilters();
  }

  showMoreAventuras() {
    console.log('Mostrar más aventuras');
    // Aquí iría la lógica para mostrar más aventuras
  }

  private emitFilters() {
    this.onFilterChange.emit({
      destinos: this.selectedDestinos,
      aventuras: this.selectedAventuras,
      alojamientos: this.selectedAlojamientos
    });
  }
}
