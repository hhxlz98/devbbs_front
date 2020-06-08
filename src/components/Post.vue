<template>
    <div class="main_container">
      <el-dialog
        :visible.sync="reportDialogVisible"
        width="25%">
        <template slot="title">
          <span>举报帖子：{{post.title | stringLengthConversion(16)}}</span>
        </template>
        <ReportForm :type="0" :typeId="post.postId" :reportedUserId="post.author.userId" :plateId="post.plateId" @report-success="reportSuccess"></ReportForm>
      </el-dialog>
      <Share :link="link" :shareDialogVisible="shareDialogVisible" @share-close="shareDialogVisible = false"></Share>
      <div class="left_container">
        <div class="author_main">
          <router-link target="_blank" :to="{name:'userInfo', params:{userId:post.author.userId, userName:post.author.userName}}">
            <el-avatar class="author_profile" shape="square" fit="fill" :src="post.author.imgUrl"></el-avatar>
            <p>{{post.author.userName}}</p>
          </router-link>
        </div>


      </div>

      <div class="right_container">
        <div class="post_header">
          <span class="post_title">{{post.title}}</span>
          <PostTag :put-top="post.putTop" :put-good="post.putGood" :tab="post.tab"></PostTag>
        </div>
        <div class="post_rightBtn">
          <el-button title="分享" type="text" size="medium" icon="el-icon-share" @click="shareDialogVisible = true"></el-button>
          <el-button title="举报" type="text" size="medium" icon="el-icon-warning-outline" @click="clickReportBtn"></el-button>
        </div>
        <ul>
          <li>&nbsp;发布于&nbsp;{{ post.publishTime | timeFormatterToString()}}</li>
          <li>&nbsp;作者：
          <router-link target="_blank" :to="{name:'userInfo', params:{userId:post.author.userId, userName:post.author.userName}}">
            {{post.author.userName}}
          </router-link>
          </li>
          <li> {{post.visitNumber | numberFormatter()}}次浏览</li>
          <li>&nbsp;来自 {{post.plateName}}&nbsp;{{post.tab | tabFormatter}}</li>
        </ul>

        <div class="post_content" v-html="post.content"></div>

        <div class="post_extra">
          <Evaluate keep-alive v-if="post.tab == 'Share'" :evaluate-info="evaluateInfo" @clickEvaluateAction="evaluateToPost"></Evaluate>
          <reward v-if="post.tab == 'Ask'" :reward-info="rewardInfo" ></reward>
        </div>

        <div class="reply_contain">
          <el-button style="border:none;color: #000000;" type="text" title="回复" icon="el-icon-chat-square" @click="clickReplyButton" circle></el-button>
        </div>

      </div>
    </div>


</template>

<script>
  import Evaluate from '@/components/Evaluate.vue'
  import Reward from '@/components/Reward.vue'
  import PostTag from './post/PostTag.vue'
  import ReportForm from './report/ReportForm.vue'
  import Share from './common/Share.vue'
  export default {
    data() {
      return {
        link: '',
        reportDialogVisible: false,
        shareDialogVisible: false,
      }
    },
    props:['post', 'rewardInfo', 'evaluateInfo'],
    watch: {
     },
    methods: {
      evaluateToPost(val) {
        if (val == '0') {
          this.$emit('evaluate', 1);
        } else if (val == '1') {
          this.$emit('evaluate', 2);
        } else {
          if (this.evaluateInfo.isUp) {
            this.$emit('evaluate', 3);
          } else {
            this.$emit('evaluate', 4);
          }
        }
      },
      clickReplyButton() {
        if (this.$store.state.isLogin) {
          this.$emit('replyHandler', "回复帖子："+ this.post.title, 0);
        } else {
          this.CommonUtil.userLoginInfo();
        }
      },
      reportSuccess() {
        this.reportDialogVisible = false;
      },
      clickReportBtn() {
        if (this.$store.state.isLogin) {
          this.reportDialogVisible = true;
        } else {
          this.CommonUtil.userLoginInfo();
        }
      }

    },
    mounted() {
      this.link = window.location.href
    },
    components: {
      Evaluate,
      Reward,
      PostTag,
      ReportForm,
      Share,
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
  .post_header {
    padding-top: 8px;
    margin-left: 6px;
    display: inline-block;
  }
  .post_title{
    font-size: 20px;
    font-weight: bold;
  }

  .post_rightBtn {
    display: inline-block;
    float: right;
    margin-right: 4px;
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
    min-height: 200px;
    height: auto;
  }
  .post_extra {
    margin: 0px 0 4px 6px;
    display: inline-block;
  }
  .reply_contain {
    float: right;
  }
</style>
