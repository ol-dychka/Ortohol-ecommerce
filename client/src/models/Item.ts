export interface Item {
  id: string;
  name: string;
  description: string;
  details: string;
  sizes: string[];
  colors: string[];
  category: string;
  images: string[];
  price: number;
  priceSale: number;
  added: boolean;
  favorite: boolean;
  leftCount: number;
}
