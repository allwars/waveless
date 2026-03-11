import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/atoms/button/button.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <section class="hero">
      <div class="hero__content">
        <h1 class="hero__title">Vive tus propias aventuras</h1>
        <p class="hero__subtitle">Para los que les gusta explorar y conocer mundo sin complejos</p>
        <app-button variant="primary" size="large" class="hero__cta">Ver filtros</app-button>
      </div>
      <div class="hero__image">
        <img src="assets/images/hero-bg.jpg" alt="Aventura" class="hero__img">
      </div>
    </section>
  `,
  styles: [`
    .hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 600px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .hero__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 4rem;
      color: white;
    }

    .hero__title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }

    .hero__subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .hero__cta {
      align-self: flex-start;
    }

    .hero__image {
      overflow: hidden;
    }

    .hero__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 768px) {
      .hero {
        grid-template-columns: 1fr;
      }

      .hero__content {
        padding: 2rem;
      }

      .hero__title {
        font-size: 2.5rem;
      }
    }
  `]
})
export class HeroComponent {}
