<template>
  <article class="media reply_all">
    <el-dialog
      :visible.sync="reportDialogVisible"
      width="25%">
      <template slot="title">
        <span>举报用户{{reply.author.userName | stringLengthConversion(16)}}的回复</span>
      </template>
      <ReportForm :type="1" :typeId="reply.commentId" :reportedUserId="reply.author.userId" :plateId="plateId" @report-success="reportSuccess"></ReportForm>
    </el-dialog>
    <Share :link="link" :shareDialogVisible="shareDialogVisible" @share-close="shareDialogVisible = false"></Share>
    <figure class="media-left author_info">
      <router-link target="_blank" :to="{name:'userInfo', params:{userId:reply.author.userId, userName:reply.author.userName}}">
        <el-avatar :size="50" :src="this.CommonUtil.baseUrl + reply.author.imgUrl"></el-avatar>
        <p>{{reply.author.userName}}</p>
      </router-link>
    </figure>

    <div class="media-content reply_main">
      <div class="reply_info">
        <span>{{reply.floorNumber}}楼</span>
        <span> {{reply.publishTime | timeFormatterToString}}</span>
      </div>

      <div class="icon_btn">
        <el-button class="like_button" title="赞同" @click="clickLikeButton":class="{liked: reply.isFollow}" type= "text" size="mini" icon="el-icon-caret-top">{{reply.likeNumber}}</el-button>
      </div>

      <div class="reply_content">
        <p class="to_reply" v-if="reply.upId > 0">回复 {{reply.upInfo}}:</p>
        <div v-html="reply.content" style="margin-left: 6px;"></div>
        <div v-if="type == 'Ask' && (reply.best || reply.helpful)" style="margin-top: 10px; margin-left: 4px;">
          <span class="reply_reward">
            <span v-if="reply.best">最佳回答奖励:+{{reward.reward}}积分</span>
            <span v-else-if="reply.helpful">热心回答奖励:+{{reward.helpfulReward}}积分</span>
          </span>
        </div>
      </div>
      <div class="reply_tool">
        <el-dropdown trigger="click" title="更多" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-share" command='a'>分享</el-dropdown-item>
            <el-dropdown-item icon="el-icon-warning-outline" command='b'>举报</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown v-if="plus" title="悬赏分配" @command="clickAssignButton" trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-plus el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='0'>最佳回答</el-dropdown-item>
            <el-dropdown-item command='1'>热心助人</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button title="回复" type="text" style="border:none; color: #000000;" icon="el-icon-chat-square" size="small" @click="clickReplyButton" circle></el-button>
      </div>
    </div>
  </article>
</template>

