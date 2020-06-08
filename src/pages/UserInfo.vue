<template>
  <div class="mainPage">
    <el-dialog
      :visible.sync="reportDialogVisible"
      width="25%">
      <template slot="title">
        <span>举报用户：{{userData.userName | stringLengthConversion(16)}}</span>
      </template>
      <ReportForm :type="2" :typeId="userData.userId" :reportedUserId="userData.userId" :plateId="0" @report-success="reportSuccess"></ReportForm>
    </el-dialog>
    <Share :link="link" :shareDialogVisible="shareDialogVisible" @share-close="shareDialogVisible = false"></Share>
    <div class="container">
    <TopNav />
    <div class="userInfo_mainContainer">
      <div class="userInfo_leftContainer">
        <div class="user_profile_container">
          <el-avatar class="user_profile" shape="square" fit="fill" :src="userData.imgUrl"></el-avatar>
        </div>
        <div class="user_toolContainer">

          <el-upload
            v-if="isOwner"
            action="http://localhost:9091/upload/userImg"
            :on-success="handleAvatarSuccess"
            :data="{userId: userData.userId}"
            :limit="1">
            <el-button  type="text" icon="el-icon-upload"> 上传头像</el-button>
          </el-upload>
          <el-button v-else-if="isFriend" type="text" icon="fa fa-commenting-o" @click="sendMessage">  发送消息</el-button>
          <el-button v-else type="text" icon="fa fa-user-plus" @click="clcikAddFriendBtn"> 加为好友</el-button>
          <el-dialog
            title="发送好友申请"
            :visible.sync="friendApplyDialogVisible"
            width="30%">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="applyContent"
              maxlength="30"
              show-word-limit>
            </el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="friendApplyDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="added">发 送</el-button>
            </span>
          </el-dialog>
        </div>
      </div>

      <div class="userInfo_rightContainer">
        <div class="user_topInfo">
          <span class="user_name">{{userData.userName}}</span>
          <span class="user_id"> (UID: {{userData.userId}})</span>
          <span class="user_figure">&nbsp;&nbsp;文章获赞：{{userData.postLikeNumber | numberFormatter}}
                  &nbsp;&nbsp;&nbsp;&nbsp;回复获赞：{{userData.commentLikeNumber | numberFormatter}}</span>
          <div class="user_info_plusBtn">
            <el-button title="分享" type="text" size="mini" @click="shareDialogVisible = true"><i class="fa fa-share-alt" aria-hidden="true"></i></el-button>
            <el-popconfirm
              confirmButtonText='确认'
              cancelButtonText='取消'
              icon="el-icon-info"
              iconColor="red"
              v-if="!isFriend"
              title="确认加入黑名单吗？"
              @onConfirm="addBlacklist"
            >
              <el-button title="加入黑名单" type="text" size="mini" slot="reference"><i class="fa fa-user-times" aria-hidden="true"></i></el-button>
            </el-popconfirm>
            <el-button title="举报" type="text" size="mini" @click="clickReportBtn"><i class="fa fa-exclamation-circle" aria-hidden="true"></i></el-button>
          </div>

          <div class="user_show">个性签名：{{userData.userShow}}
          <el-button v-if="isOwner" @click="userShowDialogVisible = true"
          icon="el-icon-edit" size="mini" type="text" style="margin-left: 4px;">点击修改</el-button></div>
          <el-dialog title="修改签名" :visible.sync="userShowDialogVisible" width="20%">
            <el-input
              type="textarea"
              maxlength="30"
              show-word-limit
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="inputUserShow">
            </el-input>
            <div slot="footer" class="dialog-footer">
              <el-button @click="userShowDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="alterUserShow">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="user_bottomInfo">
          <el-tabs type="border-card">
            <el-tab-pane label="个人资料">
              <UserData :user-data="userData" :is-owner="isOwner"></UserData>
            </el-tab-pane>
            <el-tab-pane label="个人主题">
              <UserPosts :is-owner="isOwner"></UserPosts>
            </el-tab-pane>
            <el-tab-pane label="最近回复">
              <UserComments :is-owner="isOwner"></UserComments>
            </el-tab-pane>
            <el-tab-pane label="好友列表" v-if="isOwner">
              <UserFriends></UserFriends>
            </el-tab-pane>
            <el-tab-pane label="黑名单" v-if="isOwner">
              <UserBlackList></UserBlackList>
            </el-tab-pane>
          </el-tabs>
        </div>


      </div>

    </div>
    <Footer />
    </div>
  </div>

</template>

