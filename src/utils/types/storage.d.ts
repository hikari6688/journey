export type StorageType = "localStorage" | "sessionStorage";

export interface Config {
  storage?: StorageType;
  expire?: number;
}

export interface StorageData {
  value: any;
  expire: Config["expire"];
}
