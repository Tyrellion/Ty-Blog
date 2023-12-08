<template>
  <div class="boss">
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
    <div class="content">
      <n-divider>Self 响应式</n-divider>
      <n-grid :x-gap="12" cols="8" item-responsive>
        <n-grid-item span=" 8 1280:6">
          <div class="light-green">
            0～400px：不显示<br />
            400～600px：占据空间 1<br />
            600～800px：占据空间 2<br />
            800px 以上：占据空间 3
          </div>
        </n-grid-item>
        <n-grid-item span="0 1280:2">
          <div class="green">2</div>
        </n-grid-item>
      </n-grid>
      <n-divider>Screen 响应式</n-divider>
      <n-grid cols="4" item-responsive responsive="screen">
        <n-grid-item span=" 100:1 800:2">
          <div class="light-green">
            m 以下：不显示<br />
            m 到 l：占据空间 1<br />
            l 以上：占据空间 2
          </div>
        </n-grid-item>
        <n-grid-item span="100:1 600:2">
          <div class="green">2</div>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
  <n-divider>Self 响应式</n-divider>
  <n-grid cols="4" item-responsive>
    <n-grid-item span="0 800:1 1000:2 1200:3">
      <div class="light-green">
        0～400px：不显示<br />
        400～600px：占据空间 1<br />
        600～800px：占据空间 2<br />
        800px 以上：占据空间 3
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">2</div>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import page1 from "./menu/page1.vue";
</script>

<style lang="less">
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
  background-color: blue;
  height: 70px;
  width: 200px;
  display: flex;//使得search-box搜索框居中
  justify-content: center;
  align-items: center;
}
.light-green {
  /* display: flex;
  align-items: center;
  justify-content: center; */
  height: 200px;
  //background-color: rgba(0, 128, 0, 0.12);
  background-image: url(../../img/左.png);
}
.green {
  /*  display: flex;
  align-items: center;
  justify-content: center; */
  height: 200px;
  //background-color: rgba(0, 128, 0, 0.24);
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
