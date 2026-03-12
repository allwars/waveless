import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Destination } from '../models/destination.model';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private mockDestinations: Destination[] = [
    {
      id: 1,
      title: 'Marruecos',
      location: 'África',
      region: 'africa',
      image: 'assets/images/marruecos.jpg',
      days: 9,
      price: 248.00,
      originalPrice: 1124.00,
      currency: '€',
      tags: ['Quads', 'Rafting', 'Cultura'],
      featured: true,
      description: 'Descubre Bangkok con Iberojet'
    },
    {
      id: 2,
      title: 'Tailandia',
      location: 'Asia',
      region: 'asia',
      image: 'assets/images/tailandia.jpg',
      days: 12,
      price: 248.00,
      originalPrice: 1124.00,
      currency: '€',
      tags: ['Buceo', 'Parapente', 'Gastronomía'],
      description: 'Descubre Bangkok con Iberojet'
    },
    {
      id: 3,
      title: 'Perú',
      location: 'América',
      region: 'america',
      image: 'assets/images/peru.jpg',
      days: 14,
      price: 248.00,
      originalPrice: 1124.00,
      currency: '€',
      tags: ['Senderismo', 'Cultura', 'Gastronomía'],
      description: 'Descubre Bangkok con Iberojet'
    },
    {
      id: 4,
      title: 'Marruecos',
      location: 'África',
      region: 'africa',
      image: 'assets/images/marruecos.jpg',
      days: 9,
      price: 248.00,
      originalPrice: 1124.00,
      currency: '€',
      tags: ['Quads', 'Rafting', 'Cultura'],
      description: 'Descubre Bangkok con Iberojet'
    },
    {
      id: 5,
      title: 'Tailandia',
      location: 'Asia',
      region: 'asia',
      image: 'assets/images/tailandia.jpg',
      days: 12,
      price: 248.00,
      originalPrice: 1124.00,
      currency: '€',
      tags: ['Buceo', 'Parapente', 'Gastronomía'],
      description: 'Descubre Bangkok con Iberojet'
    },
    {
      id: 6,
      title: 'Perú',
      location: 'América',
      region: 'america',
      image: 'assets/images/peru.jpg',
      days: 14,
      price: 248.00,
      originalPrice: 1124.00,
      currency: '€',
      tags: ['Senderismo', 'Cultura', 'Gastronomía'],
      description: 'Descubre Bangkok con Iberojet'
    },
    {
      id: 7,
      title: 'Marruecos',
      location: 'África',
      region: 'africa',
      image: 'assets/images/marruecos.jpg',
      days: 9,
      price: 248.00,
      originalPrice: 1124.00,
      currency: '€',
      tags: ['Quads', 'Rafting', 'Cultura'],
      description: 'Descubre Bangkok con Iberojet'
    },
    {
      id: 8,
      title: 'Tailandia',
      location: 'Asia',
      region: 'asia',
      image: 'assets/images/tailandia.jpg',
      days: 12,
      price: 248.00,
      originalPrice: 1124.00,
      currency: '€',
      tags: ['Buceo', 'Parapente', 'Gastronomía'],
      description: 'Descubre Bangkok con Iberojet'
    },
    {
      id: 9,
      title: 'Perú',
      location: 'América',
      region: 'america',
      image: 'assets/images/peru.jpg',
      days: 14,
      price: 248.00,
      originalPrice: 1124.00,
      currency: '€',
      tags: ['Senderismo', 'Cultura', 'Gastronomía'],
      description: 'Descubre Bangkok con Iberojet'
    }
  ];

  getDestinations(): Observable<Destination[]> {
    return of(this.mockDestinations);
  }

  getDestinationById(id: number): Observable<Destination | undefined> {
    return of(this.mockDestinations.find(d => d.id === id));
  }
}
