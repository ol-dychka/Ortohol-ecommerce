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

  addToCart = (cartItem: CartItem) => {
    const id = cartItem.getId();
    console.log(id);

    if (this.cartRegistry.has(id)) {
      const oldItem = this.cartRegistry.get(id)!;
      this.cartRegistry.set(id, {
        ...oldItem,
        quantity: oldItem?.quantity + cartItem.quantity,
      });
    } else {
      this.cartRegistry.set(id, cartItem);
      this.setAdded(cartItem.item, true);
    }
    this.wasOpened = false;
  };

  deleteFromCart = (cartItem: CartItem) => {
    this.cartRegistry.delete(cartItem.getId());
    this.setAdded(cartItem.item, false);
  };

  updateCartQuantity = (cartItem: CartItem, quantity: number) => {
    const id = cartItem.getId();
    // delete
    if (quantity === 0) {
      this.cartRegistry.delete(id);
      this.setAdded(cartItem.item, false);
    }
    // update quantity
    this.cartRegistry.set(id, {
      ...cartItem,
      quantity: quantity,
    });
  };

  updateCartOptions = (
    cartItem: CartItem,
    size: string,
    color: string,
    gender: string,
    compressionClass: string
  ) => {
    // delete previous instance with id id-size-PREV_COLOR-gender-compclass
    // and replace it with              id-size-NEW_COLOR-gender-compclass
    // include case when new id already exists
    const newCartItem: CartItem = new CartItem(
      cartItem.item,
      cartItem.quantity,
      {
        size,
        color,
        gender,
        compressionClass,
      }
    );
    const newId = newCartItem.getId();
    console.log("new:", newId);
    const oldId = cartItem.getId();
    console.log("old:", oldId);
    runInAction(() => {
      this.cartRegistry.delete(oldId);
    });

    if (this.cartRegistry.has(newId)) {
      runInAction(() => {
        const oldItem = this.cartRegistry.get(newId)!;
        this.cartRegistry.set(newId, {
          ...oldItem,
          quantity: oldItem?.quantity + cartItem.quantity,
        });
      });
    } else {
      runInAction(() => {
        this.cartRegistry.set(newId, newCartItem);
      });
    }
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

  setAdded = (item: Item, state: boolean) => {
    this.itemRegistry.set(item.id, {
      ...item,
      added: state,
    });
    if (this.selectedItem?.id === item.id) this.selectedItem.added = state;
  };
}
