<script setup lang="ts">
import { ref,onMounted } from "vue";
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import UseSystemStore from "@/store/system/index";
dayjs.locale("zh-cn");
const systemStore = UseSystemStore();
const locale = ref(zhCN);
const theme = ref({
  token: {
    colorPrimary: "#474747",
  },
});

function initTheme() {
  document.documentElement.setAttribute("theme", systemStore.theme);
}

function initLang() {
  document.documentElement.setAttribute("lang", systemStore.lang);
}

onMounted(()=>{
  initTheme()
  initLang()
})
</script>

<template>
  <ConfigProvider :locale="locale" :theme="theme">
    <router-view />
  </ConfigProvider>
</template>

<style scoped lang="scss"></style>
