<template>
  <div id="app" v-cloak>
    <router-view/>
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide (){
       return {
         reload:this.reload
       }
    },
    data(){
      return {
         isRouterAlive:true
      }
    },
    methods:{
      reload (){
         this.isRouterAlive = false
         this.$nextTick(function(){
            this.isRouterAlive = true
         })
      }
    },
}
</script>

<style lang="scss">
  @import './style/_style.scss';
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
