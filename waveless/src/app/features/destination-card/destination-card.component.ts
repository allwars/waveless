import { Component, Input, HostListener, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Destination } from '../../core/models/destination.model';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [DecimalPipe],
  template: `
    <article class="destination-card" #cardElement>
      <div class="destination-card__image-container">
        <div class="destination-card__tags">
          @for (tag of destination.tags.slice(0, 1); track tag) {
            <span class="destination-card__tag">{{ tag }}</span>
          }
        </div>
        <img
          [src]="destination.image"
          [alt]="destination.title"
          class="destination-card__image"
          loading="lazy">
      </div>

      <div class="destination-card__content">
        <div class="destination-card__text">
          <h3 class="destination-card__title">{{ destination.title }}, {{ destination.location }} {{ destination.days }} días</h3>
          <p class="destination-card__description">{{ destination.description }}</p>

        </div>


        <div class="destination-card__actions">
          <div class="destination-card__breakdown-wrapper" #breakdownWrapper>
            <div class="destination-card__price-row">
              <span class="destination-card__price-label">Desde</span>
              <span class="destination-card__price">{{ destination.price | number:'1.2-2' }} {{ destination.currency }}</span>
            </div>
            <button
              class="destination-card__breakdown-btn"
              (click)="togglePriceBreakdown($event)">
              Ver desglose
              <svg class="destination-card__breakdown-icon" [class.rotated]="showPriceBreakdown" width="16" height="16" viewBox="0 0 16 16">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <button class="destination-card__reserve-btn">
            Reservar
          </button>
        </div>
      </div>
    </article>

    <!-- Modal para móvil (1 columna) -->
    @if (showPriceBreakdown && isMobile) {
      <div class="breakdown-modal">
        <div class="breakdown-modal__overlay" (click)="showPriceBreakdown = false"></div>
        <div class="breakdown-modal__content">
          <div class="breakdown-modal__header">
            <h4 class="breakdown-modal__title">Desglose de precios</h4>
            <button class="breakdown-modal__close" (click)="showPriceBreakdown = false">✕</button>
          </div>

          <div class="breakdown-modal__body">
            <p class="breakdown-modal__location">{{ destination.title }}, {{ destination.location }} {{ destination.days }} días</p>

            <div class="breakdown-modal__item">
              <span>Precio antes de impuestos</span>
              <span>{{ destination.originalPrice | number:'1.2-2' }} {{ destination.currency }}</span>
            </div>
            <div class="breakdown-modal__item">
              <span>Impuesto</span>
              <span>4,43 {{ destination.currency }}</span>
            </div>
            <div class="breakdown-modal__item">
              <span>Lorem ipsum</span>
              <span>150,42 {{ destination.currency }}</span>
            </div>
            <div class="breakdown-modal__item breakdown-modal__total">
              <span>Precio final</span>
              <span>{{ (destination.originalPrice! + 4.43 + 150.42) | number:'1.2-2' }} {{ destination.currency }}</span>
            </div>
          </div>
        </div>
      </div>
    }

    <!-- Popup para desktop (2+ columnas) -->
    @if (showPriceBreakdown && !isMobile) {
      <div class="breakdown-popup" [style.top.px]="popupTop" [style.left.px]="popupLeft">
        <div class="breakdown-popup__content">
          <div class="breakdown-popup__header">
            <h4 class="breakdown-popup__title">Desglose de precios</h4>
            <button class="breakdown-popup__close" (click)="showPriceBreakdown = false">✕</button>
          </div>

          <p class="breakdown-popup__location">{{ destination.title }}, {{ destination.location }} {{ destination.days }} días</p>

          <div class="breakdown-popup__item">
            <span>Precio antes de impuestos</span>
            <span>{{ destination.originalPrice | number:'1.2-2' }} {{ destination.currency }}</span>
          </div>
          <div class="breakdown-popup__item">
            <span>Impuesto</span>
            <span>4,43 {{ destination.currency }}</span>
          </div>
          <div class="breakdown-popup__item">
            <span>Lorem ipsum</span>
            <span>150,42 {{ destination.currency }}</span>
          </div>
          <div class="breakdown-popup__item breakdown-popup__total">
            <span>Precio final</span>
            <span>{{ (destination.originalPrice! + 4.43 + 150.42) | number:'1.2-2' }} {{ destination.currency }}</span>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    /* ===== MOBILE FIRST ===== */
    .destination-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      position: relative;
      min-height: 376px;
      width: 264px;
      display: flex;
      flex-direction: column;
    }

    .destination-card__image-container {
      position: relative;
      aspect-ratio: 16/9;
      overflow: hidden;
    }

    .destination-card__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .destination-card__content {
      padding: 1rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .destination-card__tags {
      margin-bottom: 0.5rem;
      position: absolute;
      top:10px;
      right: 10px;


    }

    .destination-card__tag {
      display: inline-block;
      background-color: #ff6b35;
      color: #342E34;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.2rem 0.8rem;
      border-radius: 20px;
      text-transform: uppercase;
    }

    .destination-card__title {
      font-size: 0.9rem;
      color: #622F60;
      margin: 0 0 0.25rem 0;
      line-height: 1.4;
    }

    .destination-card__description {
      font-size: 1rem;
      color: #342E34;
      font-weight: 700;
      margin: 0 0 0.75rem 0;
      line-height: 1.4;
    }

    .destination-card__price-row {
      display: flex;
      align-items: baseline;
     flex-direction:column;
    }

    .destination-card__price-label {
      font-size: 0.9rem;
      color: #342E34;
    }

    .destination-card__price {
      font-size: 1.25rem;
      color: #342E34;
    }
    .destination-card__text{
      padding:0.5rem 1.25rem;
    }

    .destination-card__actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #FBF6F4;
      padding-top: 0.75rem;
      margin-top: auto;
      padding-left:1.25rem;
      padding-right:1.25rem;
    }

    .destination-card__breakdown-wrapper {
      position: static;
    }

    .destination-card__breakdown-btn {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      background: none;
      border: none;
      color: #622F60;
      font-size: 0.9rem;
      cursor: pointer;
      padding: 0.45rem 0;
      transition: color 0.2s ease;
      white-space: nowrap;
    }

    .destination-card__breakdown-btn:hover {
      color: #622F60;
    }

    .destination-card__breakdown-icon {
      transition: transform 0.3s ease;
    }

    .destination-card__breakdown-icon.rotated {
      transform: rotate(180deg);
    }

    .destination-card__reserve-btn {
      background-color: #ffffff;
    color: #622F60;
    border: 1px solid #622F60;
    border-radius: 30px;
    padding: 0.4rem 1.2rem;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    }

    .destination-card__reserve-btn:hover {
      background-color: #622F60;
      color: #ffffff;
    }

    /* ===== BREAKDOWN MODAL (MÓVIL - 1 columna) ===== */
    .breakdown-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease;
    }

    .breakdown-modal__overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(4px);
    }

    .breakdown-modal__content {
      position: relative;
      width: 90%;
      max-width: 400px;
      background: white;
      border-radius: 24px;
      padding: 1.5rem;
      animation: scaleIn 0.3s ease;
      z-index: 10000;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .breakdown-modal__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .breakdown-modal__title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #333;
      margin: 0;
    }

    .breakdown-modal__close {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #999;
      cursor: pointer;
      padding: 0.5rem;
      line-height: 1;
      transition: color 0.2s ease;
    }

    .breakdown-modal__close:hover {
      color: #ff6b35;
    }

    .breakdown-modal__body {
      padding-bottom: 0.5rem;
    }

    .breakdown-modal__location {
      font-size: 1rem;
      font-weight: 600;
      color: #333;
      margin: 0 0 1.5rem 0;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #eaeaea;
    }

    .breakdown-modal__item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #f0f0f0;
      font-size: 0.95rem;
      color: #666;
    }

    .breakdown-modal__total {
      font-weight: 700;
      color: #ff6b35;
      border-bottom: none;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 2px solid #eaeaea;
    }

 /* ===== BREAKDOWN POPUP (DESKTOP - 2+ columnas) ===== */
.breakdown-popup {
  position: absolute; /* Cambiado de fixed a absolute */
  width: 320px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  z-index: 1000;
  animation: fadeIn 0.2s ease;
  border: 1px solid #eaeaea;
  /* Eliminamos transform y margin-top negativos */
}


.breakdown-popup__content {
  border-radius: 24px;
}

.breakdown-popup__header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  background-color: #FBF6F4;
  padding: 1.25rem ;
  border-radius: 24px 24px 0 0;
    border-bottom: 1px solid #E0D9E0;
}
.breakdown-popup__total {

}

.breakdown-popup__title {
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.breakdown-popup__close {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #999;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s ease;
}

.breakdown-popup__close:hover {
  color: #ff6b35;
}

.breakdown-popup__location {
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1rem 0;
   padding: 0.5rem 1.25rem;

}

.breakdown-popup__item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1.25rem;
  font-size: 0.9rem;
  color: #666;
}

.breakdown-popup__total {
  font-weight: 700;
  color: #342E34;
  border-bottom: none;
  margin-top: 0.5rem;
  border-radius: 0 0 24px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FBF6F4;
  padding: 1.25rem ;
   border-bottom: 1px solid #E0D9E0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(-90%);
      }
      to {
        opacity: 1;
        transform: translateY(-100%);
      }
    }

    /* ===== TABLET (600px en adelante) ===== */
    @media (min-width: 600px) {

      .destination-card__price {
        font-size: 1.35rem;
      }

      .destination-card__reserve-btn {
        padding: 0.5rem 1.5rem;
      }
    }

    /* ===== DESKTOP (900px en adelante) ===== */
    @media (min-width: 900px) {
      .destination-card__content {
        padding: 0;
      }

      .destination-card__title {
        font-size: 1.2rem;
      }
    }
  `]
})
export class DestinationCardComponent {
  @Input() destination!: Destination;
  @ViewChild('cardElement') cardElement!: ElementRef;
  @ViewChild('breakdownWrapper') breakdownWrapper!: ElementRef;

