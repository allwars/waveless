import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TagComponent } from '../../atoms/tag/tag.component';

@Component({
  selector: 'app-filter-chip',
  standalone: true,
  imports: [TagComponent],
  template: `
    <div class="filter-chip" [class.filter-chip--active]="selected">
      <app-tag
        [variant]="variant"
        [count]="count"
        [clickable]="true"
        (click)="onToggle.emit()">
        {{ label }}
      </app-tag>
    </div>
  `,
  styles: [`
    .filter-chip {
      cursor: pointer;
    }

    .filter-chip--active app-tag {
      --tag-bg: #ff6b35;
      --tag-color: white;
    }
  `]
})
export class FilterChipComponent {
  @Input() label = '';
  @Input() variant: 'default' | 'category' | 'activity' = 'default';
  @Input() count?: number;
  @Input() selected = false;
  @Output() onToggle = new EventEmitter<void>();
}
