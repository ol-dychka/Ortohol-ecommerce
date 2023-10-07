import { Item, ItemOptions } from "./Item";

export interface ICartItem {
  item: Item;
  quantity: number;
  size?: string;
  color?: string;
  gender?: string;
  compressionClass?: string;
}

export class CartItem implements ICartItem {
  item: Item;
  quantity: number;
  size?: string;
  color?: string;
  gender?: string;
  compressionClass?: string;

  constructor(item: Item, quantity: number, options: ItemOptions) {
    this.item = item;
    this.quantity = quantity;
    this.size = options.size;
    this.color = options.color;
    this.gender = options.gender;
    this.compressionClass = options.compressionClass;
  }

  getId = () => {
    return `${this.item.id}-${this.size}-${this.color}-${this.gender}-${this.compressionClass}`.toString();
  };
}
