export interface Product {
  id: string;
  name: string;
  category: 'Mechanical' | 'Electrical' | 'Safety' | 'Tools';
  price: number;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
