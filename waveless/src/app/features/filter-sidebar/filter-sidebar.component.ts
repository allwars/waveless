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
          Ver filtros
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
            <div class="filter-section__header" (click)="toggleSection('destinos')">
              <div class="filter-section__header-left">
                <img
                  src="assets/images/destino.svg"
                  alt="Destinos"
                  class="filter-section__icon"
                  width="24"
                  height="24">
                <h3 class="filter-section__title">Destinos</h3>
              </div>
              <svg class="filter-section__arrow" [class.filter-section__arrow--rotated]="expandedSections['destinos']" width="16" height="16" viewBox="0 0 16 16">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>

            @if (expandedSections['destinos']) {
              <div class="filter-section__options">
                @for (destino of destinos; track destino.id) {
                  <label class="filter-option">
                    <input
                      type="checkbox"
                      [checked]="selectedDestinos.includes(destino.id)"
                      (change)="toggleDestino(destino.id)"
                      class="filter-option__checkbox">
                    <span class="filter-option__label">{{ destino.label }}</span>
                    <img
                      src="assets/images/info.svg"
                      alt="info"
                      class="filter-option__info"
                      width="12"
                      height="12">
                  </label>
                }
              </div>
            }
          </div>

          <!-- Aventura -->
          <div class="filter-section">
            <div class="filter-section__header" (click)="toggleSection('aventura')">
              <div class="filter-section__header-left">
                <img
                  src="assets/images/aventura.svg"
                  alt="Aventura"
                  class="filter-section__icon"
                  width="24"
                  height="24">
                <h3 class="filter-section__title">Aventura</h3>
              </div>
              <svg class="filter-section__arrow" [class.filter-section__arrow--rotated]="expandedSections['aventura']" width="16" height="16" viewBox="0 0 16 16">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>

            @if (expandedSections['aventura']) {
              <div class="filter-section__options">
                @for (aventura of aventuras.slice(0, 3); track aventura.id) {
                  <label class="filter-option">
                    <input
                      type="checkbox"
                      [checked]="selectedAventuras.includes(aventura.id)"
                      (change)="toggleAventura(aventura.id)"
                      class="filter-option__checkbox">
                    <span class="filter-option__label">{{ aventura.label }}</span>
                    <img
                      src="assets/images/info.svg"
                      alt="info"
                      class="filter-option__info"
                      width="12"
                      height="12">
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
                      <img
                        src="assets/images/info.svg"
                        alt="info"
                        class="filter-option__info"
                        width="12"
                        height="12">
                    </label>
                  }
                </div>
              </div>

              <button class="filter-section__more-btn" (click)="showMoreAventuras()">
                Ver 21 más
              </button>
            }
          </div>

          <!-- Alojamiento -->
          <div class="filter-section">
            <div class="filter-section__header" (click)="toggleSection('alojamiento')">
              <div class="filter-section__header-left">
                <img
                  src="assets/images/alojamiento.svg"
                  alt="Alojamiento"
                  class="filter-section__icon"
                  width="24"
                  height="24">
                <h3 class="filter-section__title">Alojamiento</h3>
              </div>
              <svg class="filter-section__arrow" [class.filter-section__arrow--rotated]="expandedSections['alojamiento']" width="16" height="16" viewBox="0 0 16 16">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>

            @if (expandedSections['alojamiento']) {
              <div class="filter-section__options">
                @for (alojamiento of alojamientos; track alojamiento.id) {
                  <label class="filter-option">
                    <input
                      type="checkbox"
                      [checked]="selectedAlojamientos.includes(alojamiento.id)"
                      (change)="toggleAlojamiento(alojamiento.id)"
                      class="filter-option__checkbox">
                    <span class="filter-option__label">{{ alojamiento.label }}</span>
                    <img
                      src="assets/images/info.svg"
                      alt="info"
                      class="filter-option__info"
                      width="12"
                      height="12">
                  </label>
                }
              </div>
            }
          </div>

          <!-- Precio -->
          <div class="filter-section">
            <div class="filter-section__header" (click)="toggleSection('precio')">
              <div class="filter-section__header-left">
                <img
                  src="assets/images/price-color.svg"
                  alt="Precio"
                  class="filter-section__icon"
                  width="24"
                  height="24">
                <h3 class="filter-section__title">Precio</h3>
              </div>
              <svg class="filter-section__arrow" [class.filter-section__arrow--rotated]="expandedSections['precio']" width="16" height="16" viewBox="0 0 16 16">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>

            @if (expandedSections['precio']) {
              <div class="filter-price">
                <div class="filter-price__inputs">
                  <div class="filter-price__input-group">
                    <label class="filter-price__label">Mínimo</label>
                    <div class="filter-price__field-wrapper">
                      <input
                        type="number"
                        class="filter-price__field"
                        placeholder="Mínimo"
                        (input)="onMinPriceChange($event)">
                    </div>
                  </div>
                  <div class="filter-price__input-group">
                    <label class="filter-price__label">Máximo</label>
                    <div class="filter-price__field-wrapper">
                      <input
                        type="number"
                        class="filter-price__field"
                        placeholder="Máximo"
                        (input)="onMaxPriceChange($event)">
                    </div>
                  </div>
                </div>
              </div>
            }
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
              <div class="filter-section__header" (click)="toggleSection('mobile-destinos')">
                <div class="filter-section__header-left">
                  <img
                    src="assets/images/destino.svg"
                    alt="Destinos"
                    class="filter-section__icon"
                    width="24"
                    height="24">
                  <h3 class="filter-section__title">Destinos</h3>
                </div>
                <svg class="filter-section__arrow" [class.filter-section__arrow--rotated]="expandedSections['mobile-destinos']" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>

              @if (expandedSections['mobile-destinos']) {
                <div class="filter-section__options">
                  @for (destino of destinos; track destino.id) {
                    <label class="filter-option">
                      <input
                        type="checkbox"
                        [checked]="selectedDestinos.includes(destino.id)"
                        (change)="toggleDestino(destino.id)"
                        class="filter-option__checkbox">
                      <span class="filter-option__label">{{ destino.label }}</span>
                      <img
                        src="assets/images/info.svg"
                        alt="info"
                        class="filter-option__info"
                        width="12"
                        height="12">
                    </label>
                  }
                </div>
              }
            </div>

            <!-- Aventura -->
            <div class="filter-section">
              <div class="filter-section__header" (click)="toggleSection('mobile-aventura')">
                <div class="filter-section__header-left">
                  <img
                    src="assets/images/aventura.svg"
                    alt="Aventura"
                    class="filter-section__icon"
                    width="24"
                    height="24">
                  <h3 class="filter-section__title">Aventura</h3>
                </div>
                <svg class="filter-section__arrow" [class.filter-section__arrow--rotated]="expandedSections['mobile-aventura']" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>

              @if (expandedSections['mobile-aventura']) {
                <div class="filter-section__options">
                  @for (aventura of aventuras.slice(0, 3); track aventura.id) {
                    <label class="filter-option">
                      <input
                        type="checkbox"
                        [checked]="selectedAventuras.includes(aventura.id)"
                        (change)="toggleAventura(aventura.id)"
                        class="filter-option__checkbox">
                      <span class="filter-option__label">{{ aventura.label }}</span>
                      <img
                        src="assets/images/info.svg"
                        alt="info"
                        class="filter-option__info"
                        width="12"
                        height="12">
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
                        <img
                          src="assets/images/info.svg"
                          alt="info"
                          class="filter-option__info"
                          width="12"
                          height="12">
                      </label>
                    }
                  </div>
                </div>
              }
            </div>

            <!-- Alojamiento -->
            <div class="filter-section">
              <div class="filter-section__header" (click)="toggleSection('mobile-alojamiento')">
                <div class="filter-section__header-left">
                  <img
                    src="assets/images/alojamiento.svg"
                    alt="Alojamiento"
                    class="filter-section__icon"
                    width="24"
                    height="24">
                  <h3 class="filter-section__title">Alojamiento</h3>
                </div>
                <svg class="filter-section__arrow" [class.filter-section__arrow--rotated]="expandedSections['mobile-alojamiento']" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>

              @if (expandedSections['mobile-alojamiento']) {
                <div class="filter-section__options">
                  @for (alojamiento of alojamientos; track alojamiento.id) {
                    <label class="filter-option">
                      <input
                        type="checkbox"
                        [checked]="selectedAlojamientos.includes(alojamiento.id)"
                        (change)="toggleAlojamiento(alojamiento.id)"
                        class="filter-option__checkbox">
                      <span class="filter-option__label">{{ alojamiento.label }}</span>
                      <img
                        src="assets/images/info.svg"
                        alt="info"
                        class="filter-option__info"
                        width="12"
                        height="12">
                    </label>
                  }
                </div>
              }
            </div>

            <!-- Precio -->
            <div class="filter-section">
              <div class="filter-section__header" (click)="toggleSection('precio')">
                <div class="filter-section__header-left">
                  <img
                    src="assets/images/price-color.svg"
                    alt="Precio"
                    class="filter-section__icon"
                    width="24"
                    height="24">
                  <h3 class="filter-section__title">Precio</h3>
                </div>
                <svg class="filter-section__arrow" [class.filter-section__arrow--rotated]="expandedSections['precio']" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>

              @if (expandedSections['precio']) {
                <div class="filter-price">
                  <div class="filter-price__row">
                    <span class="filter-price__label">Mínimo</span>
                    <div class="filter-price__input-wrapper">
                      <input
                        type="text"
                        class="filter-price__input"
                        placeholder="0"
                        (input)="onMinPriceChange($event)">
                    </div>
                  </div>

                  <div class="filter-price__row">
                    <span class="filter-price__label">Máximo</span>
                    <div class="filter-price__input-wrapper">
                      <input
                        type="text"
                        class="filter-price__input"
                        placeholder="10000"
                        (input)="onMaxPriceChange($event)">
                    </div>
                  </div>
                </div>
              }
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
    .filter-button-container {
      padding: 1rem;
      background: white;
      border-bottom: 1px solid #eaeaea;
    }

    .filter-button {
      width: 100%;
      max-width: 152px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background-color: #FAF7F5;
      border: 1px solid #622F6029;
      color: #2F222F;
      font-size: 1rem;
      font-weight: 500;
      padding: 0.75rem;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.2s ease;
      margin: 0 auto;

      &:hover {
        background-color: #ff6b35;
        color: white;
      }
    }

    .mobile-menu {
      position: absolute;
      top: 910px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2000;
      display: flex;

      &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      &__content {
        position: relative;
        width: 100%;
        max-width: 400px;
        height: 100vh;
        background: white;
        margin-right: auto;
        animation: slideInLeft 0.3s ease;
        display: flex;
        flex-direction: column;
        box-shadow: 0 0px 42px rgba(0, 0, 0, 0.08);
      }

      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid #eaeaea;
      }

      &__title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #333;
        margin: 0;
      }

      &__close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #999;
        cursor: pointer;
        padding: 0.5rem;
        line-height: 1;

        &:hover {
          color: #ff6b35;
        }
      }

      &__body {
        flex: 1;
        overflow-y: auto;
        padding: 1.5rem;
      }

      &__footer {
        padding: 1.5rem;
        border-top: 1px solid #eaeaea;
      }

      &__apply-btn {
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

        &:hover {
          background-color: #e85a2a;
        }
      }
    }

    @keyframes slideIn {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }

    .filter-section {
      padding-bottom: 0.5rem;

      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 0;
        cursor: pointer;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: rgba(255,107,53,0.05);
        }
      }

      &__header-left {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      &__icon {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }

      &__title {
        font-size: 1rem;
        font-weight: 600;
        color: #333;
        margin: 0;
      }

      &__arrow {
        width: 16px;
        height: 16px;
        color: #666;
        transition: transform 0.3s ease;

        &--rotated {
          transform: rotate(180deg);
        }
      }

      &__options {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 0.5rem 0 1rem 2rem;

        &--indented {
          margin-left: 1.5rem;
          margin-top: 0.5rem;
        }
      }

      &__more-btn {
        background: none;
        border: none;
        color: #ff6b35;
        font-size: 0.9rem;
        cursor: pointer;
        padding: 0.5rem 0 1rem 2rem;
        margin-top: 0.25rem;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .filter-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-size: 0.95rem;
      color: #666;

      &__checkbox {
        width: 18px;
        height: 18px;
        cursor: pointer;
        accent-color: #ff6b35;
      }

      &__info {
        width: 12px;
        height: 12px;
        opacity: 0.5;
        cursor: help;

        &:hover {
          opacity: 1;
        }
      }
    }

    .filter-subsection {
      margin: 0.5rem 0 0.5rem 1rem;

      &__title {
        font-size: 0.95rem;
        font-weight: 500;
        color: #666;
        margin: 0 0 0.75rem 0;
      }
    }

    .filter-price {
      padding: 0.5rem 0 0.5rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;

      &__field {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        border: 1px solid #622F60;
        padding: 12px;
        border-radius: 208px;
      }

      &__label {
        font-size: 0.9rem;
        color: #666;
      }

      &__input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
      }

      &__currency {
        position: absolute;
        left: 0;
        color: #ff6b35;
        font-size: 0.9rem;
        font-weight: 500;
        z-index: 1;
      }

      &__input {
        width: 100%;
        padding: 0.4rem 0 0.4rem 1.2rem;
        border: none;
        border-bottom: 1px solid #ff6b35;
        font-size: 0.9rem;
        color: #333;
        background: transparent;

        &:focus {
          outline: none;
          border-bottom-color: #e85a2a;
        }

        &::placeholder {
          color: #ccc;
        }
      }
    }

    /* MÓVIL */
    @media (min-width: 390px) and (max-width: 743px) {
      .filter-button-container {
        padding: 0.75rem 1rem;
      }

      .filter-button {
        font-size: 0.9rem;
        padding: 0.6rem;
      }

      .mobile-menu {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2000;
        display: flex;

        &__content {
          max-width: 100%;
        }

        &__header {
          padding: 1rem;
        }

        &__body {
          padding: 1rem;
        }

        &__footer {
          padding: 1rem;
        }
      }

      .filter-price {
        padding: 0.5rem 0;
      }
    }

    /* TABLET */
    @media (min-width: 744px) and (max-width: 1023px) {
      .filter-button-container {
        padding: 1rem 1.5rem;
      }

      .filter-button {
        font-size: 1rem;
        padding: 0.75rem;
      }

      .mobile-menu {
        position: absolute;
        top: 910px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2000;
        display: flex;

        &__content {
          max-width: 380px;
        }

        &__header {
          padding: 1.25rem;
        }

        &__body {
          padding: 1.25rem;
        }

        &__footer {
          padding: 1.25rem;
        }
      }
    }

    /* DESKTOP */
    @media (min-width: 1024px) and (max-width: 1440px) {
      .filter-button {
        margin: 0;
      }

      .filter-section__title {
        font-size: 1rem;
      }

      .filter-option {
        font-size: 0.9rem;
      }

      .filter-price {
        padding: 0.5rem 0;
      }
    }

    /* DESKTOP GRANDE */
    @media (min-width: 1441px) {
      .filter-sidebar {
        width: 320px;
        background: #FBF6F4;
        height: fit-content;
        position: sticky;
        border-radius: 16px;
        top: 110px;
        padding: 2rem 0;
        margin-top: 120px;

        &__header {
          margin-bottom: 2rem;
          border-bottom: 1px solid #E0D9E0;
          padding: 0 2rem 2rem;
          text-align: center;
        }

        &__title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        &__content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 0 2rem;
        }
      }

      .filter-section__title {
        font-size: 1.1rem;
      }

      .filter-option {
        font-size: 1rem;
      }

      .filter-price {
        padding: 0.5rem 0;

        &__field {
          padding: 14px;
        }
      }
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

  expandedSections: { [key: string]: boolean } = {
    destinos: true,
    aventura: true,
    alojamiento: true,
    precio: true,
    'mobile-destinos': true,
    'mobile-aventura': true,
    'mobile-alojamiento': true,
    'mobile-precio': true
  };

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
    this.isMobile = window.innerWidth < 1440;
    if (!this.isMobile) {
      this.showMobileMenu = false;
    }
  }

  toggleSection(section: string) {
    this.expandedSections[section] = !this.expandedSections[section];
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
