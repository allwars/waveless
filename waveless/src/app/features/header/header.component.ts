import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <div class="header__container">
        <!-- Logo -->
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

        <!-- Botón menú móvil (visible hasta 1023px) -->
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
                <span class="header__menu-icon">
                  <img src="assets/images/aventura.svg" alt="Aventura" width="24" height="24">
                </span>
                <span class="header__menu-text">Aventura</span>
              </a>
              @if (selectedSection === 'aventura') {
                <span class="header__menu-active-indicator"></span>
              }
            </li>

            <li class="header__menu-item">
              <a href="#" class="header__menu-link" [class.active]="selectedSection === 'destinos'" (click)="selectSection('destinos', $event)">
                <span class="header__menu-icon">
                  <img src="assets/images/destino.svg" alt="Destinos" width="24" height="24">
                </span>
                <span class="header__menu-text">Destinos</span>
              </a>
              @if (selectedSection === 'destinos') {
                <span class="header__menu-active-indicator"></span>
              }
            </li>

            <li class="header__menu-item">
              <a href="#" class="header__menu-link" [class.active]="selectedSection === 'alojamiento'" (click)="selectSection('alojamiento', $event)">
                <span class="header__menu-icon">
                  <img src="assets/images/alojamiento.svg" alt="Alojamiento" width="24" height="24">
                </span>
                <span class="header__menu-text">Alojamiento</span>
              </a>
              @if (selectedSection === 'alojamiento') {
                <span class="header__menu-active-indicator"></span>
              }
            </li>

            <li class="header__menu-item">
              <a href="#" class="header__menu-link" [class.active]="selectedSection === 'sobre-nosotros'" (click)="selectSection('sobre-nosotros', $event)">
                <span class="header__menu-text">Sobre nosotros</span>
              </a>
              @if (selectedSection === 'sobre-nosotros') {
                <span class="header__menu-active-indicator"></span>
              }
            </li>

            <li class="header__menu-item header__menu-item--reserva">
              <a href="#" class="header__menu-link header__menu-link--reserva" [class.active]="selectedSection === 'reserva'" (click)="selectSection('reserva', $event)">
                <span class="header__menu-text">Reserva</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    /* ===== BASE (aplica a todos los tamaños) ===== */
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      z-index: 1000;
      height: 70px;
      display: flex;
      align-items: center;
    }

    .header__container {
      width: 100%;
      max-width: 1440px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header__logo-img {
      display: block;
      width: 100px;
      height: auto;
    }

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

    .header__nav {
      position: fixed;
      top: 70px;
      right: -100%;
      width: 80%;
      max-width: 350px;
      height: calc(100vh - 70px);
      background: white;
      padding: 2rem 1.5rem;
      transition: right 0.3s ease;
      box-shadow: -2px 0 15px rgba(0,0,0,0.1);
    }

    .header__nav--open {
      right: 0;
    }

    .header__menu {
      display: flex;
      flex-direction: column;
      gap: 1rem;
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
      font-size: 1rem;
      font-weight: 500;
      padding: 0.8rem 1rem;
      transition: all 0.3s ease;
      width: 100%;
      color: #342E34;
    }

    .header__menu-icon {
      display: flex;
      align-items: center;
    }

    .header__menu-text {
      flex: 1;
    }

    .header__menu-link--reserva {
      background-color: #622F60;
      color: white;
      border-radius: 30px;
      margin-top: 1rem;
      justify-content: center;
    }

    .header__menu-active-indicator {
      display: none;
    }

    .header__menu-link.active:not(.header__menu-link--reserva) {
      color: #342E34;
      border-bottom: 2px solid #ff6b35;
    }

    .header__menu-link--reserva.active {
      background-color: #622F60;
    }

    .header__menu-toggle--active .header__menu-toggle-bar:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .header__menu-toggle--active .header__menu-toggle-bar:nth-child(2) {
      opacity: 0;
    }

    .header__menu-toggle--active .header__menu-toggle-bar:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -7px);
    }

    /* ===== MÓVIL (390px - 743px) ===== */
    @media (min-width: 390px) and (max-width: 743px) {
      .header {
        height: 70px;
      }

      .header__logo-img {
        width: 100px;
      }

      .header__menu-link {
        font-size: 1rem;
        padding: 0.8rem 1rem;
      }
    }

    /* ===== TABLET (744px - 1023px) ===== */
    @media (min-width: 744px) and (max-width: 1023px) {
      .header {
        height: 80px;
      }

      .header__logo-img {
        width: 120px;
      }

      .header__menu-link {
        font-size: 1rem;
        padding: 0.8rem 1rem;
      }

      .header__nav {
        max-width: 380px;
      }
    }

    /* ===== DESKTOP (1024px - 1440px) ===== */
    @media (min-width: 1024px) and (max-width: 1440px) {
      .header {
        height: 90px;
      }

      .header__container {
        padding: 0 2rem;
      }

      .header__logo-img {
        width: 140px;
      }

      .header__menu-toggle {
        display: none;
      }

      .header__nav {
        position: static;
        width: auto;
        height: 90px;
        padding: 0;
        background: transparent;
        box-shadow: none;
      }

      .header__menu {
               flex-direction: row;
        gap: 1rem;
        align-items: center;
        height: 100%;
        width: 100%;
        justify-content: flex-end;

      }

      .header__menu-item {
        width: auto;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
      }

      .header__menu-link {
        width: auto;
        padding: 0 1rem;
        height: 100%;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.95rem;
        border-bottom: 3px solid transparent;
      }

      .header__menu-link.active {
        border-bottom: 3px solid #ff6b35;
      }

      .header__menu-link:hover:not(.header__menu-link--reserva) {
        border-bottom: 3px solid #ff6b35;
      }

      .header__menu-icon {
        font-size: 1.1rem;
      }

      .header__menu-text {
        flex: none;
        text-wrap: nowrap;
      }

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
        border-bottom: 7px solid #ff6b35;
        border-top: none;
      }

      .header__menu-item--reserva {
        margin-left: 1rem;
      }

      .header__menu-link--reserva {
        background-color: #622F60;
        color: white;
        padding: 0.5rem 1.8rem;
        border-radius: 30px;
        font-weight: 600;
        margin-top: 0;
        border-bottom: none !important;
        height: auto;
      }

      .header__menu-link--reserva:hover {
        background-color: #622F60;
        border-bottom: none !important;
      }

      .header__menu-link--reserva.active {
        background-color: #622F60;
        border-bottom: none !important;
      }

      .header__menu-item--reserva .header__menu-active-indicator {
        display: none;
      }
    }

    /* ===== DESKTOP GRANDE (1441px en adelante) ===== */
    @media (min-width: 1441px) {
      .header {
        height: 100px;
      }

      .header__container {
        padding: 0 3rem;
        max-width: 100%;
      }

      .header__logo-img {
        width: 160px;
      }

      .header__menu-toggle {
        display: none;
      }

      .header__nav {
        position: static;
        width: auto;
        height: 100px;
        padding: 0;
        background: transparent;
        box-shadow: none;
      }

      .header__menu {
               flex-direction: row;
        gap: 1rem;
        align-items: center;
        height: 100%;
        width: 100%;
        justify-content: flex-end;
      }

      .header__menu-item {
        width: auto;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
      }

      .header__menu-link {
        width: auto;
        padding: 0 1.2rem;
        height: 100%;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
        border-bottom: 3px solid transparent;
      }

      .header__menu-link.active {
        border-bottom: 3px solid #ff6b35;
      }

      .header__menu-link:hover:not(.header__menu-link--reserva) {
        border-bottom: 3px solid #ff6b35;
      }

      .header__menu-icon {
        font-size: 1.2rem;
      }

      .header__menu-text {
        flex: none;
        text-wrap: nowrap;
      }

      .header__menu-active-indicator {
        display: block;
        position: absolute;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #ff6b35;
        border-top: none;
      }

      .header__menu-item--reserva {
        margin-left: 1.5rem;
      }

      .header__menu-link--reserva {
        background-color: #622F60;
        color: white;
        padding: 0.6rem 2.2rem;
        border-radius: 30px;
        font-weight: 600;
        margin-top: 0;
        border-bottom: none !important;
        height: auto;
      }

      .header__menu-link--reserva:hover {
        background-color: #622F60;
        border-bottom: none !important;
      }

      .header__menu-link--reserva.active {
        background-color: #622F60;
        border-bottom: none !important;
      }

      .header__menu-item--reserva .header__menu-active-indicator {
        display: none;
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;
  selectedSection: string = 'destinos';

  @HostListener('window:resize')
  onResize() {
    // Cerrar menú si la pantalla pasa a desktop
    if (window.innerWidth >= 1024) {
      this.isMenuOpen = false;
      document.body.style.overflow = 'auto';
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
  }

  selectSection(section: string, event: Event) {
    event.preventDefault();
    this.selectedSection = section;

    // Cerrar menú en móvil/tablet después de seleccionar
    if (window.innerWidth < 1024) {
      this.isMenuOpen = false;
      document.body.style.overflow = 'auto';
    }
  }
}
