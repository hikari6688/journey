<template>
  <div class="table-search">
    <Form :model="formState" :label-col="labelCol" ref="formRef">
      <Row :gutter="16">
        <template v-for="column in columns" :key="column.dataIndex">
          <Col :span="column.span || 6">
            <FormItem :label="column.title" :name="column.dataIndex">
              <Input
                v-if="column.type === 'input'"
                class="full"
                allow-clear
                v-model:value="formState[column.dataIndex]"
                :placeholder="column.placeholder"
              >
              </Input>
              <Select
                v-if="column.type === 'select'"
                v-model:value="formState[column.dataIndex]"
                :placeholder="column.placeholder"
                :options="optionMap[column.dataIndex] || []"
                allow-clear
              ></Select>

              <TreeSelect
                v-if="column.type === 'tree'"
                class="full"
                show-search
                allow-clear
                v-model:value="formState[column.dataIndex]"
                :placeholder="column.placeholder"
                :tree-data="optionMap[column.dataIndex] || []"
              ></TreeSelect>

              <DatePicker
                v-if="column.type === 'datePicker'"
                class="full"
                allow-clear
                :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
                v-model:value="formState[column.dataIndex]"
                :value-format="column.format"
                :format="column.format"
              />

              <RangePicker
                v-if="column.type === 'rangePicker'"
                class="full"
                allow-clear
                v-model:value="formState[column.dataIndex]"
                :value-format="column.format"
                :format="column.format"
              />
            </FormItem>
          </Col>
        </template>
        <Col>
          <Space>
            <Button type="primary" @click="setParams(false)"> 搜索 </Button>
            <Button type="primary" @click="setParams(true)"> 重置 </Button>
            <slot name="searchBtn" :query="formState"></slot>
          </Space>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script setup lang="ts">
import type { ColunmType, queryType } from "./type";
import { defineProps, reactive, defineEmits, ref, onMounted } from "vue";
import {
  type FormInstance,
  Input,
  Button,
  Form,
  FormItem,
  Space,
  Select,
  Row,
  Col,
  RangePicker,
  DatePicker,
  TreeSelect,
} from "ant-design-vue";
import dayjs from "dayjs";
import { getTypeof } from "@/utils/index";
const props = defineProps<{
  columns: ColunmType[];
  labelCol?: { span: number };
}>();
const emit = defineEmits<{
  (e: "setParams", query: queryType): void;
}>();
const formRef = ref<FormInstance>();
const optionMap = reactive<Record<string, []>>({});
const formState = ref<queryType>({});

function setParams(reset: boolean) {
  if (reset) {
    formRef.value && formRef.value.resetFields();
    formState.value = {};
  }
  emit("setParams", formState.value);
}

function makeOptions() {
  props.columns.forEach(async (column) => {
    const { type, options, dataIndex } = column;
    if ((type === "select" || type === "tree") && column.options) {
      const optionType = getTypeof(options);
      if (optionType === "Array") {
        optionMap[dataIndex] = options as [];
      }
      if (optionType === "Promise") {
        optionMap[dataIndex] = (await options) as [];
      }
    }
  });
}
onMounted(() => {
  makeOptions();
});
</script>
<style>
.full {
  width: 100%;
}
.table-search {
  background-color: #ffffff;
  margin-bottom: 20px;
  padding: 24px 16px;
}
</style>
