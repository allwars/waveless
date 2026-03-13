import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Slide {
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
}

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  template: `
    <section class="hero-slider">
      <!-- Slides -->
      <div class="hero-slider__container">
        @for (slide of slides; track slide.title; let i = $index) {
          <div
            class="hero-slider__slide"
            [class.hero-slider__slide--active]="currentSlide === i"
            [style.background-image]="'url(' + slide.image + ')'">
            <div class="hero-slider__overlay"></div>

            <div class="hero-slider__content">
              <h1 class="hero-slider__title">
                <span class="hero-slider__title-line hero-slider__title-line--highlight">{{ slide.title }}</span>
                <span class="hero-slider__title-line ">{{ slide.subtitle }}</span>
              </h1>

              <div class="hero-slider__cta">
                <button class="hero-slider__button">
                  {{ slide.buttonText }}
                </button>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Flechas de navegación (solo se muestran en el navegador) -->
      @if (isBrowser) {
        <button
          class="hero-slider__arrow hero-slider__arrow--left"
          (click)="prevSlide()"
          aria-label="Anterior">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button
          class="hero-slider__arrow hero-slider__arrow--right"
          (click)="nextSlide()"
          aria-label="Siguiente">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Bolitas indicadoras -->
        <div class="hero-slider__dots">
          @for (slide of slides; track slide.title; let i = $index) {
            <button
              class="hero-slider__dot"
              [class.hero-slider__dot--active]="currentSlide === i"
              (click)="goToSlide(i)"
              [attr.aria-label]="'Ir a slide ' + (i + 1)">
            </button>
          }
        </div>
      }
    </section>
  `,
  styles: [`
    .hero-slider {
      position: relative;
      height: 100vh;
      min-height: 500px;
      width: 100%;
      overflow: hidden;

      &__container {
        position: relative;
        width: 100%;
        height: 100%;
      }

      &__slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;

        &--active {
          opacity: 1;
          visibility: visible;
        }
      }

      &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%);
      }

      &__content {
        position: relative;
        z-index: 2;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        text-align: center;
      }

      &__title {
        margin-bottom: 1.5rem;

        &-line {
          display: block;
          font-size: 2.2rem;
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 0.25rem;

          &--highlight {
            font-weight: 700;
            color: #ffffff;
          }
        }
      }

      &__button {
        background-color: #FF8F50;
        color: #4E250E;
        border: none;
        border-radius: 30px;
        padding: 0.8rem 2rem;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;

        &:hover {
          background-color: #FF8F50;
        }
      }

      &__arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        background: rgba(98, 47, 96, 0.32);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        transition: all 0.3s ease;
        backdrop-filter: blur(4px);

        &:hover {
          background: rgb(98, 47, 96);
        }

        &--left {
          left: 0rem;
        }

        &--right {
          right: 0rem;
        }
      }

      &__dots {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 0.8rem;
        z-index: 10;
      }

      &__dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255,255,255,0.5);
        border: none;
        cursor: pointer;
        padding: 0;
        transition: all 0.3s ease;

        &--active {
          background: #ff6b35;
          transform: scale(1.2);
        }
      }
    }

    /* TABLET */
    @media (min-width: 768px) {
      .hero-slider {
        min-height: 600px;

        &__content {
          padding: 0 2rem;
        }

        &__title-line {
          font-size: 3rem;
        }

        &__arrow {
          width: 48px;
          height: 48px;

          &--left {
            left: 0rem;
          }

          &--right {
            right: 0rem;
          }
        }

        &__dot {
          width: 12px;
          height: 12px;
        }
      }
    }

    /* DESKTOP */
    @media (min-width: 1024px) {
      .hero-slider {
        min-height: 700px;

        &__title-line {
          font-size: 4rem;
        }

        &__button {
          padding: 1rem 3rem;
          font-size: 1.1rem;
        }

        &__arrow {
          width: 56px;
          height: 56px;

          &--left {
            left: 0rem;
          }

          &--right {
            right: 0rem;
          }
        }

        &__dot {
          width: 14px;
          height: 14px;
          gap: 1rem;
        }
      }
    }
  `]
})
export class HeroSliderComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  private intervalId: any;
  isBrowser: boolean;

  slides: Slide[] = [
    {
      title: 'Ruta por Australia',
      subtitle: 'Si te va la aventura, no te lo puedes perder',
      image: 'assets/images/hero-bg.jpg',
      buttonText: 'Más información'
    },
    {
      title: 'Aventura en Nueva Zelanda',
      subtitle: 'Descubre paisajes increíbles',
      image: 'assets/images/hero-bg.jpg',
      buttonText: 'Explorar'
    },
    {
      title: 'Explora Tailandia',
      subtitle: 'Cultura y naturaleza en estado puro',
      image: 'assets/images/hero-bg.jpg',
      buttonText: 'Ver destinos'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      this.stopAutoPlay();
    }
  }

  nextSlide() {
    if (!this.isBrowser) return;
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.resetAutoPlay();
  }

  prevSlide() {
    if (!this.isBrowser) return;
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.resetAutoPlay();
  }

  goToSlide(index: number) {
    if (!this.isBrowser) return;
    this.currentSlide = index;
    this.resetAutoPlay();
  }

  private startAutoPlay() {
    if (!this.isBrowser) return;
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private resetAutoPlay() {
    if (!this.isBrowser) return;
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  private stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
