import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  template: `
    <span [class]="'tag tag--' + variant" [class.tag--clickable]="clickable">
      <ng-content></ng-content>
      @if (count !== undefined) {
        <span class="tag__count">({{ count }})</span>
      }
    </span>
  `,
  styles: [`
    .tag {
      display: inline-flex;
      align-items: center;
      padding: 0.35rem 1rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
      background-color: #f0f0f0;
      color: #333;
      transition: all 0.2s ease;

      &--category {
        background-color: #e6f3ff;
        color: #0066cc;
      }

      &--activity {
        background-color: #fff0e6;
        color: #ff6b35;
      }

      &--clickable {
        cursor: pointer;

        &:hover {
          background-color: #e0e0e0;
          transform: translateY(-1px);
        }
      }

      &__count {
        margin-left: 0.25rem;
        font-size: 0.75rem;
        opacity: 0.8;
      }
    }
  `]
})
export class TagComponent {
  @Input() variant: 'default' | 'category' | 'activity' = 'default';
  @Input() count?: number;
  @Input() clickable = false;
}
