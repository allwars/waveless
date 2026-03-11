export interface Destination {
  id: number;
  title: string;
  location: string;
  region: string;
  image: string;
  days: number;
  price: number;
  originalPrice?: number; // Precio antes de impuestos
  currency: string;
  tags: string[];
  featured?: boolean;
  description: string; // "Descubre Bangkok con Iberojet"
}

export interface PriceBreakdown {
  basePrice: number;
  tax: number;
  loremIpsum: number;
  total: number;
  currency: string;
}

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  icon?: string;
}
