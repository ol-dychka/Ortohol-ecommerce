import { makeAutoObservable, runInAction } from "mobx";
import { Category, Item } from "../models/Item";
import { Pagination, PagingParams } from "../models/Pagination";
import { store } from "./store";
import api from "../api";
import PriceRange from "../models/PriceRange";

export default class categoriesStore {
  itemRegistry = new Map<string, Item>();
  loading = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  category = Category.temp_wearing;
  priceRange: PriceRange | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    params.append("category", this.category);
    return params;
  }

  get items() {
    return Array.from(this.itemRegistry.values());
  }

  loadItems = async (price?: PriceRange) => {
    this.loading = true;
    try {
      const params = this.axiosParams;
      if (price) {
        params.append("priceMin", price.min.toString().replace(".", ","));
        params.append("priceMax", price.max.toString().replace(".", ","));
      }
      console.log(params);
      const result = await api.Items.list(params);
      console.log(result);
      runInAction(() => {
        this.itemRegistry.clear();
        result.data.data.forEach((item) => {
          // grabbing Item ID part from the unique cart key
          item.added = Array.from(store.itemStore.cartRegistry.keys()).some(
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

  loadPriceRange = async () => {
    try {
      const result = await api.Items.priceRange(this.category);
      runInAction(() => (this.priceRange = result));
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setCategory = (category: Category) => {
    this.category = category;
  };
}
