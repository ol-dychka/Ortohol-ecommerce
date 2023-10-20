import axios, { AxiosResponse } from "axios";
import { Item } from "./models/Item";
import { Order } from "./models/OrderItem";
import StripeCheckoutSessionResult from "./models/StripeCheckoutSessionResult";
import { PaginatedResult } from "./models/Pagination";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

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
  single: (id: string) => requests.get<Item>(`/items/${id}`),
  order: (order: Order) =>
    requests.post<StripeCheckoutSessionResult>(`/items`, order),
};

const api = {
  Items,
};

export default api;
