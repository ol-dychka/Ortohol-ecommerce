import { Item } from "./Item";

export interface ICartItem {
  item: Item;
  quantity: number;
}

export class CartItem implements ICartItem {
  item: Item;
  quantity: number;

  constructor(item: Item, quantity: number) {
    this.item = item;
    this.quantity = quantity;
  }
}
