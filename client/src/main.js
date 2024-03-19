import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import axios from "axios";
import naive from "naive-ui";
import { createDiscreteApi } from "naive-ui"; ///引入独立api createDiscreteApi
import { createPinia } from "pinia";
import { UserStore } from "./store/UserStore";
axios.defaults.baseURL = "http://localhost:8080"; //这意味着在使用 Axios 发送请求时，如果没有指定完整的 URL，那么请求将会以 http://localhost:8080 作为基础 URL 进行请求
const { message, notification, dialog } = createDiscreteApi([
  "message",
  "dialog",
  "notification",
]); //创建独立api

const app = createApp(App);
app.provide("axios", axios); //是在 Vue 3 中使用 Composition API 提供全局依赖的一种方式。它用于将一个实例或值注册为全局依赖项，从而使得整个应用程序中的所有组件都可以访问这个依赖项。//避免了在每个组件中重复导入 axios 的繁琐工作//可以在任何 Vue 组件中通过 inject 属性来访问提供的 Axios 实例
app.provide("server_url", axios.defaults.baseURL); //8080这个地址全局可调用为了非axios也可以用
app.provide("message", message);
app.provide("notification", notification);
app.provide("dialog", dialog);

app.use(createPinia());
app.use(router);
const userStore = UserStore();
axios.interceptors.request.use((config) => {
  config.headers.token = userStore.token;
  return config;
}); //拦截器用于，每个接口，不管带不带_token
app.use(naive);
app.mount("#app");
