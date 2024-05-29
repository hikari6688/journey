<template>
  <div class="form flex flex-wrap w-full justify-between">
    <div class="form-item mr-[20px]">
      <p class="form-item-label">名称：</p>
      <input
        type="text"
        maxlength="10"
        class="border indent-1 p-[2px]"
        v-model="form.name"
      />
    </div>
    <div class="form-item">
      <p class="form-item-label">金额：</p>
      <input
        type="text"
        class="border indent-1 p-[2px]"
        v-model="form.amount"
      />
    </div>
    <div class="form-item w-full mt-[20px]">
      <button class="border w-full h-[32px]" @click="submit">提交</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import useCashbookStore, { type Bill } from "@/store/cashbook/index";
import { v4 as uuidv4 } from "uuid";
const cashbookStore = useCashbookStore();
const rules = {
  name: [
    {
      required: true,
      message: "请输入名称",
    },
  ],
  amount: [
    {
      required: true,
      message: "请输入金额",
    },
    {
      pattern: /\d+|\d.\d+/,
      message: "请输入数字(精度两位以内)",
    },
  ],
};

const initState = {
  amount: 0,
  name: "",
};
const form = ref<Omit<Bill, "id">>({ ...initState });

function reset() {
  form.value = { ...initState };
}

async function submit() {
  await validate();
  cashbookStore.addBill({
    ...form.value,
    id: uuidv4(),
  });
  reset();
}

async function validate() {}
</script>
