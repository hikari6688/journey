<template>
  <div class="user-avatar">
    <img v-if="avatarSrc" :src="avatarSrc" alt="" />
    <SvgIcon v-else name="avatar-default" style="font-size: 30px;" />
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import useUserStore from "@/store/user/index";
import SvgIcon from "@/components/SvgIcon/index.vue";
const userStore = useUserStore();
const avatarSrc = computed(() => {
  return userStore.userInfo?.avatar;
});
</script>

<style lang="scss" scoped>
.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  img,
  .icon-wrap {
    width: 100%;
    height: 100%;
  }
}
</style>
