<template>
  <div class="mainPage">
    <el-backtop></el-backtop>
    <div class="container">
      <TopNav />
    <div class="post_main_contain">
      <div class="top_breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{name:'plateContent', params:{plateId:post.plateId,plateName:post.plateName}}">板块名：{{post.plateName}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{post.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <Post :post="post" :evaluate-info="evaluateInfo" :reward-info="rewardInfo" @evaluate="evaluatePost" @replyHandler="replyAction"></Post>
       <b-loading :active.sync="postIsLoading" :can-cancel="true"></b-loading>
      <div class="reply_header">回复</div>
      <div v-if="replys.length === 0" class="no_reply">暂无评论,快来抢1楼吧~</div>
      <div v-else v-for="(reply, index) in replys.slice(0, pageSize)" :key="index" class="reply_body">
        <Reply :reply-info='reply'
               :plate-id="post.plateId"
               :reward-info='rewardInfo'
               :type='type' :role='role'
               :status='rewardInfo.status'
               @replyHandler="replyAction"
               ></Reply>
      </div>
      <div v-if="total > pageSize">
        <el-pagination
        @current-change="currentPageChange"
          small
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>

      <div class="editor_container">
        <div class="editor_header">编辑回复</div>
        <el-input
          placeholder=""
          v-model="input"
          :readonly="true">
        </el-input>
        <Editor class="reply_editor" id="editor" tabindex = "0" v-model='replyContent'></Editor>
      </div>

      <el-button
      size="mini"
      icon="el-icon-s-promotion"
      @click="submitReply"
      class="submint_btn" round>提交</el-button>
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

  import {getPost} from '@/api'
  import {addPostEvaluate} from '@/api'
  import {deletePostEvaluate} from '@/api'
  import {commentList} from '@/api'
  import {submitReply} from '@/api'

  export default {
    data() {
      return {
        input: '',
        upId: 0,
        replyContent: '',
        postIsLoading: true,
        currentPage: 1,
        pageSize: 6,
        total: 0,
        post: {
          author: {
            userId: -1,
          }
        },
        replys:[
         //  {
         //  content: '',
         //  author: {
         //    userId: '',
         //    imgUrl: '',
         //    userName: '',
         //  },
         //  floorNumber: '',
         //  publishTime: '',
         //  upId: '',
         //  upInfo: '',
         //  likeNumber: '',
         //  isFollow: '',

         // },
        ],
        rewardInfo:{},
        evaluateInfo:{
          isEvaluated: '',
          isLoading: '',
          isUp: '',
          ups: '',
        },
      }
    },
    methods: {
      getPostContent() {
        getPost(this.$route.params.postId, this.$store.state.user.userId).then(response => {
          const data = response.data;
          console.log(data)
          if(data.code == '406') {
            this.post = data.info;
            this.post.author.imgUrl = this.CommonUtil.baseUrl + this.post.author.imgUrl;
            this.input = "回复帖子：" + this.post.title;
            if (this.post.tab == "Ask") {
              this.rewardInfo.reward = this.post.reward;
              this.rewardInfo.helpfulNumber = this.post.helpfulNumber;
              this.rewardInfo.helpfulReward = this.post.helpfulReward;
              this.rewardInfo.status = this.post.status;
              this.rewardInfo.restTime = this.post.restTime;
            } else if (this.post.tab == "Share"){
              this.evaluateInfo.ups = this.post.likeNumber;
              this.evaluateInfo.isEvaluated = this.post.isEvaluated;
              this.evaluateInfo.isUp = this.post.isUp;
              this.evaluateInfo.isLoading = false;
            }
            this.postIsLoading = false;
          }
        })
      },
      evaluatePost(type) {
        console.log("home")
        this.evaluateInfo.isLoading = true;
        console.log(this.evaluateInfo)
        if(type == '1') {
          addPostEvaluate(this.$route.params.postId, this.$store.state.user.userId, 0).then(response => {
            const data = response.data;
            if(data.code == '408') {
              console.log("点击like")
              var that = this;
              setTimeout(function () {
                that.evaluateInfo.isLoading = false;
                that.evaluateInfo.ups = 1 + that.evaluateInfo.ups;
                that.evaluateInfo.isEvaluated = true;
                that.evaluateInfo.isUp = true;
              },1200);

            }
          })
        } else if(type == '2') {
          addPostEvaluate(this.$route.params.postId, this.$store.state.user.userId, 1).then(response => {
            const data = response.data;
            if(data.code == '408') {
              console.log("点击dislike")
              var that = this;
              setTimeout(function () {
                that.evaluateInfo.isLoading = false;
                that.evaluateInfo.ups = that.evaluateInfo.ups - 1;
                that.evaluateInfo.isEvaluated = true;
                that.evaluateInfo.isUp = false;
              },1200);
            }
          })
        } else {
          var val = 1;
          if (type == '3') {
            val = 0;
          }
          deletePostEvaluate(this.$route.params.postId, this.$store.state.user.userId, val).then(response => {
            const data = response.data;
            if(data.code == '407') {
              console.log("取消评价")
              var that = this;
              setTimeout(function() {
                that.evaluateInfo.isLoading = false;
                if (val == 0) {
                  that.evaluateInfo.ups = that.evaluateInfo.ups -1;
                } else {
                  that.evaluateInfo.ups = that.evaluateInfo.ups + 1;
                }
                that.evaluateInfo.isEvaluated = false;
                that.evaluateInfo.isUp = false;
              }, 1200)
            }
          })
        }
      },
      getCommentList() {
        commentList(this.$route.params.postId, this.$store.state.user.userId, this.currentPage, this.pageSize).then(response =>{
          const data = response.data;
          console.log(data)
          if (data.code == '603') {
            this.replys = data.info.list;
            this.total = data.info.total;

          }
        })
      },
      currentPageChange(val) {
        this.currentPage = val;
        console.log(val)
        this.getCommentList();
      },
      replyAction(info,upId) {
        this.input = info;
        this.upId = upId;
        console.log(this.upId)
        document.getElementById("editor").focus();
      },
      submitReply(){
        if (this.$store.state.isLogin) {
          if(this.replyContent == '') {
            this.$alert('回复不能为空', '提交错误', {
              confirmButtonText: '确认',
              callback: action => {
                document.getElementById("editor").focus();
              }
            })
          } else {
            submitReply(this.$store.state.user.userId, this.replyContent, this.$route.params.postId, this.upId).then(response => {
              const data = response.data;
              if(data.code == '602') {
                var info = "回复成功";
                this.$router.push({
                  path:'/transition',
                  query: {
                    info: info,
                    postId: this.$route.params.postId,
                    title: this.$route.params.name
                  }
                })
              }
            })
          }
        } else {
          this.CommonUtil.userLoginInfo();
        }
      },
    },
    watch:{
    },
    computed: {
      type: function() {
        return this.post.tab;
      },
      role: function() {
        if (this.post.author.userId == this.$store.state.user.userId) {
          console.log("role为owner");
          return 'owner'
        } else {
          console.log("role为null");
          return 'null'
          }
      }
    },
    components: {
      TopNav,
      Post,
      Reply,
      Editor,
      Footer,
    },
    mounted() {
      this.getPostContent()
      this.getCommentList()
    },
  }

</script>

<style scoped lang="scss">
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
    text-align: center;
    font-weight: bold;
    margin: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    color: $only-read-color;
    border-bottom: 1px solid #e5e5e5;
  }

  .reply_body {
    border-bottom: 1px solid #e5e5e5;
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
  .submint_btn {
    background: -webkit-linear-gradient(
    #990000, #bd5c5c, #bd5c5c, #990000);
    color: white;
    font-weight: bold;
    display:block;
    margin:0 auto;
    margin-top: 2px;
  }

</style>
