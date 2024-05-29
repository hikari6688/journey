import { defineStore } from "pinia";
import { request } from "@/utils/axios";
type DictItem = Record<string, any>;
interface DictState {
  dictMap: DictItem;
}
const useDictStore = defineStore("user", {
  state: (): DictState => {
    return { dictMap: {} };
  },
  actions: {
    assembleDictData(key: string) {
      return new Promise((resolve, reject) => {
        request<any>({
          url: `/dict/${key}`,
        })
          .then((res) => {
            this.dictMap[key] = res;
            resolve(res);
          })
          .catch(() => {
            reject();
          });
      });
    },
    async getDictData(keys: string[], flush?: boolean) {
      const promiseGroup: Array<Promise<any>> = [];
      if (flush) {
        keys.forEach((k) => promiseGroup.push(this.assembleDictData(k)));
      } else {
        const cached = Object.keys(this.dictMap);
        const notCached = keys.filter((k) => !cached.includes(k));
        notCached.forEach((k) => promiseGroup.push(this.assembleDictData(k)));
      }
      await Promise.allSettled([promiseGroup]);
    },
  },
});
export default useDictStore;