<script>
  import Share from '../components/common/Share.vue'
  import TopNav from "../components/TopNav.vue"
  import Footer from "../components/Footer.vue"
  import UserData from '../components/userInfo/UserData.vue'
  import UserPosts from '../components/userInfo/UserPosts.vue'
  import UserComments from '../components/userInfo/UserComments.vue'
  import UserFriends from '../components/userInfo/UserFriends.vue'
  import UserBlackList from '../components/userInfo/UserBlackList.vue'
  import ReportForm from '../components/report/ReportForm.vue'

  import {getUserInfo} from '@/api'
  import {updateUserShow} from '@/api'
  import {addUserRelate} from '@/api'
  import {sendFriendApply} from '@/api'

  export default {
    data() {
      return {
        link: '',
        shareDialogVisible: false,
        reportDialogVisible: false,
        inputUserShow:"",
        userShowDialogVisible: false,
        friendApplyDialogVisible: false,
        mailDialogVisible: false,
        applyContent: '',
        isFriend: false,
        isBlack: false,
        userData: {
          userName: 'hhxlz',
          userId: '1',
          userIntro: '',
          userShow: '',
          userSex: '',
          changeCount: '2',
          registerTime: 0,
          publishCount: 0,
          replyCount: 0,
          goodCount: 0,
          bestCount: 0,
          points: 0,
          postLikeNumber: 0,
          commentLikeNumber: 0,
          imgUrl: '',
        },
      }
    },
    methods: {
      added() {
        sendFriendApply(this.$store.state.user.userId, this.userData.userId, this.applyContent).then(response => {
          const data = response.data;
          if (data.code == '806') {
            this.$message({
              message: "申请成功",
              type: "success"
            });
            this.applyContent = '';
          } else if (data.code == '807') {
            this.$message({
              message: "申请已存在",
              type: "warning"
            });
            this.applyContent = '';
          } else {
            this.$message({
              message: "未知错误",
              type: "error"
            });
          }
          this.friendApplyDialogVisible = false;
        })

      },
      addBlacklist() {
        if (this.$store.state.isLogin) {
          addUserRelate(this.$store.state.user.userId, this.userData.userId, 1).then(response => {
            const data = response.data
            if (data.code == '801') {
              this.$message({
                    message: '加入黑名单成功',
                    type: 'success'
              });
            } else if (data.code == '802') {
              this.$message({
                    message: '已在黑名单中',
                    type: 'warning'
              });
          
            }
          })
        } else {
          this.CommonUtil.userLoginInfo();
        }
      },
      handleAvatarSuccess(response) {
        console.log(response)
        const data = response;
        if (data.code == '506'){
          this.$message({
                    message: '修改头像成功',
                    type: 'success'
                  });
          this.userData.imgUrl = data.info;
        }

      },
      alterUserShow() {
        updateUserShow(this.userData.userId, this.inputUserShow).then(response =>{
          const data = response.data;
          if(data.code == '702') {
            this.$message({
                      message: '修改签名成功',
                      type: 'success'
                    });
            this.userData.userShow = this.inputUserShow
            this.inputUserShow = '';
          }
          this.userShowDialogVisible = false
        })
      },
      requestUserInfo() {
        getUserInfo(this.$route.params.userId, this.$store.state.user.userId).then(response => {
          const data = response.data;
          if (data.code == '701') {
            this.userData = data.info;
            this.isFriend = data.info.isFriend
            this.userData.imgUrl = this.CommonUtil.baseUrl + this.userData.imgUrl;
            console.log(this.userData)
            if(this.userData.userShow == '' || !this.userData.userShow) {
              this.userData.userShow = '未设置个性签名'
            }
          }
        })
      },
      clcikAddFriendBtn() {
        if (this.$store.state.isLogin) {
          this.friendApplyDialogVisible = true;
        } else {
          this.CommonUtil.userLoginInfo();
        }
      },
      clickReportBtn() {
        if (this.$store.state.isLogin) {
          this.reportDialogVisible = true;
        } else {
          this.CommonUtil.userLoginInfo();
        }
      },
      reportSuccess() {
        this.reportDialogVisible = false;
      },
    },
    mounted() {
      this.requestUserInfo()
      this.link = window.location.href
    },
    computed: {
      isOwner: function() {
        return this.$route.params.userId == this.$store.state.user.userId
      },
      userLogin () {
        return this.$store.state.isLogin
      },
    },
    watch: {
      userLogin() {
        this.requestUserInfo()
      }
    },

    components: {
      TopNav,
      Footer,
      UserData,
      UserPosts,
      UserComments,
      UserFriends,
      UserBlackList,
      ReportForm,
      Share,
    }
  }
</script>

<style>
  .userInfo_mainContainer {
    border-top: 1px solid #cccccc;
    background-color: white;
    display: table;
    margin-top: 4px;
    width: 100%;
  }

  .userInfo_leftContainer {
    width: 25%;
    display: table-cell;
    vertical-align: top;
  }

  .userInfo_rightContainer {
    width: 100%;
    background-color: white;
    display: table-cell;
    float: right;
  }

  .user_profile_container {
    width: 300px;
    height: 280px;
    border: 1px solid #e5e5e5;
    margin: 8px 0 0 8px;
  }

  .user_profile {
    margin: 10px 25px 0 25px;
    width: 250px;
    height: 250px;
  }

  .user_toolContainer {
    margin:0 auto;
    text-align:center;
  }

  .user_info_plusBtn {
    display: inline-block;
    float: right;
    margin-right: 14px;
  }.el-button {
    margin-right: 2px;
  }

  .user_topInfo {
    margin: 8px 0 0 6px;
  }

  .user_name {
    font-size: 24px;
    font-weight: bold;
  }

  .user_id{
    font-size: 12px;
    color: $only-read-color;
  }

  .user_figure{
    font-size: 24px;
    font-weight: bold;
  }

  .user_show {
    font-size: 14px;
    margin-left: 6px;
    padding-bottom: 2px;
  }

  .user_bottomInfo{
    padding-right: 16px;
  }
</style>
