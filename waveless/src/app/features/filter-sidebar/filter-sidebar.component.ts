import { Component, Input, Output, EventEmitter, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FilterOption } from '../../core/models/destination.model';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  template: `
    <!-- Botón de filtros para móvil/tablet -->
    @if (isMobile) {
      <div class="filter-button-container">
        <button class="filter-button" (click)="toggleFilterMenu()">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          Filtrar mi búsqueda
        </button>
      </div>
    }

    <!-- Menú lateral para desktop -->
    @if (!isMobile) {
      <aside class="filter-sidebar">
        <div class="filter-sidebar__header">
          <h2 class="filter-sidebar__title">Filtrar mi búsqueda</h2>
        </div>

        <div class="filter-sidebar__content">
          <!-- Destinos -->
          <div class="filter-section">
            <h3 class="filter-section__title">Destinos</h3>
            <div class="filter-section__options">
              @for (destino of destinos; track destino.id) {
                <label class="filter-option">
                  <input
                    type="checkbox"
                    [checked]="selectedDestinos.includes(destino.id)"
                    (change)="toggleDestino(destino.id)"
                    class="filter-option__checkbox">
                  <span class="filter-option__label">{{ destino.label }}</span>
                  @if (destino.count) {
                    <span class="filter-option__count">{{ destino.count }}</span>
                  }
                </label>
              }
            </div>
          </div>

          <!-- Aventura -->
          <div class="filter-section">
            <h3 class="filter-section__title">Aventura</h3>
            <div class="filter-section__options">
              @for (aventura of aventuras.slice(0, 3); track aventura.id) {
                <label class="filter-option">
                  <input
                    type="checkbox"
                    [checked]="selectedAventuras.includes(aventura.id)"
                    (change)="toggleAventura(aventura.id)"
                    class="filter-option__checkbox">
                  <span class="filter-option__label">{{ aventura.label }}</span>
                  @if (aventura.count) {
                    <span class="filter-option__count">{{ aventura.count }}</span>
                  }
                </label>
              }
            </div>

            <!-- Submenú Explora -->
            <div class="filter-subsection">
              <h4 class="filter-subsection__title">Explora</h4>
              <div class="filter-section__options filter-section__options--indented">
                @for (aventura of aventuras.slice(3, 8); track aventura.id) {
                  <label class="filter-option">
                    <input
                      type="checkbox"
                      [checked]="selectedAventuras.includes(aventura.id)"
                      (change)="toggleAventura(aventura.id)"
                      class="filter-option__checkbox">
                    <span class="filter-option__label">{{ aventura.label }}</span>
                    @if (aventura.count) {
                      <span class="filter-option__count">{{ aventura.count }}</span>
                    }
                  </label>
                }
              </div>
            </div>

            <button class="filter-section__more-btn" (click)="showMoreAventuras()">
              Ver 21 más
            </button>
          </div>

          <!-- Alojamiento -->
          <div class="filter-section">
            <h3 class="filter-section__title">Alojamiento</h3>
            <div class="filter-section__options">
              @for (alojamiento of alojamientos; track alojamiento.id) {
                <label class="filter-option">
                  <input
                    type="checkbox"
                    [checked]="selectedAlojamientos.includes(alojamiento.id)"
                    (change)="toggleAlojamiento(alojamiento.id)"
                    class="filter-option__checkbox">
                  <span class="filter-option__label">{{ alojamiento.label }}</span>
                  @if (alojamiento.count) {
                    <span class="filter-option__count">{{ alojamiento.count }}</span>
                  }
                </label>
              }
            </div>
          </div>

          <!-- Precio -->
          <div class="filter-section">
            <h3 class="filter-section__title">Precio</h3>
            <div class="filter-price">
              <div class="filter-price__inputs">
                <div class="filter-price__input-group">
                  <label class="filter-price__label">Mínimo</label>
                  <input
                    type="number"
                    class="filter-price__field"
                    placeholder="0"
                    (input)="onMinPriceChange($event)">
                </div>
                <div class="filter-price__input-group">
                  <label class="filter-price__label">Máximo</label>
                  <input
                    type="number"
                    class="filter-price__field"
                    placeholder="10000"
                    (input)="onMaxPriceChange($event)">
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    }

    <!-- Menú móvil deslizante -->
    @if (isMobile && showMobileMenu) {
      <div class="mobile-menu">
        <div class="mobile-menu__overlay" (click)="closeFilterMenu()"></div>
        <div class="mobile-menu__content">
          <div class="mobile-menu__header">
            <h2 class="mobile-menu__title">Filtrar mi búsqueda</h2>
            <button class="mobile-menu__close" (click)="closeFilterMenu()">✕</button>
          </div>

          <div class="mobile-menu__body">
            <!-- Destinos -->
            <div class="filter-section">
              <h3 class="filter-section__title">Destinos</h3>
              <div class="filter-section__options">
                @for (destino of destinos; track destino.id) {
                  <label class="filter-option">
                    <input
                      type="checkbox"
                      [checked]="selectedDestinos.includes(destino.id)"
                      (change)="toggleDestino(destino.id)"
                      class="filter-option__checkbox">
                    <span class="filter-option__label">{{ destino.label }}</span>
                  </label>
                }
              </div>
            </div>

            <!-- Aventura -->
            <div class="filter-section">
              <h3 class="filter-section__title">Aventura</h3>
              <div class="filter-section__options">
                @for (aventura of aventuras.slice(0, 3); track aventura.id) {
                  <label class="filter-option">
                    <input
                      type="checkbox"
                      [checked]="selectedAventuras.includes(aventura.id)"
                      (change)="toggleAventura(aventura.id)"
                      class="filter-option__checkbox">
                    <span class="filter-option__label">{{ aventura.label }}</span>
                  </label>
                }
              </div>

              <div class="filter-subsection">
                <h4 class="filter-subsection__title">Explora</h4>
                <div class="filter-section__options filter-section__options--indented">
                  @for (aventura of aventuras.slice(3, 8); track aventura.id) {
                    <label class="filter-option">
                      <input
                        type="checkbox"
                        [checked]="selectedAventuras.includes(aventura.id)"
                        (change)="toggleAventura(aventura.id)"
                        class="filter-option__checkbox">
                      <span class="filter-option__label">{{ aventura.label }}</span>
                    </label>
                  }
                </div>
              </div>

              <button class="filter-section__more-btn" (click)="showMoreAventuras()">
                Ver 21 más
              </button>
            </div>

            <!-- Alojamiento -->
            <div class="filter-section">
              <h3 class="filter-section__title">Alojamiento</h3>
              <div class="filter-section__options">
                @for (alojamiento of alojamientos; track alojamiento.id) {
                  <label class="filter-option">
                    <input
                      type="checkbox"
                      [checked]="selectedAlojamientos.includes(alojamiento.id)"
                      (change)="toggleAlojamiento(alojamiento.id)"
                      class="filter-option__checkbox">
                    <span class="filter-option__label">{{ alojamiento.label }}</span>
                  </label>
                }
              </div>
            </div>

            <!-- Precio -->
            <div class="filter-section">
              <h3 class="filter-section__title">Precio</h3>
              <div class="filter-price">
                <div class="filter-price__inputs">
                  <div class="filter-price__input-group">
                    <label class="filter-price__label">Mínimo</label>
                    <input
                      type="number"
                      class="filter-price__field"
                      placeholder="0"
                      (input)="onMinPriceChange($event)">
                  </div>
                  <div class="filter-price__input-group">
                    <label class="filter-price__label">Máximo</label>
                    <input
                      type="number"
                      class="filter-price__field"
                      placeholder="10000"
                      (input)="onMaxPriceChange($event)">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mobile-menu__footer">
            <button class="mobile-menu__apply-btn" (click)="applyFilters()">Aplicar filtros</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    /* ===== MOBILE FIRST (< 1024px) ===== */
    .filter-button-container {
      padding: 1rem;
      background: white;
      border-bottom: 1px solid #eaeaea;
    }

    .filter-button {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background-color: white;
      border: 1px solid #ff6b35;
      color: #ff6b35;
      font-size: 1rem;
      font-weight: 500;
      padding: 0.75rem;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .filter-button:hover {
      background-color: #ff6b35;
      color: white;
    }

    /* Menú móvil deslizante */
    .mobile-menu {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2000;
      display: flex;
    }

    .mobile-menu__overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(4px);
    }

    .mobile-menu__content {
      position: relative;
      width: 100%;
      max-width: 400px;
      height: 100vh;
      background: white;
      margin-left: auto;
      animation: slideIn 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }

    .mobile-menu__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #eaeaea;
    }

    .mobile-menu__title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #333;
      margin: 0;
    }

    .mobile-menu__close {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #999;
      cursor: pointer;
      padding: 0.5rem;
      line-height: 1;
    }

    .mobile-menu__close:hover {
      color: #ff6b35;
    }

    .mobile-menu__body {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
    }

    .mobile-menu__footer {
      padding: 1.5rem;
      border-top: 1px solid #eaeaea;
    }

    .mobile-menu__apply-btn {
      width: 100%;
      background-color: #ff6b35;
      color: white;
      border: none;
      border-radius: 30px;
      padding: 1rem;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .mobile-menu__apply-btn:hover {
      background-color: #e85a2a;
    }

    /* ===== DESKTOP (≥ 1024px) ===== */
    @media (min-width: 1024px) {
      .filter-sidebar {
        width: 300px;
        background: white;
        border-left: 1px solid #eaeaea;
        height: fit-content;
        position: sticky;
        top: 80px;
        padding: 1.5rem;
      }

      .filter-sidebar__header {
        margin-bottom: 1.5rem;
      }

      .filter-sidebar__title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #333;
        margin: 0;
      }

      .filter-sidebar__content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
    }

    /* Estilos comunes para filtros */
    .filter-section {
      margin-bottom: 1.5rem;
    }

    .filter-section__title {
      font-size: 1rem;
      font-weight: 600;
      color: #333;
      margin: 0 0 1rem 0;
    }

    .filter-section__options {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .filter-section__options--indented {
      margin-left: 1.5rem;
      margin-top: 0.75rem;
    }

    .filter-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-size: 0.95rem;
      color: #666;
    }

    .filter-option__checkbox {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: #ff6b35;
    }

    .filter-option__label {
      flex: 1;
    }

    .filter-option__count {
      color: #999;
      font-size: 0.85rem;
    }

    .filter-subsection {
      margin-top: 0.75rem;
    }

    .filter-subsection__title {
      font-size: 0.95rem;
      font-weight: 500;
      color: #666;
      margin: 0 0 0.75rem 0;
    }

    .filter-section__more-btn {
      background: none;
      border: none;
      color: #ff6b35;
      font-size: 0.9rem;
      cursor: pointer;
      padding: 0.5rem 0;
      margin-top: 0.5rem;
    }

    .filter-section__more-btn:hover {
      text-decoration: underline;
    }

    /* Precio */
    .filter-price__inputs {
      display: flex;
      gap: 1rem;
    }

    .filter-price__input-group {
      flex: 1;
    }

    .filter-price__label {
      display: block;
      font-size: 0.85rem;
      color: #666;
      margin-bottom: 0.25rem;
    }

    .filter-price__field {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 0.9rem;
    }

    .filter-price__field:focus {
      outline: none;
      border-color: #ff6b35;
    }
  `]
})
export class FilterSidebarComponent {
  @Input() destinos: FilterOption[] = [];
  @Input() aventuras: FilterOption[] = [];
  @Input() alojamientos: FilterOption[] = [];

