import { makeAutoObservable, runInAction } from "mobx";
import { Item } from "../models/Item";
import api from "../api";
import { CartItem } from "../models/CartItem";
import { CheckoutFormValues } from "../models/CheckoutFormValues";
import { loadStripe } from "@stripe/stripe-js";
import { Order, OrderItem } from "../models/OrderItem";

export default class itemStore {
  itemRegistry = new Map<string, Item>();
  loading = false;
  selectedItem: Item | undefined = undefined;
  cartRegistry = new Map<string, CartItem>();
  isOpen = false;
  wasOpened = false;

  constructor() {
    makeAutoObservable(this);
  }

  get items() {
    return Array.from(this.itemRegistry.values());
  }

  get cart() {
    return Array.from(this.cartRegistry.values());
  }

  loadItems = async () => {
    this.loading = true;
    try {
      const result = await api.Items.list();
      runInAction(() => {
        result.forEach((item) => {
          item.added = this.cartRegistry.has(item.id);
          this.itemRegistry.set(item.id, item);
        });
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  loadItem = async (id: string) => {
    if (this.itemRegistry.has(id)) {
      this.selectedItem = this.itemRegistry.get(id);
      return this.selectedItem;
    }
    this.loading = true;
    try {
      const result = await api.Items.single(id);
      runInAction(() => {
        result.added = this.cartRegistry.has(result.id);
        this.selectedItem = result;
        this.loading = false;
      });
      return this.selectedItem;
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  clearSelectedItem = () => {
    this.selectedItem = undefined;
  };

  updateCart = (cartItem: CartItem) => {
    // need to specify parameters such as size/color to get unique key
    // and allow to buy items with different parameters at once

    // delete
    if (this.cartRegistry.has(cartItem.item.id)) {
      this.cartRegistry.delete(cartItem.item.id);
      this.itemRegistry.set(cartItem.item.id, {
        ...cartItem.item,
        added: false,
      });
      if (this.selectedItem?.id === cartItem.item.id)
        this.selectedItem.added = false;
      return;
    }
    // add
    this.itemRegistry.set(cartItem.item.id, {
      ...cartItem.item,
      added: true,
    } as Item);
    this.cartRegistry.set(cartItem.item.id, {
      ...cartItem,
      item: { ...cartItem.item, added: true },
    });
    if (this.selectedItem?.id === cartItem.item.id)
      this.selectedItem.added = true;
    this.wasOpened = false;
  };

  updateCartQuantity = (cartItem: CartItem, quantity: number) => {
    // delete
    if (quantity === 0) {
      this.cartRegistry.delete(cartItem.item.id);
      this.itemRegistry.set(cartItem.item.id, {
        ...cartItem.item,
        added: false,
      });
      if (this.selectedItem?.id === cartItem.item.id)
        this.selectedItem.added = false;
      return;
    }
    // update quantity
    this.cartRegistry.set(cartItem.item.id, {
      ...cartItem,
      quantity: quantity,
    });
  };

  updateCartSize = (cartItem: CartItem, size: string) => {
    this.cartRegistry.set(cartItem.item.id, {
      ...cartItem,
      size: size,
    });
  };

  updateCartColor = (cartItem: CartItem, color: string) => {
    this.cartRegistry.set(cartItem.item.id, {
      ...cartItem,
      color: color,
    });
  };

  openCart = (state: boolean) => {
    this.isOpen = state;
    this.wasOpened = true;
  };

  emptyCart = () => {
    this.cartRegistry.clear();
  };

  makePayment = async (values: CheckoutFormValues) => {
    // getting stripe public key
    const stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);
    // making new order to give to back-end
    const order = new Order(
      `${values.billingAddress.firstName} ${values.billingAddress.lastName}`,
      values.email,
      this.cart.map((cartItem) => new OrderItem(cartItem))
    );
    // making a call to back-end and getting back session key
    await api.Items.order(order).then((session) =>
      stripe?.redirectToCheckout({
        sessionId: session.sessionId,
      })
    );
  };
}
