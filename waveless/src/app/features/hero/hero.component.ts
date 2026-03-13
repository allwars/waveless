import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/atoms/button/button.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <section class="hero">
      <div class="hero__background">
        <img
          src="../../assets/images/hero-bg.jpg"
          alt="Ruta por Australia"
          class="hero__image">
        <div class="hero__overlay"></div>
      </div>

      <div class="hero__container">
        <div class="hero__content">
          <h1 class="hero__title">
            <span class="hero__title-line">Ruta por Australia</span>
            <span class="hero__title-line hero__title-line--highlight">Si te va la aventura,</span>
            <span class="hero__title-line">no te lo puedes perder</span>
          </h1>

          <div class="hero__cta">
            <app-button
              variant="primary"
              size="large"
              class="hero__button">
              Más información
            </app-button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      height: 100vh;
      min-height: 600px;
      width: 100%;
      overflow: hidden;

      &__background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }

      &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.2) 100%);
      }

      &__container {
        position: relative;
        z-index: 2;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        height: 100%;
        display: flex;
        align-items: center;
      }

      &__content {
        color: white;
        max-width: 800px;
      }

      &__title {
        margin-bottom: 2rem;

        &-line {
          display: block;
          font-size: 4rem;
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 0.5rem;

          &--highlight {
            font-weight: 700;
            color: #ff6b35;
          }
        }
      }

      &__cta {
        margin-top: 2rem;
      }

      &__button ::ng-deep .btn {
        font-size: 1.2rem;
        padding: 1rem 3rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }

    /* TABLET */
    @media (max-width: 1024px) {
      .hero__title-line {
        font-size: 3rem;
      }
    }

    /* MÓVIL */
    @media (max-width: 768px) {
      .hero {
        min-height: 500px;

        &__container {
          padding: 0 1rem;
          justify-content: center;
          text-align: center;
        }

        &__title-line {
          font-size: 2.2rem;
        }

        &__overlay {
          background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%);
        }
      }
    }

    /* MÓVIL PEQUEÑO */
    @media (max-width: 480px) {
      .hero__title-line {
        font-size: 1.8rem;
      }
    }
  `]
})
export class HeroComponent {}
