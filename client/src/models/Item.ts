export interface Item {
  id: string;
  name: string;
  description: string;
  details: string;
  sizes: string[];
  colors: string[];
  genders: string[];
  compressionClasses: string[];
  category: Category;
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

export enum Category {
  corset = "Abdominal Corsets",
  bandage_foot = "Ankle and Foot Bandages",
  bandage_shoulder = "Bandages for Shoulder and Elbow Joints",
  bandage_arm = "Arm Bandages and Splints",
  child = "Children's Orthopedic Products",
  bandage_elastic = "Elastic Bandages and Other Products",
  nexus = "Nexus Adjustable Compression Products",
}
