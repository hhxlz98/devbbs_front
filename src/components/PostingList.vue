<template>
  <div v-loading="isLoading" class="postList">
    <div class="posts">
      <ul>
        <li>
          <div class="headBar">
            <span @click="changeTo('All')" :class="{isActive:isShow === 'All'}">全部</span>
            <span @click="changeTo('Good')" :class="{isActive:isShow === 'Good'}">精华</span>
            <span @click="changeTo('Share')" :class="{isActive:isShow === 'Share'}">分享</span>
            <span @click="changeTo('Ask')" :class="{isActive:isShow === 'Ask'}">问答</span>

            <el-dropdown style="float: right; margin-right: 4px;"  @command="toPublishPost">
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

        </li>

        <li v-for="post in postList" class="mainList">
          <div>
          <span class="leafMainPost">
            <PostTag :put-top="post.putTop" :put-good="post.putGood" :tab="post.tab"></PostTag>
            <router-link :to="{name:'postContent', params:{postId:post.postId, name:post.title}}">
              <span class="postTitle"> {{ post.title | stringLengthConversion(56) }}</span>
            </router-link>
          </span>

          <div class="postInfo">
            <div class="authorName">
              <LinkUserName :userName="post.authorName" :userId="post.authorId"></LinkUserName>
            </div>
            <div class="infoNumber">
              <span class="replyNumber">{{ post.replyNumber }} </span> / {{ post.visitNumber }}
            </div>

            <div class="lastReply"> {{ post.replyTime | timeFormatterToLast }}</div>
          </div>
        </div>
        </li>

        <div v-if="!postList.length > 0" class="no_post">
        暂无帖子~
        </div>
      </ul>
    </div>
    <el-pagination
      @current-change="currentPageChange"
      style="padding: 4px 0 4px;"
      background
      layout="prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize">
    </el-pagination>

  </div>
</template>

<script>
  import PostTag from './post/PostTag.vue'
  import LinkUserName from './common/LinkUserName.vue'
  import { getPostList } from '@/api'
  export default {
    data() {
      return {
        isLoading: false,
        isShow: 'All',
        total: 100,
        currentPage: 1,
        pageSize: 10,
        postList: [

        ],
      }
    },
    methods: {
      changeTo(value) {
        if (this.isShow != value) {
          this.isShow = value;
          this.getList();
        }

      },
      currentPageChange(val) {
        this.currentPage = val;
        this.getList();
      },
      toPublishPost(command) {
        if (this.$store.state.isLogin) {
          if (command == 'a')
            this.$router.push({name:'publishPost',
                               params:{type:'Share', plateId:this.$route.params.plateId},
                               })
          else if (command == 'b')
            this.$router.push({name:'publishPost',
                               params:{type:'Ask', plateId:this.$route.params.plateId}
                              })
        } else {
          this.CommonUtil.userLoginInfo();
        }

      },
      getList() {
        this.isLoading = true;
        getPostList(this.$route.params.plateId, this.isShow,
                    this.currentPage, this.pageSize).then(response => {
                      const data = response.data;
                      console.log(data);
                        if(data.code == "403") {
                          this.postList = data.info.list;
                          this.total = data.info.total;
                          this.isLoading = false;
                        }
                      })

      },
    },
    mounted() {
      this.getList()

    },
    components: {
      PostTag,
      LinkUserName,
    }
  }
</script>

<style scoped lang="scss">
  .postList {
    background-color: #ffffff;
  }

  .posts {
    margin-top: 10px;
    min-height: 450px;
    border-bottom: 1px solid #e5e5e5;
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
    border-bottom: 1px solid #f0f0f0;
  }
  .mainList:hover {
    background-color: #f5f5f5;
  }
  .mainList span {
    line-height: 30px;
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

  .authorName {
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
    color: $only-read-color;
    font-size: 12px;
  }

  .no_post {
    text-align: center;
    color: $only-read-color;
    font-weight: bold;
    font-size: 14px;
    margin: 122px 0 2px 8px;
  }



</style>
