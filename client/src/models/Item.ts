export interface Item {
  id: string;
  name: string;
  description: string;
  details: string;
  sizes: string[];
  colors: string[];
  genders: string[];
  compressionClasses: string[];
  category: string;
  images: string[];
  price: number;
  priceSale: number;
  added: boolean;
  favorite: boolean;
  leftCount: number;
}

export interface ItemOptions {
  size: string;
  color: string;
  gender: string;
  compressionClass: string;
}
