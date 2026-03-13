import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [InputComponent, ButtonComponent, FormsModule],
  template: `
    <div class="search-bar">
      <app-input
        class="search-bar__input"
        [(ngModel)]="searchTerm"
        placeholder="Buscar destinos..."
        (ngModelChange)="onSearchChange()"
      ></app-input>
      <app-button
        variant="primary"
        size="medium"
        (onClick)="onSearch.emit(searchTerm)">
        Buscar
      </app-button>
    </div>
  `,
  styles: [`
    .search-bar {
      display: flex;
      gap: 0.5rem;
      width: 100%;

      &__input {
        flex: 1;
      }
    }
  `]
})
export class SearchBarComponent {
  searchTerm = '';
  @Output() onSearch = new EventEmitter<string>();
  @Output() onChange = new EventEmitter<string>();

  onSearchChange() {
    this.onChange.emit(this.searchTerm);
  }
}
