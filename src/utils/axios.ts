import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
interface PendingQueue {
  url: string;
  cancel: () => void;
  [rest: string]: any;
}
interface IServerResponseBody<T> {
  code: number;
  data: T;
  msg: string;
}
let pendingQueue: PendingQueue[] = [];

const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  timeout: 30_000,
  baseURL,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {}
);

instance.interceptors.response.use(
  (response) => {
    const { url = "" } = response.config;
    removeDuplicate(url);
    return response;
  },
  (error) => {
    const { url } = error.config;
    removeDuplicate(url);
  }
);

function dealDuplicate(url: string) {
  pendingQueue.forEach((task) => {
    if (task.url === url) {
      task.cancel && task.cancel();
    }
  });
}

function removeDuplicate(url: string) {
  pendingQueue = pendingQueue.filter((task) => {
    return task.url !== url;
  });
}

export function request<
  T = any,
  D = any,
  R = AxiosResponse<IServerResponseBody<T>>
>(config: AxiosRequestConfig<D>): Promise<R> {
  return instance.request<IServerResponseBody<T>, R, D>({
    ...config,
  });
}

export function requestWithAutoCancel<
  T = any,
  D = any,
  R = AxiosResponse<IServerResponseBody<T>>
>(config: AxiosRequestConfig<D>): [() => Promise<R>, () => void] {
  const url = config.url as string;
  dealDuplicate(url as string);
  const controller = new AbortController();
  const cancel = () => controller.abort();
  const init = () =>
    instance.request<IServerResponseBody<T>, R, D>({
      ...config,
      signal: controller.signal,
    });
  pendingQueue.push({ url, cancel });
  return [init, cancel];
}

export const originRequest = instance.request;
