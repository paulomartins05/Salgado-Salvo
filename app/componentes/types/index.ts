

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; 
  image: string;
  badge?: string;         
  categoryId: string;
  stock: number;
  savedAt: Date;          
}


export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface CartItem {
  id: string;
  product: Product; 
  quantity: number;
}

export interface Stat {
  value: string;
  label: string;
}

export type BadgeType = 'popular' | 'new' | 'last' | 'promo';