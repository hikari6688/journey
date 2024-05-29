<script setup lang="ts">
import { ref, onBeforeUpdate } from "vue";
import Menu from "./sider/index.vue";
import Header from "./header/index.vue";
import Cashbook from "@/components/Cashbook/index.vue";
</script>

<template>
  <div class="layout">
    <div class="header">
      <Header />
    </div>
    <div class="content">
      <div class="content-menu">
        <Menu />
      </div>
      <div class="content-view">
        <!-- <router-view /> -->
        <Cashbook />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .header {
    width: 100%;
    height: 58px;
  }
  .content {
    height: 100%;
    flex: 1;
    display: flex;
    .content-header {
      width: 200px;
      height: 100%;
    }
    .content-view {
      flex: 1;
      width: 100%;
    }
  }
}
</style>
