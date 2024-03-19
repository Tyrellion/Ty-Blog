<template>
    <div class="main-panel">
        <div class="menus" >
            <div v-for="(menu,index) in menus " @click="toPage(menu)">
                {{ menu.name }}
            </div>
        </div>
        <div style="padding:20px;width:100%">
            <router-view></router-view>
        </div>
        <div class="title">管理页面</div><!-- 水印 -->
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

let menus = [
    { name: "文章管理", href: "/dashboard/article" },
    { name: "分类管理", href: "/dashboard/category" },
    { name: "用户界面", href: "/" },
    { name: "退出", href: "logout" },
];//
const toPage=(menu)=>{
    if(menu.href=="logout"){
        router.push("/login")
    }else{
        router.push(menu.href)
    }
}
</script>

<style lang="scss" scoped>
.main-panel {
    display: flex;
    color: #64676a;
    max-width: 1500px;
    margin: 0 auto;
}
.menus {
    padding: 20px 0;
    box-sizing: border-box;
    line-height: 55px;
    text-align: center;
    width: 180px;
    height: 95vh;
    border-right: 1px solid #dadada;

    div {
        cursor: pointer;

        &:hover {
            color: #fd760e;
        }
    }
}
.title {
    font-size: 65px;
    font-weight: bold;
    text-align: right;
    position: fixed;
    color: rgba(0, 0, 0, 20%);
    right: calc((100vw - 1500px) / 2);
    bottom: 20px;
}
.selected {
    color: #fd760e; /* 设置选中菜单的颜色 */
  }
</style>