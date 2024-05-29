import { Config, StorageData } from "./types/storage";

const prefix = "";

const storageMap = {
  localStorage,
  sessionStorage,
};

export function getStorage<T = any>(key: string, config?: Config): T | null {
  const { storage = "localStorage" } = config || {};
  try {
    const { expire, value } = JSON.parse(
      storageMap[storage].getItem(prefix + key) as string
    ) as StorageData;
    if (expire && expire < new Date().getTime()) {
      storageMap[storage].removeItem(prefix + key);
      return null;
    }
    return value as T;
  } catch (error) {
    return null;
  }
}

export function setStorage(key: string, value: any, config?: Config) {
  const { storage = "localStorage", expire } = config || {};
  try {
    const valueStr = JSON.stringify({
      value,
      expire: expire ? new Date().getTime() + expire : 0, //ms
    });
    storageMap[storage].setItem(prefix + key, valueStr);
  } catch (error) {
    console.log(error);
  }
}
