<template>
  <div class="list h-[520px] overflow-y-auto border p-[12px]">
    <ul>
      <li v-for="item in bill">
        <span class="text-[13px] bold">{{ item.name }}：</span>
        <p :class="item.amount && item.amount > 0 ? 'income' : 'expenses'">
          {{ withFormat(item.amount as number) }}
        </p>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import useCashbookStore from "@/store/cashbook/index";
import { computed } from "vue";
import BigNumber from "bignumber.js";
const cashbookStore = useCashbookStore();
const bill = computed(() => {
  return cashbookStore.bill;
});

function withFormat(number: number) {
  if (!number) return "0.00";
  return new BigNumber(number).toFormat(2, 1);
}
</script>
<style lang="scss" scoped>
.income {
  color: rgb(14, 171, 14);
}
.expenses {
  color: rgb(231, 54, 54);
}
</style>
