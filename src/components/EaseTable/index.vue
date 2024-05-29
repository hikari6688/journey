<template>
  <div class="easy-table">
    <SearchForm :columns="columns" @setParams="setSearchParams">
      <template v-slot:searchBtn="{ query }">
        <slot name="searchBtn" :query="query"></slot>
      </template>
    </SearchForm>
    <Table
      :row-selection="
        selectedRowKeys && {
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }
      "
      :data-source="tableData"
      :columns="columns"
      :loading="loading"
      :pagination="pageConfig"
      :row-key="rowKey"
      :scroll="scroll || { y: scrollHeight }"
      @change="handleTableChange"
      size="middle"
    >
      <template #headerCell="{ column }">
        <slot name="headerCell" :column="column"></slot>
      </template>
      <template #bodyCell="{ column, text, record }">
        <slot
          name="bodyCell"
          :column="column"
          :text="text"
          :record="record"
        ></slot>
      </template>
    </Table>
  </div>
</template>
<script setup lang="ts">
import {
  defineProps,
  ref,
  reactive,
  defineEmits,
  defineExpose,
  withDefaults,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { queryType } from "../SearchForm/type";
import { TableProps, TablePaginationConfig,Table } from "ant-design-vue";
type Key = string | number;
interface ITableProps {
  data: <T = any>(page: { size: number; current: number }) => Promise<T>;
  columns: TableProps["columns"];
  selectedRowKeys?: Key[];
  rowKey?: string;
  scroll?: { y: number; x: number };
}
interface IPageProps {
  current: number;
  total: number;
  pageSize: number;
  [rest: string]: any;
}
const searchParams = ref<queryType>({});
const scrollHeight = ref<number>(500);
const tableData = ref<[]>();
const loading = ref<boolean>(false);
const emit = defineEmits(["update:selectedRowKeys"]);
const props = withDefaults(defineProps<ITableProps>(), {
  rowKey: "id",
});

onMounted(() => {
  load();
  makeSize();
  window.addEventListener("resize", makeSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", makeSize);
});

const pageConfig: IPageProps = reactive({
  current: 1,
  total: 0,
  pageSize: 10,
  size: "small",
  showSizeChanger: true,
  showQuickJumper: true,
  position: ["bottomCenter"],
});

function makeSize() {
  const tableHeight =
    document.querySelector(".ant-table-wrapper")?.clientHeight;
  if (tableHeight) scrollHeight.value = tableHeight - 150;
}

async function load() {
  try {
    loading.value = true;
    const { pageSize, current } = pageConfig;
    console.log({ size: pageSize, current, ...searchParams.value });
    const data = await props.data({
      size: pageSize,
      current,
      ...searchParams.value,
    });
    tableData.value = data.records;
    pageConfig.total = data.total;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

/**
 * @description 分页变化
 * @param page 分页参数
 */
function handleTableChange(page: TablePaginationConfig) {
  const { pageSize, current } = page;
  pageConfig.current = current as number;
  pageConfig.pageSize = pageSize as number;
  load();
}

function onSelectChange(keys: Key[]) {
  emit("update:selectedRowKeys", keys);
}

/**
 * @description 点击搜索或者重置
 * @param query 搜索参数
 */
function setSearchParams(query: queryType) {
  searchParams.value = query;
  pageConfig.current = 1;
  load();
}

defineExpose({ load, reset: setSearchParams });
</script>

<style scoped lang="scss">
.easy-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  .ant-table-wrapper {
    flex: 1;
  }
  :deep(.ant-spin-nested-loading) {
    height: 100%;
    .ant-spin-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      .ant-table {
        flex: 1;
      }
    }
  }
}
</style>