  @Output() onFilterChange = new EventEmitter<any>();
  @Output() onPriceChange = new EventEmitter<any>();

  selectedDestinos: string[] = [];
  selectedAventuras: string[] = [];
  selectedAlojamientos: string[] = [];

  isMobile: boolean = false;
  showMobileMenu: boolean = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.checkScreenSize();
      window.addEventListener('resize', this.checkScreenSize.bind(this));
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      window.removeEventListener('resize', this.checkScreenSize.bind(this));
    }
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 1024;
    if (!this.isMobile) {
      this.showMobileMenu = false;
    }
  }

  toggleFilterMenu() {
    this.showMobileMenu = !this.showMobileMenu;
    if (this.showMobileMenu && this.isBrowser) {
      document.body.style.overflow = 'hidden';
    } else if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }

  closeFilterMenu() {
    this.showMobileMenu = false;
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }

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
  }

  onMinPriceChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onPriceChange.emit({ min: value });
  }

  onMaxPriceChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onPriceChange.emit({ max: value });
  }

  applyFilters() {
    this.emitFilters();
    this.closeFilterMenu();
  }

  private emitFilters() {
    this.onFilterChange.emit({
      destinos: this.selectedDestinos,
      aventuras: this.selectedAventuras,
      alojamientos: this.selectedAlojamientos
    });
  }

  @HostListener('document:keydown.escape')
  onEscapePress() {
    if (this.showMobileMenu) {
      this.closeFilterMenu();
    }
  }
}
