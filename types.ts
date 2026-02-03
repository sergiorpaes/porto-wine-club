
export type WineCategory = 'Red' | 'White' | 'Rosé' | 'Green';

export interface WineProduct {
  id: string;
  name: string;
  region: string;
  category: WineCategory;
  price: number;
  description: Record<string, string>;
  image: string;
  year: number;
  alcohol: string;
}

export interface CartItem extends WineProduct {
  quantity: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}
