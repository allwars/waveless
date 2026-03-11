import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <div class="header__container">
        <!-- Logo con imagen SVG externa -->
        <div class="header__logo">
          <a href="/" class="header__logo-link">
            <img
              src="assets/images/logo.svg"
              alt="WaveLess"
              class="header__logo-img"
              width="120"
              height="35">
          </a>
        </div>

        <!-- Botón menú móvil (siempre visible en móvil) -->
        <button
          class="header__menu-toggle"
          (click)="toggleMenu()"
          [class.header__menu-toggle--active]="isMenuOpen"
          aria-label="Menú principal">
          <span class="header__menu-toggle-bar"></span>
          <span class="header__menu-toggle-bar"></span>
          <span class="header__menu-toggle-bar"></span>
        </button>

        <!-- Navegación principal -->
        <nav class="header__nav" [class.header__nav--open]="isMenuOpen">
          <ul class="header__menu">
            <li class="header__menu-item">
              <a href="#" class="header__menu-link" [class.active]="selectedSection === 'aventura'" (click)="selectSection('aventura', $event)">
                <span class="header__menu-icon">🏔️</span>
                <span class="header__menu-text">Aventura</span>
              </a>
              @if (selectedSection === 'aventura') {
                <span class="header__menu-active-indicator"></span>
              }
            </li>

            <li class="header__menu-item">
              <a href="#" class="header__menu-link" [class.active]="selectedSection === 'destinos'" (click)="selectSection('destinos', $event)">
                <span class="header__menu-icon">🌍</span>
                <span class="header__menu-text">Destinos</span>
              </a>
              @if (selectedSection === 'destinos') {
                <span class="header__menu-active-indicator"></span>
              }
            </li>

            <li class="header__menu-item">
              <a href="#" class="header__menu-link" [class.active]="selectedSection === 'alojamiento'" (click)="selectSection('alojamiento', $event)">
                <span class="header__menu-icon">🏨</span>
                <span class="header__menu-text">Alojamiento</span>
              </a>
              @if (selectedSection === 'alojamiento') {
                <span class="header__menu-active-indicator"></span>
              }
            </li>

            <li class="header__menu-item">
              <a href="#" class="header__menu-link" [class.active]="selectedSection === 'sobre-nosotros'" (click)="selectSection('sobre-nosotros', $event)">
                <span class="header__menu-icon">👥</span>
                <span class="header__menu-text">Sobre nosotros</span>
              </a>
              @if (selectedSection === 'sobre-nosotros') {
                <span class="header__menu-active-indicator"></span>
              }
            </li>

            <li class="header__menu-item header__menu-item--reserva">
              <a href="#" class="header__menu-link header__menu-link--reserva" [class.active]="selectedSection === 'reserva'" (click)="selectSection('reserva', $event)">
                <span class="header__menu-icon">📅</span>
                <span class="header__menu-text">Reserva</span>
              </a>
              <!-- Reserva NO tiene triángulo -->
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    /* ===== MOBILE FIRST ===== */
    /* Estilos base para móvil (0px - 767px) */

    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      padding: 0.8rem 0;
      z-index: 1000;
    }

    .header__container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* Logo - móvil */
    .header__logo-img {
      display: block;
      width: 120px;
      height: auto;
    }

    /* Botón menú móvil */
    .header__menu-toggle {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 30px;
      height: 21px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: 1001;
    }

    .header__menu-toggle-bar {
      width: 100%;
      height: 3px;
      background-color: #333;
      transition: all 0.3s ease;
    }

    /* Menú móvil - oculto por defecto */
    .header__nav {
      position: fixed;
      top: 0;
      right: -100%;
      width: 80%;
      max-width: 350px;
      height: 100vh;
      background: white;
      padding: 5rem 1.5rem;
      transition: right 0.3s ease;
      box-shadow: -2px 0 15px rgba(0,0,0,0.1);
    }

    .header__nav--open {
      right: 0;
    }

    .header__menu {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      width: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .header__menu-item {
      width: 100%;
      position: relative;
    }

    .header__menu-link {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      text-decoration: none;
      color: #666;
      font-size: 1.1rem;
      font-weight: 500;
      padding: 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      width: 100%;
      justify-content: flex-start;
    }

    .header__menu-icon {
      font-size: 1.3rem;
    }

    .header__menu-text {
      flex: 1;
    }

    /* Reserva en móvil */
    .header__menu-link--reserva {
      background-color: #ff6b35;
      color: white;
      border-radius: 30px;
      margin-top: 1rem;
      justify-content: center;
    }

    .header__menu-link--reserva .header__menu-icon {
      color: white;
    }

    /* Ocultar triángulo en móvil */
    .header__menu-active-indicator {
      display: none;
    }

    /* Activo en móvil (borde izquierdo) */
    .header__menu-link.active:not(.header__menu-link--reserva) {
      color: #ff6b35;
      border-left: 4px solid #ff6b35;
      border-radius: 0;
      background-color: rgba(255,107,53,0.05);
    }

    .header__menu-link--reserva.active {
      background-color: #e85a2a;
    }

    /* Animación botón hamburguesa */
    .header__menu-toggle--active .header__menu-toggle-bar:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .header__menu-toggle--active .header__menu-toggle-bar:nth-child(2) {
      opacity: 0;
    }

    .header__menu-toggle--active .header__menu-toggle-bar:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -7px);
    }

    /* ===== TABLET (768px en adelante) ===== */
    @media (min-width: 768px) {
      .header__logo-img {
        width: 130px;
      }

      .header__menu-toggle {
        display: none; /* Ocultamos hamburguesa */
      }

      .header__nav {
        position: static;
        width: auto;
        height: auto;
        padding: 0;
        background: transparent;
        box-shadow: none;
        right: auto;
      }

      .header__menu {
        flex-direction: row;
        gap: 0.3rem;
        align-items: center;
      }

      .header__menu-item {
        width: auto;
        position: relative;
        padding: 0 0 12px 0; /* Espacio para el triángulo */
      }

      .header__menu-link {
        width: auto;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        justify-content: center;
        border: 1px solid transparent;
        border-radius: 30px;
        color: #333;
        background: transparent;
      }

      .header__menu-icon {
        font-size: 1.1rem;
      }

      .header__menu-text {
        flex: none;
      }

      /* Active state - borde naranja */
      .header__menu-link.active {
        border: 1px solid #ff6b35;
        background-color: rgba(255,107,53,0.03);
      }

      /* Hover state */
      .header__menu-link:hover:not(.header__menu-link--reserva) {
        border: 1px solid #ff6b35;
        background-color: rgba(255,107,53,0.03);
      }

      /* Triángulo - visible solo en desktop */
      .header__menu-active-indicator {
        display: block;
        position: absolute;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 7px solid #ff6b35;
        z-index: 10;
      }

      /* Reserva en desktop */
      .header__menu-item--reserva {
        margin-left: 0.5rem;
      }

      .header__menu-link--reserva {
        background-color: #ff6b35;
        color: white;
        border: none !important;
        padding: 0.5rem 1.5rem;
        border-radius: 30px;
        font-weight: 600;
        margin-top: 0;
      }

      .header__menu-link--reserva:hover {
        background-color: #e85a2a;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255,107,53,0.3);
      }

      .header__menu-link--reserva.active {
        background-color: #e85a2a;
        box-shadow: 0 4px 12px rgba(255,107,53,0.3);
      }

      /* Reserva nunca tiene triángulo */
      .header__menu-item--reserva .header__menu-active-indicator {
        display: none;
      }
    }

    /* ===== DESKTOP (1024px en adelante) ===== */
    @media (min-width: 1024px) {
      .header {
        padding: 1rem 0;
      }

      .header__container {
        padding: 0 2rem;
      }

      .header__logo-img {
        width: 150px;
      }

      .header__menu {
        gap: 0.8rem;
      }

      .header__menu-link {
        padding: 0.7rem 1.3rem;
        font-size: 1rem;
      }

      .header__menu-icon {
        font-size: 1.2rem;
      }

      .header__menu-link--reserva {
        padding: 0.7rem 2rem;
      }

      .header__menu-active-indicator {
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid #ff6b35;
      }
    }

    /* ===== DESKTOP GRANDE (1200px en adelante) ===== */
    @media (min-width: 1200px) {
      .header__menu {
        gap: 1.2rem;
      }

      .header__menu-link {
        padding: 0.8rem 1.5rem;
      }

      .header__menu-link--reserva {
        padding: 0.8rem 2.2rem;
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;
  selectedSection: string = 'destinos'; // Por defecto seleccionamos Destinos

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
  }

  selectSection(section: string, event: Event) {
    event.preventDefault();
    this.selectedSection = section;

    // Si estamos en móvil, cerramos el menú al seleccionar
    if (window.innerWidth <= 767) {
      this.isMenuOpen = false;
      document.body.style.overflow = 'auto';
    }
  }
}
