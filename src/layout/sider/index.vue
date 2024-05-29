<template>
  <div class="side-menu">
    <Menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      :inline-collapsed="state.collapsed"
      :items="items"
    ></Menu>
  </div>
</template>
<script lang="ts" setup>
import { Menu } from "ant-design-vue";
import { reactive, watch, h } from "vue";
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";
const state = reactive({
  collapsed: false,
  selectedKeys: ["1"],
  openKeys: ["sub1"],
  preOpenKeys: ["sub1"],
});
const items = reactive([
  {
    key: "1",
    label: "Option 1",
    title: "Option 1",
  },
  {
    key: "2",
    label: "Option 2",
    title: "Option 2",
  },
  {
    key: "3",
    label: "Option 3",
    title: "Option 3",
  },
  {
    key: "sub1",
    label: "Navigation One",
    title: "Navigation One",
    children: [
      {
        key: "5",
        label: "Option 5",
        title: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
        title: "Option 6",
      },
      {
        key: "7",
        label: "Option 7",
        title: "Option 7",
      },
      {
        key: "8",
        label: "Option 8",
        title: "Option 8",
      },
    ],
  },
]);
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  }
);
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};
</script>
<style scoped lang="scss">
.side-menu {
  width: 260px;
  height: 100%;
  overflow-y: auto;
  :deep(.ant-menu) {
    .ant-menu-submenu-title,
    .ant-menu-item,
    .ant-menu-submenu-arrow {
      color: var(--text-gray-1) !important;
      &:hover {
        color: var(--text-primary) !important;
      }
    }
    .ant-menu-item-selected {
      color: var(--text-primary) !important;
    }
  }
  & > .ant-menu {
    padding: 12px 6px;
    height: 100%;
    background-color: var(--container-bg);
  }
  :deep(.ant-menu-sub) {
    background-color: unset !important;
  }
}
</style>
