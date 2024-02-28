<template>
  <div class="login-card">
    <n-card>
      <h1 class="login-title">后台登录</h1>
      <n-form :model="user" :rules="rules">
        <n-form-item path="account" label="账号"
          ><n-input
            v-model:value="user.account"
            type="text"
            size="large"
            round
            placeholder="请输入账号"
            ><template #prefix> <n-icon :component="UserAvatar" /> </template
          ></n-input>
        </n-form-item>
        <n-form-item path="password" label="密码"
          ><n-input
            v-model:value="user.password"
            type="password"
            size="large"
            round
            placeholder="请输入密码"
            ><template #prefix> <n-icon :component="Password" /> </template>
          </n-input>
        </n-form-item>
      </n-form>

      <n-button @click="login"
        >登录<n-icon> <Login /> </n-icon
      ></n-button>
    </n-card>
  </div>
</template>

<script setup>
import { Login, UserAvatar, Password } from "@vicons/carbon";
import { ref, reactive } from "vue"; //用于创建响应式对象user

const user = reactive({
  account: "",
  password: "",
}); //对应input框的值，而item里的path对应rules

const rules = {
  account: [
    {
      required: true,
      min: 3,
      max: 12,
      message: "账号长度在 3 到 12 个字符",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 18,
      message: "密码长度在 6 到 18 个字符",
      trigger: "blur",
    },
  ],
};
const login=async()=>{
    let result = await axios.post
}
</script>

<style scoped>
.login-card {
  width: 600px;
  margin: 0 auto;
  margin-top: 100px;
}
.login-title {
  text-align: center;
}
</style>
