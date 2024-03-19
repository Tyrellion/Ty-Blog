<template>
  <n-tabs type="line" default-value="jay chou" justify-content="start" animated>
    <n-tab-pane name="oasis" tab="Oasis"> Wonderwall </n-tab-pane>
    <n-tab-pane name="add" tab="添加文章">
      <n-form>
        <n-form-item label="标题">
          <n-input v-model:value="addArtical.title" placeholder="请输入标题" />
        </n-form-item>
        <n-form-item label="内容">
         <rich-text-editor v-model="addArtical.content"></rich-text-editor>
        </n-form-item>
      </n-form>
    </n-tab-pane>
    <n-tab-pane name="jay chou" tab="周杰伦"> 七里香 </n-tab-pane>
  </n-tabs>
  {{ addArtical.content }}
</template>

<script setup>
import { ref, reactive, inject, onMounted } from "vue"; //用于创建响应式对象user
import { UserStore } from "../../store/userStore";
import { useRouter, useRoute } from "vue-router"; //使用路由
import Category from "./Category.vue";

import RichTextEditor from "../../components/RichTextEditor.vue"

const router = useRouter();
const route = useRoute();

const message = inject("message");
const dialog = inject("dialog");

const axios = inject("axios");
//接收输入框的值
const userStore = UserStore(); //调用userStore

const addArtical=reactive({
    CategoryId:0,
    title:"",
    content:"123",
})
</script>

<style lang="scss" scoped></style>
