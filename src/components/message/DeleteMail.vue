<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="25%">
      <template slot="title">
        <span style="font-size: 14px;">{{currentTitle}}</span>
        <span class="mail_fromInfo">
          来自
          <LinkUserName :user-name="currentFromUserName" :user-id="currentFromUserId"></LinkUserName>
          &nbsp;&nbsp;{{currentSendTime | timeFormatterToString}}
        </span>
      </template>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2}"
        v-model="currentContent"
        readonly>
      </el-input>
    </el-dialog>
        <el-radio-group v-model="mailType" size="mini" @change="changeMailType">
          <el-radio-button label="user"><el-badge :is-dot="userNewCount > 0" class="item">用户消息</el-badge></el-radio-button>
          <el-radio-button label="system"><el-badge :is-dot="sysNewCount > 0" class="item">系统消息</el-badge></el-radio-button>
        </el-radio-group>
    <el-table
         :data="mailList"
         style="width: 100%"
         :max-height="350"
         @cell-click="showContent"
         v-el-table-infinite-scroll="loadMail"
         :show-header="false">
         <template slot="empty">
            <i class="fa fa-frown-o" aria-hidden="true">&nbsp;暂无消息~</i>
          </template>

         <el-table-column
            :index="0"
           min-width="100%">
           <template slot-scope="scope">
             <p class="mail_title">{{scope.row.title}}</p>
             <div class="mail_from">
               <span>{{scope.row.fromUserName}}&nbsp;&nbsp;</span>
               <span>{{scope.row.sendTime | timeFormatterToString}}</span>
             </div>
           </template>
         </el-table-column>
         <el-table-column
            :index="1"
           width="150">
           <template slot-scope="scope">
             <el-button v-show="mailType == 'user'" size="mini" type="primary" slot="reference" @click="handleResume(scope.$index, scope.row)">恢复</el-button>
           </template>
         </el-table-column>
         <div slot="append" class="append_text">
            <p v-if="isLoading">加载中...</p>
            <p v-if="(noUserMore && !noUserPost && mailType=='user') ||
            (noSysMore && !noSysPost && mailType=='system')">已无更多</p>
         </div>
       </el-table>
  </div>
</template>

<script>
  import elTableInfiniteScroll from 'el-table-infinite-scroll'
  import LinkUserName from '../common/LinkUserName.vue'

  import {getUserMailList} from '@/api'
  import {getSysMailList} from '@/api'
  import {updateMail} from '@/api'
  export default {
    directives: {
      'el-table-infinite-scroll':elTableInfiniteScroll
    },
    data() {
      return {
        mailType: 'user',
        currentUserPage: 1,
        currentSysPage: 1,
        pageSize: 6,
        isLoading: false,
        noUserMore: false,
        noUserPost: false,
        noSysMore: false,
        noSysPost: false,

        dialogVisible: false,
        currentContent: '',
        currentTitle: '',
        currentFromUserName: '',
        currentFromUserId:  0,
        currentSendTime: 0,
        currentMailId: 0,
        currentRowIndex: 0,
        userNewCount: 0,
        sysNewCount: 0,
        mailList: [
        ],
        userMailList: [],
        sysMailList: [],
      }
    },
    methods: {
      loadMail() {
        if (this.mailType == 'user') {
          if (!this.noUserPost && !this.noUserMore) {
            this.getUserMail()
          }
        } else if (this.mailType == 'system') {
          if (!this.noSysPost && !this.noSysMore) {
            this.getSysMail()
          }
        }
      },
      showContent(row ,column) {
        if (column.index == 0) {
          this.currentContent = row.content
          this.currentFromUserName = row.fromUserName;
          this.currentFromUserId = row.fromId;
          this.currentSendTime = row.sendTime;
          this.currentTitle = row.title;
          this.currentMailId = row.mailId;
          this.dialogVisible =true
        }
      },
      getUserMail() {
        this.isLoading = true;
        getUserMailList(this.$store.state.user.userId, this.currentUserPage, this.pageSize, 3, true, 'on').then(response => {
          const data = response.data;
          if (data.code == '903') {
            this.userMailList = this.userMailList.concat(data.info.list);
            this.noUserMore = data.info.noMore;
            this.noUserPost = data.info.noPost;
            this.currentUserPage++;
            this.userNewCount = data.info.newCount;
            this.$emit('return-mailcount', this.sysNewCount + this.userNewCount);
            if (this.mailType == 'user') {
              this.mailList = this.userMailList;
            }
            this.isLoading = false;
          } else {
            this.$message({
              message: "请求站内信错误",
              type: "error",
              center: true
            });
            this.isLoading = false;
          }
        })
      },
      getSysMail() {
        this.isLoading = true;
        getSysMailList(this.$store.state.user.userId, this.currentSysPage, this.pageSize, 3, 'on').then(response => {
          const data = response.data;
          if (data.code == '903') {
            this.sysMailList = this.sysMailList.concat(data.info.list);
            this.noSysMore = data.info.noMore;
            this.noSysPost = data.info.noPost;
            this.currentSysPage++;
            if (this.mailType == 'system') {
              this.mailList = this.sysMailList;
            }
            this.isLoading = false;
            this.sysNewCount = data.info.newCount;
            this.$emit('return-mailcount', this.sysNewCount + this.userNewCount);

          } else {
            this.$message({
              message: "请求站内信错误",
              type: "error",
              center: true
            });
            this.isLoading = false;
          }
        })
      },
      changeMailType() {
        this.mailList = [];
        if (this.mailType == 'user') {
          this.mailList = this.userMailList;
        } else if (this.mailType == 'system') {
          this.mailList = this.sysMailList;
        }
      },
      handleResume(index, row) {
        updateMail(row.mailId, 2).then(response => {
          const data = response.data
          if (data.code == '902') {
            this.$message({
              message: '已恢复',
              type: 'success',
              center: true,
            })
            this.mailList.splice(index, 1);
          } else {
            this.$message({
              message: '恢复失败',
              type: 'error',
              center: true,
            })
          }
        })
      },
    },
    mounted() {
      this.getUserMail()
      this.getSysMail()
    },
    components: {
      LinkUserName,
      
    }
  }

</script>

<style>
</style>
