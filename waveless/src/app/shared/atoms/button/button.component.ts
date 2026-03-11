import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [type]="type"
      [class]="'btn btn--' + variant + ' btn--' + size"
      [disabled]="disabled"
      (click)="onClick.emit($event)">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      display: inline-block;
      font-weight: 500;
      text-align: center;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 4px;
    }

    .btn--primary {
      background-color: #ff6b35;
      color: white;
    }
    .btn--primary:hover {
      background-color: #e85a2a;
    }

    .btn--secondary {
      background-color: transparent;
      color: #333;
      border: 1px solid #ddd;
    }
    .btn--secondary:hover {
      background-color: #f5f5f5;
    }

    .btn--small {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    .btn--medium {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }

    .btn--large {
      padding: 1rem 2rem;
      font-size: 1.125rem;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<Event>();
}
