<template>
  <div class="container">
    <div class="nav">
      <div @click="homePage">首页</div>
      <div>
        <n-popselect @update:value="searchCategory" v-model:value="selectedCategory" :options="categortyOptions" trigger="click">
          <div>分类<span>{{ categoryName }}</span> </div>
        </n-popselect>
      </div>
      <div @click="dashboard">后台</div>
    </div>
    <n-divider/>

    <n-space class="search">
            <n-input v-model:value="pageInfo.keyword" :style="{ width: '500px' }" placeholder="请输入关键字" />
            <n-button type="primary" ghost @click="loadBlogs(0)"> 搜索 </n-button>
        </n-space>

    <div v-for="(blog,index) in blogListInfo" style="margin-bottom: 15px;cursor: pointer;">
        <n-card :title="blog.title" @click="toDetail(blog)">
        {{ blog.content }}

        <template #footer>
            <n-space align="center">
                <div>发布时间：{{blog.create_time  }}
                
                </div>
  
            </n-space>
        </template>
    </n-card>  
    </div>  

    <n-pagination @update:page="loadBlogs"	 v-model:page="pageInfo.page" :page-count="pageInfo.pageCount" />

    <n-divider/>
    <div class="footer">
            <div>Power by Vue3</div>
            <div>川ICP备66666号-1</div>
        </div>
  </div>
  
</template>

<script setup>
import { ref, reactive, inject, onMounted,computed } from "vue"; //用于创建响应式对象user
import { useRouter, useRoute } from "vue-router"; //使用路由
const router = useRouter();
const route = useRoute();

const message = inject("message");
const dialog = inject("dialog");
const axios = inject("axios");

const selectedCategory=ref(0)
const categortyOptions = ref([])
const blogListInfo=ref([])

const pageInfo=reactive({
  page:1,
  pageSize:3,
  pageCount:0,
  count:0,
  keyword:"",
  categoryId:0
})//search接口传参

onMounted(()=>{
    loadCategorys()
    loadBlogs()
})
const loadBlogs=async(page = 0)=>{//如果没有传参page为0
    if(page!=0){
        pageInfo.page=page
    }
    let res = await axios.get(`/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}&categoryId=${pageInfo.categoryId}`)
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
const categoryName = computed(()=>{
    let selectedOption=categortyOptions.value.find((option)=>option.value == selectedCategory.value)
    return selectedOption?selectedOption.label:""
})

const loadCategorys = async () => {
    let res = await axios.get("/category/list")
    categortyOptions.value = res.data.rows.map((item) => {
        return {//使用 map 方法，您遍历了这个数组，并为每个分类数据项创建了一个新的对象，该对象包含了 label 和 value 两个属性。
            label: item.name,//label与value为ui组件库选择框配置格式要求
            value: item.id
        }
    })
    console.log(categortyOptions.value)
}


const searchCategory=(categoryId)=>{
  pageInfo.categoryId=categoryId
  loadBlogs()
}

const homePage = () => {
    router.push("/")
}
const dashboard=()=>{
    router.push("/login")
}
const toDetail=(blog)=>{
    router.push({path:"/detail",query:{id:blog.id}})
    router.push(`/detail?id=${blog.id}`);
    
}
</script>

<style lang="scss" scoped>
.search {
  margin-bottom: 15px;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
.nav {
  display: flex;
  font-size: 20px;
  padding-top: 20px;
  color: #64676a;
  div {
    cursor: pointer;
    margin-right: 15px;

    &:hover {
      color: #f60;
    }
    span{
        font-size: 12px;
    }
  }
}
.footer {
    text-align: center;
    line-height: 25px;
    color: #64676a;
}
</style>
