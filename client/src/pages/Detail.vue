<template>
    <div class="container">
        <n-button @click="back">返回</n-button>

        <n-h1>{{ blogInfo.title }}</n-h1>

        <div v-html="blogInfo.content"></div>
    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted,computed } from "vue"; //用于创建响应式对象user
import { useRouter, useRoute } from "vue-router"; //使用路由
const router = useRouter();
const route = useRoute();
const axios = inject("axios");

const blogInfo=ref({})

onMounted(()=>{
    loadBlog()
})

const loadBlog=async()=>{
    let res =await axios.get(`/blog/detail?id=${route.query.id}`)
    blogInfo.value=res.data.rows[0]
}
const back=()=>{
    router.push("/")
}
</script>

<style lang="scss" scoped>
.container{
    width: 1200px;
    margin: 0 auto;
}

</style>
<style>
.blog-content img{
    max-width: 100% !important;
}
</style>