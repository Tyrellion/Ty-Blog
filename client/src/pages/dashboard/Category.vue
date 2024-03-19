<template>
  <div>
    <n-button @click="showAddModel = true">添加</n-button>
    <n-table :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>编号</th>
          <th>名称</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categoryList">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>
            <n-space
              ><n-button @click="toUpdate(category)">修改</n-button
              ><n-button @click="deleteCategory(category)"
                >删除</n-button
              ></n-space
            >
          </td>
        </tr>
      </tbody>
    </n-table>

    <n-modal v-model:show="showAddModel">
      <n-card
        style="width: 600px"
        title="添加分类"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div>
          <n-input
            v-model:value="addCategory.name"
            type="text"
            placeholder="请输入名称"
          ></n-input>
        </div>
        <template #action>
          <div><n-button @click="add"> 提交 </n-button></div>
        </template>
      </n-card>
    </n-modal>
    <n-modal v-model:show="showUpdateModel">
      <n-card
        style="width: 600px"
        title="修改分类"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div>
          <n-input
            v-model:value="updateCategory.name"
            type="text"
            placeholder="请输入名称"
          ></n-input>
        </div>
        <template #action>
          <div><n-button @click="update"> 提交 </n-button></div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from "vue"; //用于创建响应式对象user
import { UserStore } from "../../store/userStore";
import { useRouter, useRoute } from "vue-router"; //使用路由
const router = useRouter();
const route = useRoute();

const message = inject("message");
const dialog = inject("dialog");

const axios = inject("axios");
//接收输入框的值
const userStore = UserStore(); //调用userStore

const categoryList = ref([]);
const showAddModel = ref(false);
const showUpdateModel = ref(false);

const addCategory = reactive({
  name: "",
}); //添加功能
const updateCategory = reactive({
  id: 0,
  name: "",
}); //修改功能

onMounted(() => {
  loadDatas();
});
const loadDatas = async () => {
  let res = await axios.get("/category/list");
  categoryList.value = res.data.rows;
};
const add = async () => {
  let res = await axios.post("category/_token/add", { name: addCategory.name });
  if (res.data.code == 200) {
    loadDatas();
    message.success(res.data.msg);
  } else {
    message.error(res.data.msg);
  }
  showAddModel.value = false;
};
const deleteCategory = async (category) => {
  dialog.warning({
    title: "警告",
    content: "是否要删除",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      let res = await axios.delete(`/category/_token/delete?id=${category.id}`);
      if (res.data.code == 200) {
        loadDatas();
        message.success(res.data.msg);
      } else {
        message.error(res.data.msg);
      }
    },
    onNegativeClick: () => {},
  });
};
const toUpdate = async (category) => {
  showUpdateModel.value = true;
  updateCategory.id = category.id;
  updateCategory.name = category.name;
};
const update = async () => {
  let res = await axios.put("/category/_token/update", {
    id: updateCategory.id,
    name: updateCategory.name,
  });
  if (res.data.code == 200) {
    loadDatas();
    message.success(res.data.msg);
  } else {
    message.error(res.data.msg);
  }
  showUpdateModel.value = false;
};
</script>

<style></style>
