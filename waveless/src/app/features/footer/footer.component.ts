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
    .footer {
      background: white;
      border-top: 1px solid #eaeaea;
      padding: 2rem 0 0;

      &__container {
        max-width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      &__logo {
        padding: 48px 32px;
        width: 100%;

        &-img {
          display: block;
          width: 150px;
          height: auto;
          opacity: 0.8;
          transition: opacity 0.2s ease;

          &:hover {
            opacity: 1;
          }
        }
      }

      &__copyright {
        font-size: 0.9rem;
        color: #622F60;
        text-align: center;
        background-color: #E0D9E0;
        width: 100%;
        height: 52px;
        padding: 16px 0;
        font-weight: 700;
      }
    }

    /* TABLET */
    @media (min-width: 768px) {
      .footer {
        padding: 2.5rem 0 0;

        &__logo {
          padding: 48px 24px;
        }

        &__container {
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
        }

        &__copyright {
          text-align: center;
        }
      }
    }

    /* DESKTOP */
    @media (min-width: 1024px) {
      .footer {
        padding: 3rem 0 0;

        &__logo {
          padding: 48px 40px;
        }
      }
    }
  `]
})
export class FooterComponent {}
