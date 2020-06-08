<template>
  <div class="left-block">

    <h2>
      <i class="el-icon-loading"></i>&nbsp;&nbsp;导航
    </h2>

    <div v-for="navItem in navItems" :key='navItem.id'>
      <h3>{{ navItem.title }}<span class="h3-line"> ———</span></h3>
      <ul>
        <li v-for="item in navItem.list" @click="pageTo(item)">
          <img :src="item.src" alt="" width="15px;" class="left-img">
          <p class="left-p">{{ item.name }}</p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        navItems: [
          {
            id:1,
            title:'热门板块',
            list: [
              {
                  src: require('../../assets/icon/js.png'),
                  name:'前端',
                  url:'/article/js'
              },
              {
                  src: require('../../assets/icon/back.png'),
                  name:'后端',
                  url:'/article/back',

              },
              {
                  src: require('../../assets/icon/ai.png'),
                  name:'人工智能',
                  url:'/article/ai',
              },
              {
                  src: require('../../assets/icon/area.png'),
                  name:'区块链',
                  url:'www.baidu.com'
              },
              {
                  src: require('../../assets/icon/wx.png'),
                  name:'小程序',
                  url:'www.baidu.com'
              },
              {
                  src: require('../../assets/icon/safe.png'),
                  name:'安全',
                  url:'www.baidu.com'
              },
              {
                  src: require('../../assets/icon/ios.png'),
                  name:'ios',
                  url:'www.baidu.com'
              },
              {
                  src: require('../../assets/icon/tool.png'),
                  name:'工具',
                  url:'www.baidu.com'
              },
            ]
          },
        ]
      }
    },
    methods: {
      pageTo(item) {
        this.$router.push(item.url);
      }
    }
  }
</script>

<style>
  .left-block{
   margin: 0px;
   text-align: left;
   float: left;
   background: #fff;
   box-shadow: 0 0 1px #ddd;
  }
  .left-block h2{
    background: #55aaff;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
    border-radius: 6px;
    font-weight: bold;
  }
  .left-block h3{
    font-size: 14px;
    padding: 0 15px 5px 15px;
    color: #212121;
  }
  .left-block ul{
    padding: 10px 15px;
    text-shadow: 0 0 black;
      background-color: white;
      line-height: 30px;
      color: #757575;
      padding-left: 30p;
      font-size: 14px;
  }
  .left-block li {
    padding: 7px;
    border-radius: 10px;
  }
  .left-block li:hover {
    background-color: #e4f8e9;
    cursor: pointer;
  }
  .h3-line{
    color: #d4d4d4;
  }
  .left-img{
    display:inline-block;
    vertical-align: middle;
  }
  .left-p{
    display: inline-block;
    margin-left: 10px;
  }
</style>
