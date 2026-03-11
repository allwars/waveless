import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__logo">
          <img
            src="assets/images/logo.svg"
            alt="WaveLess"
            class="footer__logo-img"
            width="150"
            height="35">
        </div>

        <div class="footer__copyright">
          © 2024 Waveless - Todos los derechos reservados.
        </div>
      </div>
    </footer>
  `,
  styles: [`
    /* ===== MOBILE FIRST ===== */
    .footer {
      background: white;
      border-top: 1px solid #eaeaea;
      padding: 2rem 0;
      margin-top: 3rem;
    }

    .footer__container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .footer__logo-img {
      display: block;
      width: 150px;
      height: auto;
      opacity: 0.8;
      transition: opacity 0.2s ease;
    }

    .footer__logo-img:hover {
      opacity: 1;
    }

    .footer__copyright {
      font-size: 0.9rem;
      color: #666;
      text-align: center;
    }

    /* ===== TABLET (768px en adelante) ===== */
    @media (min-width: 768px) {
      .footer {
        padding: 2.5rem 0;
      }

      .footer__container {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
      }

      .footer__copyright {
        text-align: right;
      }
    }

    /* ===== DESKTOP (1024px en adelante) ===== */
    @media (min-width: 1024px) {
      .footer {
        padding: 3rem 0;
      }
    }
  `]
})
export class FooterComponent {}
