import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import axios from 'axios';
import naive from 'naive-ui'

const app = createApp(App);
app.provide("axios",axios)//是在 Vue 3 中使用 Composition API 提供全局依赖的一种方式。它用于将一个实例或值注册为全局依赖项，从而使得整个应用程序中的所有组件都可以访问这个依赖项。//避免了在每个组件中重复导入 axios 的繁琐工作//可以在任何 Vue 组件中通过 inject 属性来访问提供的 Axios 实例
app.use(router);
app.use(naive)
app.mount('#app');