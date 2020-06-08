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
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="clickReadedBtn">已 读</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="responseDialogVisible"
      width="25%"
      :before-close="handleResponseClose">
      <template slot="title">
        <span style="font-size: 14px;">回复&nbsp;{{currentTitle}}</span>
        <span class="mail_fromInfo">
          来自
          <LinkUserName :user-name="currentFromUserName" :user-id="currentFromUserId"></LinkUserName>
          &nbsp;&nbsp;{{currentSendTime | timeFormatterToString}}
        </span>
      </template>
      <SendMailForm ref="mailForm" :to-id="currentFromUserId" @send-success="handleResponseClose"></SendMailForm>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="mini" @click="handleResponseClose">取 消</el-button>
      </span>
    </el-dialog>
        <el-radio-group v-model="mailType" size="mini" @change="changeMailType">
          <el-radio-button label="user"><el-badge :is-dot="userNewCount > 0" class="item">用户消息</el-badge></el-radio-button>
          <el-radio-button label="system"><el-badge :is-dot="sysNewCount > 0" class="item">系统消息</el-badge></el-radio-button>
        </el-radio-group>
    <el-table
         :data="mailList"
         style="width: 100%"
         :max-height="350"
         :row-class-name="tableRowClassName"
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
             <el-button v-show="mailType == 'user'" size="mini" type="info" slot="reference" @click="sendMail(scope.row)">回复</el-button>
             <el-popconfirm
               confirmButtonText='确认'
               cancelButtonText='取消'
               icon="el-icon-info"
               iconColor="red"
               title="删除该信息？"
               @onConfirm="clickDeleteMail(scope.$index, scope.row)"
             >
             <el-button
               size="mini"
               type="danger"
               slot="reference"
              >删除</el-button>
             </el-popconfirm>
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
  import SendMailForm from './SendMailForm.vue'

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
        responseDialogVisible: false,
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
         // {
         //   fromId:
         //   fromUserName:
         //   toId:
         //   toUserName:
         //   state:
         //   title:
         //   content:
         //   sendTime:
         // }
        ],
        userMailList: [],
        sysMailList: [],
      }
    },
    methods: {
      loadMail() {
        if (this.mailType == 'user') {
          if (!this.noUserPost && !this.noUserMore) {
            this.currentUserPage++;
            this.getUserMail()
          }
        } else if (this.mailType == 'system') {
          if (!this.noSysPost && !this.noSysMore) {
            this.currentSysPage++;
            this.getSysMail()
          }
        }
      },
      tableRowClassName({row, rowIndex}) {
         row.rowIndex = rowIndex;
         if (row.state == 1) {
           return 'read-row'
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
        getUserMailList(this.$store.state.user.userId, this.currentUserPage, this.pageSize, 3, false, 'low').then(response => {
          const data = response.data;
          if (data.code == '903') {
            this.userMailList = this.userMailList.concat(data.info.list);
            this.noUserMore = data.info.noMore;
            this.noUserPost = data.info.noPost;
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
        getSysMailList(this.$store.state.user.userId, this.currentSysPage, this.pageSize, 3, 'low').then(response => {
          const data = response.data;
          if (data.code == '903') {
            this.sysMailList = this.sysMailList.concat(data.info.list);
            this.noSysMore = data.info.noMore;
            this.noSysPost = data.info.noPost;
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
      clickReadedBtn() {
        if (this.mailList[this.currentRowIndex].state == 0) {
          updateMail(this.currentMailId, 1).then(response => {
            const data = response.data
            if (data.code == '902') {
              this.mailList[this.currentRowIndex].state = 1;
            }
          })
        }
        this.dialogVisible = false
      },
      sendMail(row) {
        this.currentFromUserName = row.fromUserName;
        this.currentFromUserId = row.fromId;
        this.currentSendTime = row.sendTime;
        this.currentTitle = row.title;
        this.currentMailId = row.mailId;
        this.responseDialogVisible = true;

      },
      handleResponseClose() {
        this.responseDialogVisible = false;
        this.$refs.mailForm.resetForm('mailInfo');
      },
      clickDeleteMail(index, row) {
        console.log("nini");
        updateMail(row.mailId, 3).then(response => {
          const data = response.data
          if (data.code == '902') {
            this.$message({
              message: '已删除',
              type: 'success',
              center: true,
            })
            this.mailList.splice(index, 1);
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
      SendMailForm,
    }
  }
</script>

<style lang="scss">
  .el-table .read-row {
      background: #fafafa;
    }
  .mail_from {
    padding: 2px 0 0 4px;
    font-size: 12px;
    color: $only-read-color;
  }
  .mail_fromInfo {
    margin-top: 4PX;
    display: block;
    font-size: 12px;
    color: $only-read-color;
   }
   ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: rgba(240, 240, 240, 1);
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
      border-radius: 10px;
      background-color: rgba(240, 240, 240, .5);
    }
   ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
        background-color: rgba(240, 240, 240, .5);
    }
</style>
