<template>
  <div class="p-[20px] flex">
    <div class="input mr-[50px]">
      <div
        class="form"
        data-testid="form"
        :class="{ error: Object.keys(errorConfig).length }"
      >
        <div class="form-item">
          <input type="text" v-model="model.todo" class="border block" data-testid="todo-input"/>
          <i v-if="errorConfig['todo']" class="text-[12px] text-red-600">{{
            errorConfig["todo"]
          }}</i>
        </div>
      </div>
      <button
        @click="submit"
        class="border p-[4px] mt-[20px]"
        data-testid="submit-button"
      >
        submit
      </button>
    </div>
    <div class="list w-[200px]">
      <p class="border-b-[1px] w-full">备忘录</p>
      <ul v-if="list.length" data-testid="list-container">
        <li v-for="(item, index) in list" :key="index" class="todo-item">
          <p>{{ item }}</p>
          <button @click="remove(index)">删除</button>
        </li>
      </ul>
      <p class="mt-[20px] text-[12px] text-[#999999]">请输入todo信息并submit</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, toRefs } from "vue";
import { cloneDeep } from "@/utils/index";
interface FormRule {
  message: string;
  required?: boolean;
  pattern?: RegExp;
}

type ErrorConfig = Partial<Record<string, string>>;

type Data = { [key: string]: any };

type FormRules<T extends Data = any> = { [field in keyof T]?: Array<FormRule> };

onMounted(() => {
  initModel.value = cloneDeep(model.value);
});

const initModel = ref<Data>({});
const rules = reactive<FormRules>({
  todo: [
    {
      required: true,
      message: "请输入todo信息",
    },
    {
      pattern: /^.+\.$/,
      message: "请输入文字和结束标点符号",
    },
  ],
});
const list = ref<string[]>([]);
const model = ref<Data>({ todo: "" });
const errorConfig = reactive<ErrorConfig>({});

function remove(index: number) {
  list.value.splice(index, 1);
}

async function formValidate() {
  for (let key in rules) {
    const ruleItems = rules[key] || [];
    try {
      for (let rule of ruleItems) {
        const { required, pattern, message } = rule;
        const value = model.value[key as keyof typeof model.value];
        if (required && !value) {
          throw Error(message);
        }
        if (pattern && !pattern.test(value)) {
          throw Error(message);
        }
      }
      delete errorConfig[key];
    } catch (error: any) {
      errorConfig[key] = error;
    }
  }
  if (Object.keys(errorConfig).length) throw toRefs(errorConfig);
}

function reset() {
  model.value = cloneDeep(initModel.value);
}

async function submit() {
  try {
    await formValidate();
    list.value.push(model.value.todo);
    reset();
  } catch (error) {}
}
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  p {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  button {
    word-break: keep-all;
    margin-left: 10px;
    padding: 0 2px;
    border: 1px solid;
    border-radius: 2px;
    font-size: 12px;
  }
}
</style>