<script>
  import ReportForm from './report/ReportForm.vue'
  import Share from './common/Share.vue'
  import {likeComment} from '@/api'
  import {unlikeComment} from '@/api'
  import {assignReward} from '@/api'
  export default {
    data() {
      return {
        link: '',
        shareDialogVisible: false,
        reportDialogVisible: false,
        reply: {
          content: '',
          author: {
            userId: '',
            imgUrl: '',
            userName: '',
          },
          floorNumber: '',
          publishTime: '',
          upId: '',
          upInfo: '',
          likeNumber: '',
          isFollow: '',
        },
        reward: {
          bestReward: '',
          helpfulReward: '',
        },
        // type:'',
        // role:'',
        // status: '',
      }
    },
    props: {
      replyInfo:{
        type: Object,
        default:()=>{}
      },
      rewardInfo: {
        type: Object,
        default:()=>{}
      },
      type: {
        type: String,
      },
      role: {
        type: String,
      },
      status: {
        type: Number,
      },
      plateId: {
        type: Number,
      }
    },
    watch:{
      'replyInfo.likeNumber': {
        handler (newValue, oldValue) {
          this.reply.likeNumber = newValue;
        },
      },
      'replyInfo.isFollow': {
        handler (newValue, oldValue) {
          this.reply.isFollow = newValue;
        },
      },
      replyInfo: {
        handler(newValue, oldValue) {
          this.reply = newValue
        }
      }
    },
    methods: {
      clickLikeButton() {
        if(!this.$store.state.isLogin) {
          this.CommonUtil.userLoginInfo();
        } else {
          var type = 0;
          if (this.reply.isFollow) {
            type = 1;
          }
          if (type == 0) {
            likeComment(this.reply.commentId, this.$store.state.user.userId, 0).then(response => {
              const data = response.data;
              if (data.code == '604') {
                this.reply.likeNumber += 1;
                this.reply.isFollow = true;
              }
            })
          } else {
            unlikeComment(this.reply.commentId, this.$store.state.user.userId, 0).then(response => {
              const data = response.data;
              if (data.code == '605') {
                this.reply.likeNumber -= 1;
                this.reply.isFollow = false;
              }
            })
          }
        }
      },
      clickAssignButton(type) {
        assignReward(this.reply.postId, this.reply.commentId, type).then(response => {
          const data = response.data;
          var info = '';
          if (data.code == '606') {
            info = "已分配最佳奖励"
          } else if (data.code == '607') {
            info = "已分配热心奖励"
          } else if (data.code == '608') {
            info = "热心奖励已无"
          }
          this.$router.push({
            path:'/transition',
            query: {
              info: info,
              url: this.$route.path,
            }
          })
        })
      },
      clickReplyButton() {
        if (this.$store.state.isLogin) {
          var info = "回复："+this.reply.author.userName+"("+this.reply.floorNumber + "L)";
          this.$emit('replyHandler',info, this.reply.commentId);
        } else {
          this.CommonUtil.userLoginInfo();
        }
      },
      handleCommand(command) {
        if (command == 'a') {
          this.shareDialogVisible = true;
        } else if (command == 'b') {
          if (this.$store.state.isLogin) {
            this.reportDialogVisible = true;
          } else {
            this.CommonUtil.userLoginInfo();
          }
        }
      },
      reportSuccess() {
        this.reportDialogVisible = false;
      }
    },
    computed: {
      plus: function(){
        // console.log(this.role, this.type, this.status, this.reply.best, this.reply.helpful)
        if (this.role == 'owner' && this.type == 'Ask' && this.status == 0 && !this.reply.best && !this.reply.helpful &&this.reply.author.userId != this.$store.state.user.userId) {
          return true;
        } else {
        return false;
        }
      },
    },
    mounted() {
      this.reply = this.replyInfo;
      this.reward = this.rewardInfo;
      this.link = window.location.href
    },
    components: {
      ReportForm,
      Share,
    }
  }
</script>

<style scoped>
  .reply_all {
    border-bottom: 1px solid #cccccc;
    background-color: #eeeeee;
  }
  .reply_main {
    background-color: white;
    margin-left: -14px;
    padding-left: 4px;
  }
 .author_info {
   font-size: 12px;
   text-align: center;
   padding: 8px 4px 0 4px;
   width: 100px;
  }
  .author_info p {
    color: #000000;
  }
  .author_info p:hover {
    color: #0000FF;
  }
  .author_info a:hover{
    text-decoration: underline;
  }

  .reply_info {
    display: inline-block;
    font-size: 12px;
    color: #838383;
    height: 26px;
    line-height: 26px;
  }

  .icon_btn {
    float: right;
  }
  .like_button {
    color: #949494;
    margin-right: 4px;
   }
   .like_button:hover{
     color: #8d9eff;
   }
   .liked {
     color: #0084FF;
   }
  .reply_content {
    min-height: 80px;
    padding-top: 4px;
    border-top: 1px solid #cccccc;
  }
  .to_reply {
    font-size: 16px;
    color: #bbbbbb;
    font-weight: bold;
  }
  .reply_tool {
    text-align: right;
  }
  .reply_reward {
    border: 1px solid #000000;
    border-radius: 30px;
    padding: 4px;
    box-shadow: 2px 2px 2px #888888;
    font-size: 13px;
  }
</style>
