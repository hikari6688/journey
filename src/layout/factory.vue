<template>
  <EaseTable :columns="columns" :data="getPageData" ref="tableRef">
    <template #searchBtn="{ query }">
      <Button @click="fakeFetch(query)">插槽</Button>
    </template>
  </EaseTable>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Button } from 'ant-design-vue'
const tableRef = ref();
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    type: "input",
  },
  {
    title: "时间",
    dataIndex: "age",
    key: "age",
    type: "datePicker",
    format:"YYYY-MM-DD HH:mm:ss"
  },
  {
    title: "地区",
    dataIndex: "address",
    key: "address",
    type: "select",
    options: getAddtrss(),
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
    type: "select",
    options: [
      {
        label: "男",
        value: 0,
      },
      {
        label: "女",
        value: 1,
      },
    ],
  },
];

function getAddtrss() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          label: "四川",
          value: "sichuan",
        },
        {
          label: "上海",
          value: "shanghai",
        },
      ]);
    }, 200);
  });
}
function fakeFetch(query: {}) {
  tableRef.value.load();
}
const getPageData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        records: [
          {
            key: "1",
            name: "胡彦斌",
            age: 32,
            address: "西湖区湖底公园1号",
          },
          {
            key: "2",
            name: "胡彦祖",
            age: 42,
            address: "西湖区湖底公园1号",
          },
          {
            key: "1",
            name: "胡彦斌",
            age: 32,
            address: "西湖区湖底公园1号",
          },
          {
            key: "2",
            name: "胡彦祖",
            age: 42,
            address: "西湖区湖底公园1号",
          },
          {
            key: "1",
            name: "胡彦斌",
            age: 32,
            address: "西湖区湖底公园1号",
          },
          {
            key: "2",
            name: "胡彦祖",
            age: 42,
            address: "西湖区湖底公园1号",
          },
          {
            key: "1",
            name: "胡彦斌",
            age: 32,
            address: "西湖区湖底公园1号",
          },
          {
            key: "2",
            name: "胡彦祖",
            age: 42,
            address: "西湖区湖底公园1号",
          },
          {
            key: "1",
            name: "胡彦斌",
            age: 32,
            address: "西湖区湖底公园1号",
          },
          {
            key: "2",
            name: "胡彦祖",
            age: 42,
            address: "西湖区湖底公园1号",
          },
          {
            key: "1",
            name: "胡彦斌",
            age: 32,
            address: "西湖区湖底公园1号",
          },
          {
            key: "2",
            name: "胡彦祖",
            age: 42,
            address: "西湖区湖底公园1号",
          },
          {
            key: "1",
            name: "胡彦斌",
            age: 32,
            address: "西湖区湖底公园1号",
          },
          {
            key: "2",
            name: "胡彦祖",
            age: 42,
            address: "西湖区湖底公园1号",
          },
          {
            key: "1",
            name: "胡彦斌",
            age: 32,
            address: "西湖区湖底公园1号",
          },
          {
            key: "2",
            name: "胡彦祖",
            age: 42,
            address: "西湖区湖底公园1号",
          },
          {
            key: "1",
            name: "胡彦斌",
            age: 32,
            address: "西湖区湖底公园1号",
          },
          {
            key: "2",
            name: "胡彦祖",
            age: 42,
            address: "西湖区湖底公园1号",
          },
          {
            key: "1",
            name: "胡彦斌",
            age: 32,
            address: "西湖区湖底公园1号",
          },
          {
            key: "2",
            name: "胡彦祖",
            age: 42,
            address: "西湖区湖底公园1号",
          },
          {
            key: "1",
            name: "胡彦斌",
            age: 32,
            address: "西湖区湖底公园1号",
          },
          {
            key: "2",
            name: "胡彦祖",
            age: 42,
            address: "西湖区湖底公园1号",
          },
        ],
        total: 20,
      });
    }, 200);
  });
};
</script>
<style></style>
