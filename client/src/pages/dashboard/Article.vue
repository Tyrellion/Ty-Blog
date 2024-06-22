<template>
  <n-tabs  v-model:value="tabValue" justify-content="start" type="line" animated>
    <n-tab-pane name="list" tab="文章列表"> 
    <div v-for="(blog,index) in blogListInfo" style="margin-bottom: 15px;">
        <n-card :title="blog.title">
        {{ blog.content }}

        <template #footer>
            <n-space align="center">
                <div>发布时间：{{blog.create_time  }}
                
                </div>
                <n-button @click="toUpdate(blog)">修改</n-button>
                <n-button @click="toDelete(blog)">删除</n-button>
            </n-space>
        </template>
    </n-card>  
    </div>  
    <n-space>
    <div @click="toPage(pageNum)" v-for="pageNum in pageInfo.pageCount">
      <div :style="{ color: pageNum == pageInfo.page ? '#18A058' : '', cursor: 'pointer', fontSize: '16px' }">{{ pageNum }}</div>
    </div>
  </n-space>
    </n-tab-pane>
    <n-tab-pane name="add" tab="添加文章">
      <n-form>
        <n-form-item label="标题">
          <n-input v-model:value="addArticle.title" placeholder="请输入标题" />
        </n-form-item>
        <n-form-item label="分类">
            <n-select v-model:value="addArticle.categoryId" :options="CategoryOptions" />
        </n-form-item>
        <n-form-item label="内容">
         <rich-text-editor v-model="addArticle.content"></rich-text-editor>
        </n-form-item>
        <n-form-item label="">
            <n-button @click="add">提交</n-button>
        </n-form-item>
      </n-form>
    </n-tab-pane>
    <n-tab-pane name="update" tab="修改" v-if="isUpdating"> 
      <n-form>
        <n-form-item label="标题">
          <n-input v-model:value="updateArticle.title" placeholder="请输入标题" />
        </n-form-item>
        <n-form-item label="分类">
            <n-select v-model:value="updateArticle.categoryId" :options="CategoryOptions" />
        </n-form-item>
        <n-form-item label="内容">
         <rich-text-editor v-model="updateArticle.content"></rich-text-editor>
        </n-form-item>
        <n-form-item label="">
            <n-button @click="update">提交</n-button>
        </n-form-item>
      </n-form>  
    </n-tab-pane>
  </n-tabs>
  
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

const addArticle=reactive({
    categoryId:0,//用于分类
    title:"",
    content:"",
})
const updateArticle=reactive({
    id:0,
    categoryId:0,
    title:"",
    content:"",
})
const pageInfo=reactive({
  page:1,
  pageSize:3,
  pageCount:0,
  count:0
})//分页变量
const CategoryOptions=ref([])//用于分类的下拉框
const blogListInfo=ref([])
const tabValue=ref("list")
const isUpdating=ref(false)//用于判断是否是显示修改tab


onMounted(()=>{
    loadBlogs()
    loadCategorys()
})
const loadBlogs=async()=>{
    let res = await axios.get(`/blog/search?page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`)
    let temp_rows=res.data.data.rows;
    for(let row of temp_rows){
        row.content+="..."
        let d=new Date(row.create_time)
        row.create_time=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} `
    }
    blogListInfo.value=temp_rows;
    pageInfo.count=res.data.data.count
    pageInfo.pageCount = parseInt(pageInfo.count / pageInfo.pageSize) + (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)//计算总页数
    console.log(res);
}
const loadCategorys=async()=>{
    let res = await axios.get("/category/list");
    CategoryOptions.value = res.data.rows.map((item)=>{
        return{
            label:item.name,
            value:item.id
        }
    })
}

//加载文章数据并将文章id与name一一赋值
const add = async () => {
  if(addArticle.categoryId!=0){
    let res = await axios.post("blog/_token/add", addArticle);
      if (res.data.code == 200 ) {
    message.success(res.data.msg);
    addArticle.title=''
    addArticle.content=''
    addArticle.categoryId=''  //
   }   else {
    message.error(res.data.msg);
  }
  }else{
    message.error("请选择分类")
  }
  
};

const toPage= async (pageNum)=>{
  pageInfo.page=pageNum
  loadBlogs()
}//跳转到page
const toUpdate=async(blog)=>{
  isUpdating.value=true
  tabValue.value="update"
  let res=await axios.get(`/blog/detail?id=${blog.id}`)
  updateArticle.id=blog.id
  updateArticle.title=res.data.rows[0].title
  updateArticle.content=res.data.rows[0].content
  updateArticle.categoryId = res.data.rows[0].category_id
  console.log(res);
  console.log(updateArticle.categoryId );
}//跳转到修改页面
const update = async () => {
    let res = await axios.put("/blog/_token/update", updateArticle)
    if (res.data.code == 200) {
        message.success(res.data.msg)
        loadBlogs()
        tabValue.value = "list"
    } else {
        message.error(res.data.msg)
    }
}//提交修改
const toDelete=async(blog)=>{
  dialog.warning({
    title: "警告",
    content: "是否要删除",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      let res = await axios.delete(`/blog/_token/delete?id=${blog.id}`)
  if (res.data.code == 200) {
        message.success(res.data.msg)
        loadBlogs()
    } else {
        message.error(res.data.msg)
    }
    },
    onNegativeClick: () => {},
  })
  
}

</script>

<style lang="scss" scoped></style>
