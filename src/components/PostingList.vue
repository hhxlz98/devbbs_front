<template>
  <div v-loading="isLoading" class="postList">
    <div class="posts">
      <ul>
        <li>
          <div class="headBar">
            <span @click="changeTo(1)" :class="{isActive:isShow === 1}">全部</span>
            <span @click="changeTo(2)" :class="{isActive:isShow === 2}">精华</span>
            <span @click="changeTo(3)" :class="{isActive:isShow === 3}">分享</span>
            <span @click="changeTo(4)" :class="{isActive:isShow === 4}">问答</span>

            <el-dropdown style="float: right;"  @command="toPublishPost">
              <span class="el-dropdown-link">
                <i class="el-icon-edit-outline">发帖</i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-share" command="a">发布分享</el-dropdown-item>
                <el-dropdown-item icon="el-icon-question" command="b">发布问答</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </div>
        </li>

        <li class="headTitle">
          <div>
            <span class="leftHeadTitle">文章</span>
            <div class="rightHeadTitle">
            <span style="padding-right: 55px;">作者</span>
            <span style="padding-right: 15px;">回复/浏览量</span>
            <span style="margin-right: 5px;">上一次回复</span>
          </div>
          </div>
<!--          <div class="leftHeadTitle">文章</div>

          <div class="rightHeadTitle">
            <span style="padding-right: 55px;">作者</span>
            <span style="padding-right: 15px;">回复/浏览量</span>
            <span style="margin-right: 5px;">上一次回复</span>
          </div> -->




        </li>

        <li v-for="post in postList" class="mainList">
          <div>
          <span class="leafMainPost">
            <span v-if="post.putTop" class="putTop">置顶</span>
            <span v-if="post.putGood" class="putGood">精华</span>
            <span class="putNormal"> {{ post.postTab | tabFormatter }} </span>
            <router-link :to="{name:'postContent', params:{postId:post.id,name:post.authorName}}">
              <span class="postTitle"> {{ post.title | stringLengthConversion(56) }}</span>
            </router-link>
          </span>




          <div class="postInfo">
            <div class="autherName"> {{ post.authorName }} </div>
            <div class="infoNumber">
              <span class="replyNumber">{{ post.replyCount }} </span> / {{ post.visitCount }}
            </div>

            <div class="lastReply"> {{ post.lastReply | timeFormatterToLast }}</div>
          </div>
        </div>
        </li>

        <li>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="100">
          </el-pagination>
        </li>


      </ul>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        isLoading: false,
        isShow: 1,
        postList: [
          {
            id:131,
            title:"asf我无法安抚啊发射点发asf我无法安抚啊发射点发asf我无法安抚啊发射点发",
            authorName: "hhxlz",
            visitCount: 100,
            replyCount: 188,
            publishTime: 1585707307000,
            lastReply: 1585994007000,
            putGood: true,
            putTop: true,
            postTab: "ask",
          },
          {
            id:546,
            title:"asf22244我无法安抚啊发射点发",
            authorName: "hhxlz",
            visitCount: 100,
            replyCount: 18,
            publishTime: 1585717007000,
            lastReply: 1585917407000,
            putGood: false,
            putTop: true,
            postTab: "ask",
          },
          {
            id:131,
            title:"如何成为一个前端大佬",
            authorName: "hhxlz",
            visitCount: 100,
            replyCount: 188,
            publishTime: 1585707307000,
            lastReply: 1585833907000,
            putGood: false,
            putTop: false,
            postTab: "ask",
          },
          {
            id:131,
            title:"element-ui使用经验分享",
            authorName: "hhxlz",
            visitCount: 100,
            replyCount: 188,
            publishTime: 1585707307000,
            lastReply: 1585233907000,
            putGood: true,
            putTop: false,
            postTab: "share",
          },
          {
            id:131,
            title:"如何快速掌握vue.js?",
            authorName: "hhxlz",
            visitCount: 100,
            replyCount: 188,
            publishTime: 1585707307000,
            lastReply: 1585133907000,
            putGood: false,
            putTop: false,
            postTab: "ask",
          },
          {
            id:131,
            title:"请大佬进来看一下这个bug",
            authorName: "hhxlz",
            visitCount: 100,
            replyCount: 188,
            publishTime: 1585707307000,
            lastReply: 1584833907000,
            putGood: false,
            putTop: false,
            postTab: "ask",
          },
          {
            id:131,
            title:"h5学习分享",
            authorName: "hhxlz",
            visitCount: 100,
            replyCount: 188,
            publishTime: 1585707307000,
            lastReply: 1584633907000,
            putGood: false,
            putTop: false,
            postTab: "share",
          },
        ],
      }
    },
    methods: {
      toPublishPost(command) {
        if (command == 'a')
          this.$router.push({name:'publishPost', params:{type:'Share'}})
        else if (command == 'b')
          this.$router.push({name:'publishPost', params:{type:'Ask'}})
      }
    }

  }
</script>

<style scoped>
  .postList {
    background-color: #ffffff;
  }

  .posts {
    margin-top: 10px;
  }

  ul {
    /* width: 100%; */


  }

  .headBar {
    height: 42px;
    background-color: #f5f5f5;
  }
  .headBar span.isActive {
    color: #ffffff;
    background-color: #80bd01;
  }
  .headBar span {
    font-size: 14px;
    color: #80bd01;
    line-height: 40px;
    cursor: pointer;
    padding: 3px 15px;
    border-radius: 5px;
  }
  .headBar span:hover {
    color: #fff;
    background-color: #80bd01;
  }

  .headTitle {
    height: 25px;
    width: 100%;
    background-color: #e6e6e6;
  }
  .headTitle span {
    font-size: 12px;
    line-height: 25px;
    cursor: default;
  }
  .leftHeadTitle {
    width: 50%;
    max-width: 70%;
    display:inline-block;
    text-align: center;

  }
  .rightHeadTitle{
    float: right;
  }

  .mainList {
    padding: 9px;
    font-size: 15px;
    border-top: 1px solid #f0f0f0;
  }
  .mainList:hover {
    background-color: #f5f5f5;
  }
  .mainList span {
    line-height: 30px;
  }
  .putGood,.putTop {
    background: #80bd01;
    padding: 2px 2px 2px 2px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-right: 3px;
    margin-bottom: 1px;
  }
  .putNormal {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 0px 2px 3px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    margin-right: 7px;
  }

  .leafMainPost{
    width: 70%;
    display:inline-block;
    text-align: left;
  }

  .postTitle {
    line-height: 30px;
  }

  .postInfo {
    float: right;
  }

  .autherName {
    text-align: left;
    width: 86px;
    display: inline-block;
   }

  .infoNumber {
    text-align: left;
    width: 80px;
    font-size: 10px;
    padding-right: 5px;
    display: inline-block;
   }

  .replyNumber {
    color: #9e78c0;
    font-size: 14px;
  }

  a {
    text-decoration: none;
    color: black;
  }
  a:hover {
    text-decoration: underline;
  }


  .lastReply {
    text-align: right;
    width: 50px;
    line-height: 30px;
    display: inline-block;
    white-space: nowrap;
    float: right;
    color: #778087;
    font-size: 12px;
  }





</style>
