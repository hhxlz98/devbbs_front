<template>
  <div class="left-block">

    <h2>
      <i class="el-icon-loading"></i>&nbsp;&nbsp;合作链接
    </h2>

    <div v-for="corItem in corItems" :key='corItem.id'>
      <h3>{{ corItem.title }}<span class="h3-line"> ———</span></h3>
      <ul>
        <li v-for="item in corItem.list" @click="adTo(item)">
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
        corItems: [
          {
            id:'1',
            title: "友情赞助",
            list: [
              {
                name:'百度',
                url:'http://www.baidu.com/'
              },
              {
                name:'腾讯',
                url:'http://qq.com/'
              }
            ]

          },
        ]
      }
    },
    methods: {
      adTo(item) {
        window.open(item.url,'_blank')
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
