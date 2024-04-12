import { makeAutoObservable, reaction, runInAction } from "mobx";
import { User, UserFormValues } from "../models/User";
import api from "../api";
import { store } from "./store";

export default class userStore {
  user: User | null = null;
  token: string | null = localStorage.getItem("jwt");

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          localStorage.setItem("jwt", token);
        } else {
          localStorage.removeItem("jwt");
        }
      }
    );
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    const user = await api.Users.login(creds);
    runInAction(() => {
      this.user = user;
      this.token = user.token;
    });
    store.modalStore.closeModal();
  };

  register = async (creds: UserFormValues) => {
    const user = await api.Users.register(creds);
    runInAction(() => {
      this.user = user;
      this.token = user.token;
    });
    store.modalStore.closeModal();
  };

  logout = () => {
    this.token = null;
    this.user = null;
  };

  getUser = async () => {
    try {
      const user = await api.Users.current();
      runInAction(() => (this.user = user));
    } catch (err) {
      console.log(err);
    }
  };
}
