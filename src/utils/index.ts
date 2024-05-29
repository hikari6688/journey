import { TypeEnums } from "./types/index.d";
export function getTypeof(data: any) {
  return Object.prototype.toString.call(data).slice(8, -1) as TypeEnums;
}

export function cloneDeep<T = any>(data: T, hash = new WeakMap()): T {
  if (typeof data !== "object" || data === null) return data;
  if (hash.has(data)) return hash.get(data);
  const copy: Record<any, any> | any[] = Array.isArray(data) ? [] : {};
  hash.set(data, copy);
  for (let key in data) {
    if (data.hasOwnProperty(key)) copy[key] = cloneDeep(data[key], hash);
  }
  return copy as T;
}

export function pick(object: Record<string, any>, keys: string[]) {
  if (getTypeof(object) !== "Object") {
    console.warn(`object must be of type Object`);
    return {};
  }
  if (getTypeof(keys) !== "Array") {
    console.warn(`keys must be of type Array`);
    return {};
  }
  return Object.keys(object).reduce(
    (result: Record<keyof typeof object, any>, key: string) => {
      if (keys.includes(key)) result[key] = object[key];
      return result;
    },
    {}
  );
}

export function omit(object: Record<string, any>, keys: string[]) {
  if (getTypeof(object) !== "Object") {
    console.warn(`object must be of type Object`);
    return {};
  }
  if (getTypeof(keys) !== "Array") {
    console.warn(`keys must be of type Array`);
    return {};
  }
  return Object.keys(object).reduce(
    (result: Record<keyof typeof object, any>, key: string) => {
      if (!keys.includes(key)) result[key] = object[key];
      return result;
    },
    {}
  );
}

export function withDebounce(
  fn: (...args: any[]) => any,
  frequency: number = 200
) {
  let timer: NodeJS.Timeout;
  return function (...args: any[]) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, frequency);
  };
}

export function withThrottle(
  fn: (...args: []) => any,
  frequency: number = 200
) {
  let open = true;
  return function (...args: []) {
    if (open) {
      open = false;
      fn(...args);
      setTimeout(() => {
        open = true;
      }, frequency);
    }
  };
}
