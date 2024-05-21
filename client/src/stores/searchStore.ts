import { makeAutoObservable, runInAction } from "mobx";
import { Item } from "../models/Item";
import { Pagination, PagingParams } from "../models/Pagination";
import { store } from "./store";
import api from "../api";

export default class searchStore {
  itemRegistry = new Map<string, Item>();
  loading = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();

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

  loadItems = async (searchWord: string) => {
    this.loading = true;
    try {
      const params = this.axiosParams;
      if (searchWord) {
        params.append("searchWord", searchWord);
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

  clearItems = () => {
    this.itemRegistry.clear();
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };
}
