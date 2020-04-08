<template>
  <div class="mainPage">
    <div class="container">
      <TopNav />
    <div class="post_main_contain">
      <div class="top_breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <post></post>
      <div class="reply_header">回复</div>
      <!-- <div v-if="replys.length === 0" class="no_reply">暂无评论</div>
      <div v-for="(reply, index) in replys" class="reply_body"></div>
 -->
      <Reply />

      <div class="editor_container">
        <div class="editor_header">编辑回复</div>
        <el-input
          placeholder=""
          v-model="input"
          :readonly="true">
        </el-input>
        <Editor class="reply_editor"></Editor>
      </div>


      </div>
    </div>
    <Footer />
  </div>

</template>

<script>
  import TopNav from "../components/TopNav.vue"
  import Footer from "../components/Footer.vue"
  import Post from '@/components/Post.vue'
  import Reply from '@/components/Reply.vue'
  import Editor from '@/components/Editor.vue'

  export default {
    data() {
      return {
        input: '回复帖子：帮忙进来看一下这个java代码',
        post: {
          title: "帮忙进来看一下这个java代码",
          id: 16546,
          content: '<p>求各位帮忙看一下这个bug，实在不知道是怎么回事🙃<span style="background-color: rgb(139, 170, 74);">其实是我菜</span></p><p>代码：</p><pre><code>@Override<br>    public void addResourceHandlers(ResourceHandlerRegistry registry) {<br>        registry.addResourceHandler("/images/**")<br>                .addResourceLocations("file:D:/SupplychainFile/pic/");<br>    }</code></pre><p><span style="font-weight: bold;">谢谢各位！</span></p><p></p>',
          author: {
            id: 154,
            name: "hhxlz",
          },
          publishTime: 1585717007000,
          visit: 1244,
          tab: 'ask'
        },
        replys:[
          // {
          //   id:54,
          //   userID: 123,
          //   userName: 'hhxlz',
          //   content: "是不是盘符写反了？？",
          //   time: 1585994007000,

          // },
          // {
          //   id:534,
          //   userID: 1223,
          //   userName: '打酱油的',
          //   content: "不懂帮顶",
          //   time: 1585994107000,
          // },

        ],
      }
    },
    methods: {

    },
    components: {
      TopNav,
      Post,
      Reply,
      Editor,
      Footer,
    }
  }

</script>

<style scoped>
  .post_main_contain {
    background-color: white;
    width: 90%;
    margin:0 auto;
    padding: 1px 20px 0 20px;
  }
  .top_breadcrumb {
    margin: 4px 0 4px;
    border: 1px solid #e5e5e5;
    padding: 4px 0 4px 4px;
    background-color: #f8f8f8;
  }
  .reply_header {
    padding-left: 6px;
    line-height: 22px;
    background-color: #cccccc;
    height: 22px;
    font-size: 12px;
    margin-top: 10px;
  }

  .no_reply {
    margin: 10px;
    padding-bottom: 10px;
    font-size: 12px;
    color: #778087;
    border-bottom: 1px solid #e5e5e5;
  }

  .reply_body {
    border-bottom: 1px solid #e5e5e5;
    padding: 0 10px;
  }
  .editor_container {
    border: 1px solid #e5e5e5;
    margin-top: 10px;
  }
  .editor_header {
    padding-left: 6px;
    line-height: 22px;
    background-color: #cccccc;
    height: 22px;
    font-size: 12px;
  }
  .reply_editor {
  }

</style>
