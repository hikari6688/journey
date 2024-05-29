<template>
  <div :title="title" class="icon-wrap">
    <svg aria-hidden="true" width="1em" height="1em" v-bind="bindAttrs">
      <use :xlink:href="symbolId" fill="currentColor" />
    </svg>
  </div>
</template>
<script lang="ts" setup>
import { computed, useAttrs, defineProps, withDefaults } from "vue";
interface Props {
  title?: string;
  name?: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: "",
  name: "",
});

const attrs = useAttrs();

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) || "",
  style: (attrs.style as string) || "",
}));

const symbolId = computed(() => {
  return `#icon-${props.name}`;
});
</script>
<style scoped>
.icon-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
