<template>
    <div>
        <h1>Welcome to the Dashboard!</h1>
        <h2>{{ userStore }}</h2>
    </div>
</template>

<script setup>
import { ref, reactive, inject } from "vue"; //用于创建响应式对象user
import{UserStore}from'../../store/userStore'
import { useRouter, useRoute } from 'vue-router'//使用路由
const router = useRouter()
const route = useRoute()

const message = inject("message");

const axios = inject("axios")
//接收输入框的值
const userStore = UserStore()//调用userStore


</script>

<style scoped>
</style>