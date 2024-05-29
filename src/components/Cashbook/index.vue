<template>
  <div class="cashbook">
    <Sum />
    <List />
    <Form />
  </div>
</template>
<script lang="ts" setup>
import Form from "./Form/index.vue";
import Sum from "./Sum/index.vue";
import List from "./List/index.vue";
</script>
<style scoped lang="scss">
.cashbook {
  width: 460px;
  padding: 18px;
}
</style>
