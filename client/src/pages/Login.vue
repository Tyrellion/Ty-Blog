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
      <n-checkbox v-model:checked="check">
      记住密码
    </n-checkbox>
      <n-button @click="login"
        >登录<n-icon> <Login /> </n-icon
      ></n-button>
      
    </n-card>
  </div>
</template>

<script setup>
import { Login, UserAvatar, Password } from "@vicons/carbon";
import { ref, reactive, inject } from "vue"; //用于创建响应式对象user
import{UserStore}from'../store/userStore'

import { useRouter, useRoute } from 'vue-router'//使用路由
const router = useRouter()
const route = useRoute()

const message = inject("message");

const axios = inject("axios")
//接收输入框的值
const userStore = UserStore()//调用userStore
const user = reactive({
  account: localStorage.getItem("account") || "",//先看是否记住在本地 
    password: localStorage.getItem("password") || "",
    check: localStorage.getItem("check") == 1 || false,
}); //对应input框的值，而item里的path对应rules
const check = ref(localStorage.getItem("check") == 1 || false);


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
const login = async () =>{
    let result = await axios.post("/admin/login",{
      account:user.account,
      password:user.password
    })
    if(result.data.code ==200){
      userStore.id=result.data.data.id
      userStore.token = result.data.data.token
      userStore.account=result.data.data.account
      if(check.value){
      localStorage.setItem("account",user.account)
      localStorage.setItem("password",user.password)
      localStorage.setItem("check", check.value ? 1 : 0)//用于确定选中框是否打钩
    }
    router.push("/dashboard")
      message.success("登录成功")
    }//将登录成功后的数据存储到userStore中
    
    else{
      message.error("请检查账号密码是否正确")
    }
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










