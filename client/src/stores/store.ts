import { createContext, useContext } from "react";
import itemStore from "./itemStore";
import categoriesStore from "./categoriesStore";
import userStore from "./userStore";
import modalStore from "./modalStore";
import searchStore from "./searchStore";

interface Store {
  itemStore: itemStore;
  categoriesStore: categoriesStore;
  userStore: userStore;
  modalStore: modalStore;
  searchStore: searchStore;
}

export const store: Store = {
  itemStore: new itemStore(),
  categoriesStore: new categoriesStore(),
  userStore: new userStore(),
  modalStore: new modalStore(),
  searchStore: new searchStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
