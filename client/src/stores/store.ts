import { createContext, useContext } from "react";
import itemStore from "./itemStore";

interface Store {
  itemStore: itemStore;
}

export const store: Store = {
  itemStore: new itemStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
