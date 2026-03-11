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
      price: 2455.00,
      currency: '€',
      tags: ['Quads', 'Rafting', 'Cultura'],
      featured: true
    },
    {
      id: 2,
      title: 'Tailandia',
      location: 'Asia',
      region: 'asia',
      image: 'assets/images/tailandia.jpg',
      days: 12,
      price: 3290.00,
      currency: '€',
      tags: ['Buceo', 'Parapente', 'Gastronomía']
    },
    {
      id: 3,
      title: 'Perú',
      location: 'América del Sur',
      region: 'america',
      image: 'assets/images/peru.jpg',
      days: 14,
      price: 2890.00,
      currency: '€',
      tags: ['Senderismo', 'Cultura', 'Gastronomía']
    },
    {
      id: 4,
      title: 'Islandia',
      location: 'Europa',
      region: 'europa',
      image: 'assets/images/islandia.jpg',
      days: 8,
      price: 4190.00,
      currency: '€',
      tags: ['Auroras', 'Glaciares', '4x4']
    }
  ];

  getDestinations(): Observable<Destination[]> {
    return of(this.mockDestinations);
  }

  getDestinationById(id: number): Observable<Destination | undefined> {
    return of(this.mockDestinations.find(d => d.id === id));
  }
}
