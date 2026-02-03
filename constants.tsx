
import { WineProduct, Testimonial } from './types';

export const WINES: WineProduct[] = [
  {
    id: '1',
    name: 'Douro Reserva Especial',
    region: 'Douro Valley',
    category: 'Red',
    price: 45.00,
    description: 'A robust and elegant red with notes of dark berries, chocolate, and spice. Aged for 18 months in French oak.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
    year: 2019,
    alcohol: '14.5%'
  },
  {
    id: '2',
    name: 'Alvarinho Premium',
    region: 'Minho',
    category: 'White',
    price: 28.50,
    description: 'Crisp and refreshing with intense aromas of peach, citrus, and tropical fruits. The soul of Portuguese whites.',
    image: 'https://images.unsplash.com/photo-1553187658-4977d9f2e4d9?auto=format&fit=crop&q=80&w=800',
    year: 2021,
    alcohol: '13%'
  },
  {
    id: '3',
    name: 'Vinho Verde Seleção',
    region: 'Monção e Melgaço',
    category: 'Green',
    price: 18.00,
    description: 'Light, slightly sparkling, and incredibly fresh. Perfect for summer afternoons and seafood pairings.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b0ca7ef?auto=format&fit=crop&q=80&w=800',
    year: 2022,
    alcohol: '11.5%'
  },
  {
    id: '4',
    name: 'Alentejo Rosé Exclusivo',
    region: 'Alentejo',
    category: 'Rosé',
    price: 22.00,
    description: 'A sophisticated rosé with delicate notes of strawberry and rose petals. Dry, balanced, and elegant.',
    image: 'https://images.unsplash.com/photo-1558001256-32d4db9786ad?auto=format&fit=crop&q=80&w=800',
    year: 2021,
    alcohol: '12.5%'
  },
  {
    id: '5',
    name: 'Dão Grande Escolha',
    region: 'Dão',
    category: 'Red',
    price: 38.00,
    description: 'Silky tannins and complex aromas of pine needles and wild fruits. A true expression of the Dão terroir.',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800',
    year: 2018,
    alcohol: '13.5%'
  },
  {
    id: '6',
    name: 'Lisboa Private Collection',
    region: 'Lisboa',
    category: 'White',
    price: 32.00,
    description: 'Full-bodied white with mineral undertones and a long, creamy finish. Perfect for discerning palates.',
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=800',
    year: 2020,
    alcohol: '13.5%'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'António Silva',
    role: 'Wine Enthusiast',
    content: 'The quality of the curation is unmatched. Every bottle I have received from Porto Wine Club feels like a direct trip to the vineyards of Douro.',
    rating: 5
  },
  {
    id: 2,
    name: 'Marc Garcia',
    role: 'Restaurant Owner',
    content: 'As a professional, I appreciate the transparency and the direct delivery from Portugal. The prices are incredible for this level of exclusivity.',
    rating: 5
  },
  {
    id: 3,
    name: 'James Henderson',
    role: 'Club Member',
    content: 'The personalized service and the speed of delivery to Spain surprised me. A truly premium experience for anyone who loves Portuguese wines.',
    rating: 4
  }
];
