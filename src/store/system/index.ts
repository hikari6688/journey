import { defineStore } from "pinia";
import { SystemState } from "./type";
import { getStorage, setStorage } from "@/utils/storage";
import { pick } from "@/utils/index";
import store from '../index'
const storageKey = "systemState";
function getDefaultState(): SystemState {
  const localState = getStorage<Partial<SystemState>>(storageKey) || {};
  return { theme: "light", lang: "zh-CN", collapsed: false, ...localState };
}

const UseSystemStore = defineStore("system", {
  state: () => getDefaultState(),
  actions: {
    setTheme(theme: SystemState["theme"]) {
      this.theme = theme;
      this.recordState();
      document.documentElement.setAttribute("theme", theme);
    },
    setCollapsed(collapsed: SystemState["collapsed"]) {
      this.collapsed = collapsed;
    },
    setLang(lang: SystemState["lang"]) {
      this.lang = lang;
      this.recordState();
      window.location.reload();
    },
    recordState() {
      const recordKeys = ["theme", "lang"];
      const state = pick(this.$state, recordKeys);
      console.log(this.$state);
      setStorage(storageKey, state);
    },
  },
});
export default UseSystemStore;

export function UseSystemStoreWithOut() {
  return UseSystemStore(store);
}
