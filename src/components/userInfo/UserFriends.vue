<template>
  <div>
    <el-dialog
      :visible.sync="sendDialogVisible"
      width="25%"
      :before-close="handleResponseClose">
      <template slot="title">
        <span style="font-size: 14px;">发送站内信</span>
        <LinkUserName :user-name="currentUserName" :user-id="currentUserId"></LinkUserName>
      </template>
      <SendMailForm ref="mailForm" :to-id="currentUserId" @send-success="handleResponseClose"></SendMailForm>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="mini" @click="handleResponseClose">取 消</el-button>
      </span>
    </el-dialog>
    <el-table
        :data="userList"
        max-height="350">
        <el-table-column
          label="头像"
          min-width="10%">
          <template slot-scope="scope">
            <el-avatar shape="square" :size="50"  :fit="fit" :src="CommonUtil.baseUrl + scope.row.imgUrl"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          label="信息"
          min-width="50%">
          <template slot-scope="scope">
            <p class="user_name"> {{ scope.row.userName }}</p>
            <p class="user_showList"> {{ scope.row.userShow }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="40%">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="clickLookProfile(scope.$index, scope.row)">查看资料</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="clickSendMessage(scope.$index, scope.row)">发送消息</el-button>
              <el-popconfirm
                confirmButtonText='确认'
                cancelButtonText='取消'
                icon="el-icon-info"
                iconColor="red"
                title="确认删除该好友？"
                @onConfirm="clickDeleteFriend(scope.$index, scope.row)"
              >
              <el-button
                size="mini"
                type="danger"
                slot="reference"
               >删除好友</el-button>
              </el-popconfirm>

          </template>
        </el-table-column>
        <div slot="append" class="append_text">
           <p v-if="isOver">已无更多</p>
        </div>
       <template slot="empty">
          <i class="fa fa-frown-o" aria-hidden="true">&nbsp;暂无好友,快去申请吧~</i>
        </template>
      </el-table>
  </div>


</template>

<script>
  import {userRelateList} from '@/api'
  import {deleteUserRelate} from '@/api'

  import LinkUserName from '../common/LinkUserName.vue'
  import SendMailForm from '../message/SendMailForm.vue'
  export default {
    data() {
      return{
        currentUserName: '',
        currentUserId: '',
        sendDialogVisible: false,
        fit: "fill",
        userList:[],

      }
    },
    methods: {
      getFriendsList() {
        userRelateList(this.$store.state.user.userId, 0).then(response => {
          const data = response.data
          console.log(data);
          if (data.code == '805') {
            this.userList = data.info;
          }
        })
      },
      clickLookProfile(index, row) {
        let routeUrl = this.$router.resolve({
             name: "userInfo",
             params:{userId: row.userId, userName: row.userName}
           });
           window.open(routeUrl.href, '_blank');
      },
      clickSendMessage(index, row) {
        this.currentUserId = row.userId;
        this.currentUserName = row.userName;
        this.sendDialogVisible = true;

      },
      handleResponseClose() {
        this.sendDialogVisible = false;
        this.$refs.mailForm.resetForm('mailInfo');
      },
      clickDeleteFriend(index, row) {
        deleteUserRelate(this.$store.state.user.userId, row.userId, 0).then(response => {
          const data = response.data
          if (data.code == '803') {
            this.userList.splice(index,1);
            this.$message({
                  message: '删除好友成功',
                  type: 'success'
            });
          }
        })
      },


    },
    computed: {
      isOver: function(){
        return this.userList.length > 0
      }
    },
    props:[],
    mounted() {
      this.getFriendsList()
    },
    components: {
      LinkUserName,
      SendMailForm,
    }
  }
</script>

<style>
  .user_showList {
    font-size: 12px;
    margin-top: 2px;
    margin-left: 6px;
    color: $only-read-color;
  }

</style>
