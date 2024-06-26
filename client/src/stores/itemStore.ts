import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Item } from "../models/Item";
import api from "../api";
import { CartItem } from "../models/CartItem";
// import { CheckoutFormValues } from "../models/CheckoutFormValues";
import { loadStripe } from "@stripe/stripe-js";
import { Order, OrderItem } from "../models/OrderItem";
import { Pagination, PagingParams } from "../models/Pagination";

function getCartFromJson() {
  const cartAsMap = new Map<string, CartItem>();
  if (localStorage.getItem("cart")) {
    const cartAsObject = JSON.parse(localStorage.getItem("cart")!);
    for (const [key, value] of Object.entries(cartAsObject)) {
      const v = value as CartItem;
      cartAsMap.set(
        key,
        new CartItem(v.item, v.quantity, {
          size: v.size,
          color: v.color,
          gender: v.gender,
          compressionClass: v.compressionClass,
        })
      );
    }
  }
  return cartAsMap;
}

export default class itemStore {
  itemRegistry = new Map<string, Item>();
  loading = false;
  selectedItem: Item | undefined = undefined;

  cartRegistry = getCartFromJson();
  isCartOpen = false;
  wasCartOpened = false;

  pagination: Pagination | null = null;
  pagingParams = new PagingParams();

  likedRegistry = new Map<string, Item>();
  likedLoading = false;

  orderRegistry = new Map<string, Order>();
  orderLoading = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => JSON.stringify(Object.fromEntries(this.cartRegistry!)),
      (cartRegistry) => {
        localStorage.setItem("cart", cartRegistry);
        // console.log(cartRegistry);
      }
    );
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

  get orders() {
    return Array.from(this.orderRegistry.values());
  }

  get cartTotal() {
    return this.cart.reduce((acc, curr) => {
      const price =
        curr.item.priceSale > 0 ? curr.item.priceSale : curr.item.price;
      return acc + curr.quantity * price;
    }, 0);
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

  makePayment = async () => {
    // getting stripe public key
    // keys should be kept in secrets manager
    const stripe = await loadStripe(
      "pk_test_51N11SGBFUFAjc34BQt3itoHm7xnXCpvG1anMY0BsSWYCmkXm6NiLEMOhifa8qbYemql0eX12D2t03bNZ3nOJLcfT00QfWfV4Ee"
    );

    // making new order to give to back-end
    const orderItems = this.cart.map((cartItem) => new OrderItem(cartItem));
    // making a call to back-end and getting back session key
    await api.Items.order(orderItems).then((session) =>
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
        if (this.selectedItem) this.selectedItem.liked = !wasLiked;
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
        result.forEach((item) => {
          this.likedRegistry.set(item.id, item);
        });
        this.likedLoading = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => (this.likedLoading = false));
    }
  };

  clearLiked = () => {
    this.likedRegistry.clear();
  };

  loadOrders = async () => {
    this.orderLoading = true;
    try {
      const result = await api.Items.orders();
      result.forEach((order) => {
        this.orderRegistry.set(order.id, order);
      });
      runInAction(() => (this.orderLoading = false));
    } catch (err) {
      console.log(err);
      runInAction(() => (this.orderLoading = false));
    }
  };

  clearOrders = () => {
    this.orderRegistry.clear();
  };
}
