<template>
  <div class="boss">
    <div class="nav">
        <div class="menu"></div>
        <div class="search"></div>

     
    </div>
    <div class="content">
      <n-divider>Self 响应式</n-divider>
      <n-grid :x-gap="12" cols="8" item-responsive>
        <n-grid-item span=" 0:8 1500:6">
          <div class="light-green">
            0～400px：不显示<br />
            400～600px：占据空间 1<br />
            600～800px：占据空间 2<br />
            800px 以上：占据空间 3
          </div>
        </n-grid-item>
        <n-grid-item span="0 1600:2">
          <div class="green">2</div>
        </n-grid-item>
      </n-grid>
      <n-divider>Screen 响应式</n-divider>
      <n-grid cols="4" item-responsive responsive="screen">
        <n-grid-item span="0 m:1 l:2">
          <div class="light-green">
            m 以下：不显示<br />
            m 到 l：占据空间 1<br />
            l 以上：占据空间 2
          </div>
        </n-grid-item>
        <n-grid-item span="0 m:1 l:2">
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
.nav {
  height: 70px;
  background-color: #fff;
  display: flex;
}
.menu{
  background-color: lightgreen;
  flex: 1;
}
.search {
 background-color: blue;
 height: 70px;
 width: 200px;
}
.light-green {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: rgba(0, 128, 0, 0.24);
}
.boss {
  background-color: pink;
  width: 1280px;
  margin: 0 auto;
}
</style>
