import axios, { AxiosResponse } from "axios";
import { Item } from "./models/Item";
import { Order } from "./models/OrderItem";
import StripeCheckoutSessionResult from "./models/StripeCheckoutSessionResult";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Items = {
  list: () => requests.get<Item[]>("/items"),
  single: (id: string) => requests.get<Item>(`/items/${id}`),
  order: (order: Order) =>
    requests.post<StripeCheckoutSessionResult>(`/items`, order),
};

const api = {
  Items,
};

export default api;
