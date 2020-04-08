<template>
    <div class="main_container">
      <div class="left_container">
        <div class="author_main">
          <router-link :to="{name:'userInfo', params:{userID:post.author.id, userName:post.author.name}}">
            <el-avatar class="author_profile" shape="square" fit="fill" :src="post.author.profileSrc"></el-avatar>
            <p>{{post.author.name}}</p>
          </router-link>
        </div>


      </div>

      <div class="right_container">
        <div class="post_title">{{post.title}}</div>
        <el-dropdown style="float: right; margin: 4px 4px;">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-share">分享</el-dropdown-item>
            <el-dropdown-item icon="el-icon-warning-outline">举报</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <ul>
          <li>. 发布于{{ post.publishTime | timeFormatterToLast()}}</li>
          <li>. 作者：
          <router-link :to="{name:'userInfo', params:{userID:post.author.id, userName:post.author.name}}">
            {{post.author.name}}
          </router-link>
          </li>
          <li>. {{post.visit | numberFormatter()}}次浏览</li>
          <li>. 来自 {{post.tab | tabFormatter}}</li>
        </ul>

        <div class="post_content" v-html="post.content"></div>

        <div class="post_extra">
          <Evaluate v-if="post.tab == 'share'"></Evaluate>
          <reward v-if="post.tab == 'ask'"></reward>
        </div>

      </div>
    </div>


</template>

<script>
  import Evaluate from '@/components/Evaluate.vue'
  import Reward from '@/components/Reward.vue'
  export default {
    data() {
      return {
        post: {
          title: "帮忙进来看一下这个java代码",
          id: 16546,
          content: '<p>求各位帮忙看一下这个bug，实在不知道是怎么回事🙃<span style="background-color: rgb(139, 170, 74);">其实是我菜</span></p><p>代码：</p><pre><code>@Override<br>    public void addResourceHandlers(ResourceHandlerRegistry registry) {<br>        registry.addResourceHandler("/images/**")<br>                .addResourceLocations("file:D:/SupplychainFile/pic/");<br>    }</code></pre><p><span style="font-weight: bold;">谢谢各位！</span></p><p></p>',
          author: {
            id: 154,
            name: "hhxlz",
            profileSrc: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          },
          publishTime: 1585717007000,
          visit: 1244,
          tab: 'ask'
        },
      }
    },
    components: {
      Evaluate,
      Reward,
    }
  }
</script>

<style>
  .main_container {
    border-top: 10px solid #cccccc;
    display: table;
    width: 100%;

  }
  .left_container {
    width: 20%;
    background-color: #eeeeee;
    display: table-cell;
    vertical-align: top;
  }
  .author_main {
    margin-top: 6px;
    text-align: center;
    border-bottom: 1px solid #cccccc;
  }
  .author_main a:hover{
    text-decoration: underline;
  }
  .author_main p {
    color: #000000;
  }
  .author_profile {
    width: 200px;
    height: 200px;
    padding: 1px;
  }
  .right_container {
    width: 100%;
    background-color: white;
    display: table-cell;
    float: right;
    border-bottom: 1px solid #e5e5e5;
  }
  .post_title {
    font-size: 20px;
    font-weight: bold;
    padding-top: 8px;
    margin-left: 6px;
    display: inline-block;
  }
  .right_container ul {
    list-style: none;
    margin: 6px;
  }
  .right_container li {
    display: inline-block;
    font-size: 12px;
    color: #838383;
  }
  .post_content {
    border-top: 1px solid #e5e5e5;
    padding: 10px 10px;
    min-height: 50px;
    height: auto;
  }
  .post_extra {
    margin: 0px 0 4px 6px;

  }
</style>
