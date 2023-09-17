import { CartItem } from "./CartItem";

export class OrderItem {
  itemId: string;
  quantity: number;
  size: string;
  color: string;

  constructor(cartItem: CartItem) {
    this.itemId = cartItem.item.id;
    this.quantity = cartItem.quantity;
    this.size = cartItem.size;
    this.color = cartItem.color;
  }
}

export class Order {
  userName: string;
  email: string;
  items: OrderItem[];

  constructor(userName: string, email: string, items: OrderItem[]) {
    this.userName = userName;
    this.email = email;
    this.items = items;
  }
}
