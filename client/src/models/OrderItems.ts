import { OrderItem } from "./OrderItem";

export class OrderItems {
  items: OrderItem[];
  successUrl: string;
  failureUrl: string;

  constructor(items: OrderItem[], successUrl: string, failureUrl: string) {
    this.items = items;
    this.successUrl = successUrl;
    this.failureUrl = failureUrl;
  }
}
