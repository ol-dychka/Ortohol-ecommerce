import { Item } from "./Item";

export interface ICartItem {
  item: Item;
  quantity: number;
  size: string;
  color: string;
}

export class CartItem implements ICartItem {
  item: Item;
  quantity: number;
  size: string;
  color: string;

  constructor(item: Item, quantity: number, size: string, color: string) {
    this.item = item;
    this.quantity = quantity;
    this.size = size;
    this.color = color;
  }
}
