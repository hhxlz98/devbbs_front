<template>
  <el-row class="layout_container">
    <el-col :span="24"><router-view name="top"></router-view></el-col>
    <el-col :span="24" class="main">
      <router-view name="aside"></router-view>

      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </section>
    </el-col>
    <BackFooter></BackFooter>
  </el-row>
</template>

<script>
  import BackFooter from './BackFooter.vue'
  export default{
    components: {
      BackFooter,
    },
  }
</script>

<style>
  .layout_container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }
  .layout_container .main {
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 50px;
    bottom: 45px;
    overflow: hidden;
  }
  .layout_container .content-container {
    background: #f2f2f2;
    -ms-flex: 1;
    flex: 1;
    overflow-y: auto;
    padding: 0px;
    height: 100%;
  }
  .grid-content {
    border-radius: 2px;
    background-color: #fff;

  }
</style>
