import { makeAutoObservable, runInAction } from "mobx";
import { Item } from "../models/Item";
import api from "../api";
import { CartItem } from "../models/CartItem";
import { CheckoutFormValues } from "../models/CheckoutFormValues";
import { loadStripe } from "@stripe/stripe-js";
import { Order, OrderItem } from "../models/OrderItem";
import { Pagination, PagingParams } from "../models/Pagination";

export default class itemStore {
  itemRegistry = new Map<string, Item>();
  loading = false;
  selectedItem: Item | undefined = undefined;

  cartRegistry = new Map<string, CartItem>();
  isCartOpen = false;
  wasCartOpened = false;

  pagination: Pagination | null = null;
  pagingParams = new PagingParams();

  likedRegistry = new Map<string, Item>();
  likedLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    return params;
  }

  get items() {
    return Array.from(this.itemRegistry.values());
  }

  get cart() {
    return Array.from(this.cartRegistry.values());
  }

  get liked() {
    return Array.from(this.likedRegistry.values());
  }

  loadItems = async () => {
    this.loading = true;
    try {
      const result = await api.Items.list(this.axiosParams);
      console.log(result);
      runInAction(() => {
        this.itemRegistry.clear();
        result.data.data.forEach((item) => {
          // grabbing Item ID part from the unique cart key
          item.added = Array.from(this.cartRegistry.keys()).some(
            (x) => x.slice(0, 36) === item.id
          );
          this.itemRegistry.set(item.id, item);
        });
        this.pagination = result.data.pagination;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
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
    // getting unique ID - combination of Item ID, size, color, gender and compression class
    const id = cartItem.getId();
    // console.log(id);
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
    this.wasCartOpened = false;
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
    } else {
      // update quantity
      this.cartRegistry.set(id, {
        ...cartItem,
        quantity: quantity,
      });
    }
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
    this.isCartOpen = state;
    this.wasCartOpened = true;
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

  setLiked = async (item: Item, wasLiked: boolean) => {
    const id = item.id;
    this.likedLoading = true;
    try {
      await api.Items.like(id);
      runInAction(() => {
        this.itemRegistry.set(id, { ...item, liked: !wasLiked });
        if (wasLiked) {
          this.likedRegistry.delete(id);
        } else {
          this.likedRegistry.set(id, item);
        }
        this.likedLoading = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => (this.likedLoading = false));
    }
  };

  getLiked = async () => {
    this.likedLoading = true;
    try {
      const result = await api.Items.likes();
      runInAction(() => {
        this.likedLoading = false;
        result.forEach((item) => {
          this.likedRegistry.set(item.id, item);
        });
      });
    } catch (err) {
      console.log(err);
      runInAction(() => (this.likedLoading = false));
    }
  };

  clearLiked = () => {
    this.likedRegistry.clear();
  };
}
