<template>
  <div class="layout-header theme-bg theme-text">
    <div class="left">
      <div class="trigger"></div>
      <div class="brand">MüTE</div>
    </div>
    <div class="right">
      <Space :size="16">
        <Dropdown placement="bottomRight">
          <SvgIcon name="lang" class="text-[22px] cursor-pointer" />
          <template #overlay>
            <Menu @click="(e:any) => menuClick(e)">
              <MenuItem v-for="item in langMenuItems" :key="item.key">
                {{ item.label }}
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
        <Switch
          click="switchTheme"
          :checked="systemStore.theme === 'dark'"
          @click="switchTheme"
        >
          <template #checkedChildren>
            <SvgIcon name="dark" style="font-size: 14px" />
          </template>
          <template #unCheckedChildren>
            <SvgIcon name="light" style="font-size: 14px" />
          </template>
        </Switch>
        <Dropdown>
          <UserAvatar class="cursor-pointer" />
          <template #overlay>
            <Menu>
              <MenuItem>
                <a href="javascript:;">{{ $t("system.logout") }}</a>
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
      </Space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Space, Switch, Dropdown, Menu, MenuItem } from "ant-design-vue";
import UserAvatar from "@/components/UserAvatar/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import UseSystemStore from "@/store/system/index";
import { langOptions } from "@/i18n/index";
import { SystemState } from "@/store/system/type";
interface LangOption {
  key: SystemState["lang"];
  label: string;
}

const systemStore = UseSystemStore();

function switchTheme(checked: boolean | string | number) {
  if (checked) systemStore.setTheme("dark");
  else systemStore.setTheme("light");
}

const langMenuItems = (Object.keys(langOptions) as LangOption["key"][]).reduce<
  LangOption[]
>((acc, key) => {
  if (key === systemStore.lang) return acc;
  else acc.push({ key, label: langOptions[key] });
  return acc;
}, []);

function menuClick({ key }: { key: LangOption["key"] }) {
  systemStore.setLang(key);
}
</script>
<style scoped lang="scss">
.layout-header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 4px 8px -2px #4747473d;
  z-index: 10;
  position: relative;
  .brand {
    font-family: "Faster One";
    font-size: 38px;
    user-select: none;
  }
  :deep(.ant-switch-inner) {
    .ant-switch-inner-checked,
    .ant-switch-inner-unchecked {
      height: 100%;
    }
    .icon-wrap {
      height: 100%;
    }
  }
}
</style>
