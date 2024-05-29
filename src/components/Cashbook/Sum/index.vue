<template>
  <div class="sum flex justify-between">
    <div class="flex-1 income">
      <span>收入：</span>
      <p>{{ withFormat(statistics.income) }}</p>
    </div>
    <div class="flex-1 expenses">
      <span>支出：</span>
      <p>{{ withFormat(statistics.expenses) }}</p>
    </div>
    <div
      class="flex-1"
      :class="
        statistics.income - statistics.expenses > 0 ? 'income' : 'expenses'
      "
    >
      <span>结余：</span>
      <p>{{ withFormat(statistics.income - statistics.expenses) }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useCashbookStore from "@/store/cashbook/index";
import { computed } from "vue";
import BigNumber from "bignumber.js";
interface Statistics {
  income: number;
  expenses: number;
}
const cashbookStore = useCashbookStore();
const statistics = computed<Statistics>(() => {
  return cashbookStore.bill.reduce(
    (acc, cur) => {
      const { amount } = cur;
      if (amount > 0) acc.income += amount;
      else acc.expenses += amount;
      return acc;
    },
    {
      income: 0,
      expenses: 0,
    }
  );
});
function withFormat(number: number | null) {
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
