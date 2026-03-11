export interface Destination {
  id: number;
  title: string;
  location: string;
  region: string;
  image: string;
  days: number;
  price: number;
  currency: string;
  tags: string[];
  featured?: boolean;
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
