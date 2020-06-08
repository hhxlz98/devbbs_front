<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="25%">
      <template slot="title">
        <span style="font-size: 14px;">{{currentTitle}}</span>
        <span class="mail_fromInfo">
          发给
          <LinkUserName :user-name="currentToUserName" :user-id="currentToUserId"></LinkUserName>
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
        <el-button type="primary" size="mini" @click="dialogVisible = false">确 认</el-button>
      </span>
    </el-dialog>
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
               <span>{{scope.row.toUserName}}&nbsp;&nbsp;</span>
               <span>{{scope.row.sendTime | timeFormatterToString}}</span>
             </div>
           </template>
         </el-table-column>
         <el-table-column
            :index="1"
           width="150">
           <template slot-scope="scope">
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
            <p v-if="noMore && !noPost">已无更多</p>
         </div>
       </el-table>
  </div>
</template>

<script>
  import elTableInfiniteScroll from 'el-table-infinite-scroll'
  import LinkUserName from '../common/LinkUserName.vue'

  import {getSendedMailList} from '@/api'
  import {updateMailFromDelete} from '@/api'
  export default {
    directives: {
      'el-table-infinite-scroll':elTableInfiniteScroll
    },
    data() {
      return {
        dialogVisible: false,
        noPost: false,
        noMore: false,
        currentPage: 1,
        pageSize: 6,
        isLoading: false,
        currentContent: '',
        currentTitle: '',
        currentToUserName: '',
        currentToUserId:  0,
        currentSendTime: 0,
        currentMailId: 0,
        mailList:[],
      }
    },
    methods: {
      reRequestMail() {
        this.mailList = [];
        this.currentPage = 1;
        this.getMail()
      },
      showContent(row ,column) {
        if (column.index == 0) {
          this.currentContent = row.content
          this.currentToUserName = row.toUserName;
          this.currentToUserId = row.toId;
          this.currentSendTime = row.sendTime;
          this.currentTitle = row.title;
          this.currentMailId = row.mailId;
          this.dialogVisible =true
        }
      },
      clickDeleteMail(index, row) {
        updateMailFromDelete(row.mailId, true).then(response => {
          const data = response.data
          if (data.code == '904') {
            this.$message({
              message: '已删除',
              type: 'success',
              center: true
            })
            this.mailList.splice(index, 1);
          }
        })
      },
      getMail() {
        this.isLoading = true;
        getSendedMailList(this.$store.state.user.userId, this.currentPage, this.pageSize, false).then(response => {
          const data = response.data;
          if (data.code == '903') {
            this.mailList = this.mailList.concat(data.info.list);
            this.noMore = data.info.noMore;
            this.noPost = data.info.noPost;
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
      loadMail(){
        if (!this.noPost && !this.noMore) {
		  this.currentPage++;
          this.getMail()
        }
      }
    },
    mounted() {
      this.getMail()
    },
    components: {
      LinkUserName,
    }
  }
</script>

<style>
</style>