  showPriceBreakdown = false;
  isMobile: boolean = true;
  popupTop: number = 0;
  popupLeft: number = 0;
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

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => this.calculatePopupPosition(), 0);
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      window.removeEventListener('resize', this.checkScreenSize.bind(this));
      document.body.style.overflow = '';
    }
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 900;
    if (!this.isMobile && this.showPriceBreakdown) {
      setTimeout(() => this.calculatePopupPosition(), 0);
    }
  }

  calculatePopupPosition() {
    if (!this.isBrowser || !this.breakdownWrapper) return;

    const buttonRect = this.breakdownWrapper.nativeElement.getBoundingClientRect();
    this.popupTop = buttonRect.top + window.scrollY;
    this.popupLeft = buttonRect.left + window.scrollX;
  }

  togglePriceBreakdown(event: Event) {
    event.stopPropagation();
    this.showPriceBreakdown = !this.showPriceBreakdown;

    if (this.showPriceBreakdown) {
      if (this.isMobile && this.isBrowser) {
        document.body.style.overflow = 'hidden';
      } else {
        setTimeout(() => this.calculatePopupPosition(), 0);
      }
    } else if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.isMobile && this.showPriceBreakdown) {
      const target = event.target as HTMLElement;
      const popup = document.querySelector('.breakdown-popup');
      const button = document.querySelector('.destination-card__breakdown-btn');

      if (popup && !popup.contains(target) && button && !button.contains(target)) {
        this.showPriceBreakdown = false;
        if (this.isBrowser) {
          document.body.style.overflow = '';
        }
      }
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePress() {
    if (this.showPriceBreakdown) {
      this.showPriceBreakdown = false;
      if (this.isBrowser) {
        document.body.style.overflow = '';
      }
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.isMobile && this.showPriceBreakdown) {
      this.calculatePopupPosition();
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (!this.isMobile && this.showPriceBreakdown) {
      setTimeout(() => this.calculatePopupPosition(), 0);
    }
  }
}
