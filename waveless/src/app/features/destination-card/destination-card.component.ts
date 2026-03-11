import { Component, Input } from '@angular/core';
import { Destination, PriceBreakdown } from '../../core/models/destination.model';
import { ButtonComponent } from '../../shared/atoms/button/button.component';
import { TagComponent } from '../../shared/atoms/tag/tag.component';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [ButtonComponent, TagComponent],
  template: `
    <article class="destination-card" [class.destination-card--featured]="destination.featured">
      <div class="destination-card__image">
        <img [src]="destination.image" [alt]="destination.title">
        @if (showPriceBreakdown) {
          <div class="destination-card__price-breakdown">
            <h4>Desglose de precios</h4>
            <p>{{ destination.location }} {{ destination.days }} días</p>
            <div class="price-breakdown__item">
              <span>Precio antes de impuestos</span>
              <span>{{ formatPrice(priceBreakdown.basePrice) }}</span>
            </div>
            <div class="price-breakdown__item">
              <span>Impuesto</span>
              <span>{{ formatPrice(priceBreakdown.tax) }}</span>
            </div>
            <div class="price-breakdown__item">
              <span>Lorem ipsum</span>
              <span>{{ formatPrice(priceBreakdown.loremIpsum) }}</span>
            </div>
            <div class="price-breakdown__item price-breakdown__total">
              <span>Precio final</span>
              <span>{{ formatPrice(priceBreakdown.total) }}</span>
            </div>
          </div>
        }
      </div>

      <div class="destination-card__content">
        <h3 class="destination-card__title">{{ destination.title }}</h3>
        <p class="destination-card__location">{{ destination.location }} · {{ destination.days }} días</p>

        <div class="destination-card__tags">
          @for (tag of destination.tags; track tag) {
            <app-tag variant="activity">{{ tag }}</app-tag>
          }
        </div>

        <div class="destination-card__footer">
          <span class="destination-card__price">{{ formatPrice(destination.price) }}</span>
          <app-button
            variant="secondary"
            size="small"
            (onClick)="togglePriceBreakdown()">
            Ver precio
          </app-button>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .destination-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .destination-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .destination-card--featured {
      border: 2px solid #ff6b35;
    }

    .destination-card__image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .destination-card__image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .destination-card__price-breakdown {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255,255,255,0.95);
      padding: 1rem;
      overflow-y: auto;
    }

    .price-breakdown__item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
    }

    .price-breakdown__total {
      font-weight: bold;
      color: #ff6b35;
      border-bottom: none;
    }

    .destination-card__content {
      padding: 1rem;
    }

    .destination-card__title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 0.25rem 0;
    }

    .destination-card__location {
      color: #666;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .destination-card__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .destination-card__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .destination-card__price {
      font-size: 1.5rem;
      font-weight: 700;
      color: #ff6b35;
    }

    .destination-card__price::before {
      content: '€';
      font-size: 1rem;
      margin-right: 0.25rem;
    }
  `]
})
export class DestinationCardComponent {
  @Input() destination!: Destination;
  @Input() priceBreakdown: PriceBreakdown = {
    basePrice: 1124.00,
    tax: 4.43,
    loremIpsum: 150.42,
    total: 2455.00,
    currency: '€'
  };

  showPriceBreakdown = false;

  formatPrice(price: number): string {
    return price.toFixed(2) + ' ' + this.priceBreakdown.currency;
  }

  togglePriceBreakdown() {
    this.showPriceBreakdown = !this.showPriceBreakdown;
  }
}
