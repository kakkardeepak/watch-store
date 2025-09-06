export interface Watch {
  id: number;
  brand: string;
  model: string;
  type: 'analog' | 'digital';
  price: number;
  description: string;
  images: string[];
  features: string[];
  stock: number;
  soldCount: number;
}

export interface CartItem {
  watch: Watch;
  quantity: number;
}
