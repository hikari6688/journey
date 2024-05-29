import { createI18n } from "vue-i18n";
import zhCN from "./zh-CN.json";
import enUS from "./en-US.json";
import { SystemState } from "@/store/system/type";
import { UseSystemStoreWithOut } from "@/store/system/index";

export const langOptions: Record<SystemState["lang"], string> = {
  "en-US": "English",
  "zh-CN": "中文(简体)",
};

const systemStore = UseSystemStoreWithOut();
const i18n = createI18n({
  locale: 'en-US',
  fallbackLocale: "en-US",
  messages: { "en-US": enUS, "zh-CN": zhCN },
});
export default i18n;
