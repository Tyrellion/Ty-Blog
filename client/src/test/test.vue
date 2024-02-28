<template>
  <div @click="test">this is test page</div>
</template>

<script setup>
import { inject } from "vue";

const axios = inject("axios");
const test = () => {
  axios({
    method: "POST",
    url: "http://localhost:8080/category/_token/add",
    headers: {
      token: "eabb0523-7b68-42af-8ab5-3671ed45eb50",
    },
    data: {
      name:"2-28测试test1"
    },
  }).then((res) => {
    console.log(res.data);
  });
  alert("worked");
};
</script>

<style></style>
<!-- <template>
  <div class="nav_fixed">
    <div class="nav">
      <div class="menu">
        <n-grid :x-gap="6" cols="6" item-responsive>
          <n-grid-item span="1"> <p class="tesdt">13</p></n-grid-item>
          <n-grid-item span="1"> <p>三四</p></n-grid-item>
          <n-grid-item span="1"> <p>五六我</p></n-grid-item>
          <n-grid-item span="1"> <p>三四</p></n-grid-item>
          <n-grid-item span="1"> <p>仨打是</p></n-grid-item>
          <n-grid-item span="1"> <p>三四</p></n-grid-item>
        </n-grid>
      </div>
      <div class="search">
        <n-input
          class="search-box"
          v-model:value="value"
          type="text"
          placeholder="请输入搜索内容"
        />
      </div>
    </div>
  </div>
<div class="boss">

  <div class="content">
    <n-grid :x-gap="12" cols="8" item-responsive>
      <n-grid-item class="l_content" span=" 8 1280:6">
        <div class="light-green">
          0～400px：不显示<br />
          400～600px：占据空间 1<br />
          600～800px：占据空间 2<br />
          800px 以上：占据空间 3
        </div>
        <n-card title="超大卡片" size="huge">
    卡片内容
  </n-card>
        <n-card title="超大卡片" size="huge" hoverable > 卡片内容 </n-card>
      </n-grid-item>
      <n-grid-item class="r_content" span="0 1280:2">
        <div class="green">2</div>
      </n-grid-item>
    </n-grid>
  </div>
</div>
</template>

<script setup>
import page1 from "./menu/page1.vue";
</script>

<style lang="less">
.zhanwei {
height: 150vh; //<p class="zhanwei">123</p>
}

.nav {
height: 70px;
background-color: #ffffff;
display: flex;
}
.menu {
background-color: lightgreen;
flex: 1;
div {
  p {
    background-color: #f2c699;
    height: 70px;
    text-align: center;
    line-height: 70px;
    font-weight: 600;
    font-size: 1.125rem;
    overflow: hidden; //暂时设置为这个后面试试直接消除文字？
  }
}
}
.search {
background-color: rgb(119, 119, 151);
height: 70px;
width: 200px;
display: flex; //使得search-box搜索框居中
justify-content: center;
align-items: center;
}
.light-green {
/* display: flex;
align-items: center;
justify-content: center; */
height: 200px;
background-color: lightgreen;
//background-image: url(../../img/左.png);
margin-top: 20px;
margin-bottom: 20px;
}
.n-card{
margin-top: 20px;
margin-bottom: 20px;
}
.green {
/*  display: flex;
align-items: center;
justify-content: center; */
height: 200px;
background-color: darkgreen;
background-image: url(../../img/右.png);
}

.boss {
background-color: pink;
width: 100vw;
max-width: 100% //消除1280px一下出现的宽度滑动条
;
}
@media (min-width: 1280px) {
.boss {
  width: 1280px;
  margin: 0 auto;
}
}
</style>
 -->
