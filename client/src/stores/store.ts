import { createContext, useContext } from "react";
import itemStore from "./itemStore";
import categoriesStore from "./categoriesStore";

interface Store {
  itemStore: itemStore;
  categoriesStore: categoriesStore;
}

export const store: Store = {
  itemStore: new itemStore(),
  categoriesStore: new categoriesStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
