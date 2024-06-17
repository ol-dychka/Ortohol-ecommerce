import axios, { AxiosResponse } from "axios";
import { Category, Item } from "./models/Item";
import { Order, OrderItem } from "./models/OrderItem";
import StripeCheckoutSessionResult from "./models/StripeCheckoutSessionResult";
import { PaginatedResult } from "./models/Pagination";
import PriceRange from "./models/PriceRange";
import { User, UserFormValues } from "./models/User";
import { store } from "./stores/store";
import { OrderItems } from "./models/OrderItems";

axios.defaults.baseURL = import.meta.env.VITE_APP_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.userStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    // if (import.meta.env.DEV) await sleep(1000);
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResult<unknown>>;
    }
    return response;
  }
  // ,
  // (error: AxiosError) => {
  //   const { data, status, config } = error.response as AxiosResponse;
  //   switch (status) {
  //     case 400:
  //       if (
  //         config.method === "get" &&
  //         Object.prototype.hasOwnProperty.call(data.errors, "id")
  //       ) {
  //         router.navigate("/notfound");
  //       }
  //       if (data.errors) {
  //         const modalStateErrors = [];
  //         for (const key in data.errors) {
  //           if (data.errors[key]) {
  //             modalStateErrors.push(data.errors[key]);
  //           }
  //         }
  //         throw modalStateErrors.flat();
  //       } else {
  //         toast.error(data);
  //       }
  //       break;
  //     case 401:
  //       toast.error("Unauthorized");
  //       break;
  //     case 403:
  //       toast.error("Forbidden");
  //       break;
  //     case 404:
  //       router.navigate("/notfound");
  //       break;
  //     case 500:
  //       store.appStore.setServerError(data);
  //       router.navigate("/servererror");
  //       break;
  //   }
  //   return Promise.reject(error);
  // }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Items = {
  list: (params: URLSearchParams) =>
    axios.get<PaginatedResult<Item[]>>("/items", { params }),
  priceRange: (category: Category) =>
    requests.get<PriceRange>(`/items/${category}/range`),
  single: (id: string) => requests.get<Item>(`/items/${id}`),
  order: (items: OrderItem[]) =>
    requests.post<StripeCheckoutSessionResult>(
      `/items`,
      new OrderItems(
        items,
        `${window.location.origin}/success`,
        `${window.location.origin}/failure`
      )
    ),
  orders: () => requests.get<Order[]>("/items/orders"),
  likes: () => requests.get<Item[]>("/items/likes"),
  like: (id: string) => requests.post(`/items/${id}/like`, {}),
};

const Users = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
};

const api = {
  Items,
  Users,
};

export default api;
