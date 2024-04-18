import { CartItem } from "./CartItem";
import { Item } from "./Item";

export class OrderItem {
  itemId: string;
  item?: Item;
  quantity: number;
  size: string;
  color: string;
  gender: string;
  compressionClass: string;

  constructor(cartItem: CartItem) {
    this.itemId = cartItem.item.id;
    this.quantity = cartItem.quantity;
    this.size = cartItem.size;
    this.color = cartItem.color;
    this.gender = cartItem.gender;
    this.compressionClass = cartItem.compressionClass;
  }
}

export interface Order {
  id: string;
  userName: string;
  items: OrderItem[];
}
