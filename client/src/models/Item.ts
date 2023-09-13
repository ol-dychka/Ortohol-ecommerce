export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  price: number;
  priceSale: number;
  added: boolean;
  favorite: boolean;
}
