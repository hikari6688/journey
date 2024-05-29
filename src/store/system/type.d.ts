export type LangEnum = "zh-CN" | "en-US";
export type ThemeEnum = "light" | "dark";

export interface SystemState {
  theme: ThemeEnum;
  lang: LangEnum;
  collapsed: boolean;
}
