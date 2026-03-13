import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../atoms/input/input.component';

@Component({
  selector: 'app-price-range',
  standalone: true,
  imports: [InputComponent, FormsModule],
  template: `
    <div class="price-range">
      <h4 class="price-range__title">{{ title }}</h4>
      <div class="price-range__inputs">
        <app-input
          class="price-range__input"
          type="number"
          [placeholder]="minPlaceholder"
          [(ngModel)]="minValue"
          (ngModelChange)="onValuesChange()"
        ></app-input>
        <span class="price-range__separator">-</span>
        <app-input
          class="price-range__input"
          type="number"
          [placeholder]="maxPlaceholder"
          [(ngModel)]="maxValue"
          (ngModelChange)="onValuesChange()"
        ></app-input>
      </div>
    </div>
  `,
  styles: [`
    .price-range {
      padding: 1rem 0;

      &__title {
        font-size: 1rem;
        margin-bottom: 0.5rem;
        color: #333;
      }

      &__inputs {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      &__input {
        flex: 1;
      }

      &__separator {
        color: #666;
      }
    }
  `]
})
export class PriceRangeComponent {
  @Input() title = 'Precio';
  @Input() minPlaceholder = 'Mínimo';
  @Input() maxPlaceholder = 'Máximo';

  minValue: number | null = null;
  maxValue: number | null = null;

  @Output() onPriceChange = new EventEmitter<{min: number | null, max: number | null}>();

  onValuesChange() {
    this.onPriceChange.emit({
      min: this.minValue,
      max: this.maxValue
    });
  }
}
