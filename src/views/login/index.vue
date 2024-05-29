<script setup lang="ts">
import {
  Form,
  FormItem,
  Input,
  Button,
  Checkbox,
  InputPassword,
} from "ant-design-vue";
import { reactive } from "vue";
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true,
});
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<template>
  <div class="login-page theme-bg theme-text">
    <div class="login-form">
      <div class="brand">MüTE</div>
      <Form
        size="large"
        :model="formState"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <FormItem
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <Input class="w-[300px]" v-model:value="formState.username" />
        </FormItem>

        <FormItem
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <InputPassword class="w-[300px]" v-model:value="formState.password" />
        </FormItem>

        <FormItem name="remember" :wrapper-col="{ offset: 0, span: 24 }">
          <Checkbox v-model:checked="formState.remember" class="theme-text"
            >Remember me</Checkbox
          >
        </FormItem>

        <FormItem :wrapper-col="{ offset: 0, span: 24 }">
          <Button class="w-full" type="primary" html-type="submit"
            >Submit</Button
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    margin-top: -58px;
    .brand {
      font-family: "Faster One";
      font-size: 58px;
      user-select: none;
      text-align: center;
      margin-bottom: 18px;
    }
  }
}
</style>
