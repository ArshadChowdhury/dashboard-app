interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  name: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface CartItemType {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
}
