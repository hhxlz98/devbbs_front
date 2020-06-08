<template>
  <div>
    <el-dialog
      title="申请信息"
      :visible.sync="applyContentDialogVisible"
      width="24%">
      <el-input
        type="textarea"
        autosize
        v-model="currentContent"
        readonly>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="applyContentDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-table
         :data="applyList"
         style="width: 100%"
         :max-height="350"
         :row-class-name="tableRowClassName"
         @cell-click="showContent"
         v-el-table-infinite-scroll="loadApply"
         :show-header="false">
         <template slot="empty">
            <i class="fa fa-frown-o" aria-hidden="true">&nbsp;暂无申请~</i>
          </template>

         <el-table-column
            :index="0"
           min-width="100%">
           <template slot-scope="scope">
<!--             <div class="myInfor_userinfo" @click.stop="clickToUserInfo(scope.row)" id="fr-user">
               <el-avatar size="small" :src="CommonUtil.baseUrl + scope.row.imgUrl"  ></el-avatar>
               <span style="font-size: 12px;">&nbsp;{{scope.row.userName}}</span>
             </div> -->
             <AvatarUserName size="medium" :url="scope.row.imgUrl" :user-name="scope.row.userName" :user-id="scope.row.fromId"></AvatarUserName>
             <div><span>{{scope.row.content | stringLengthConversion(43)}}</span></div>
           </template>
         </el-table-column>
         <el-table-column
            :index="1"
           width="100">
           <template slot-scope="scope">
             <span class="apply_time">{{scope.row.applyTime | timeFormatterToStringForDay}}</span>
           </template>
         </el-table-column>
         <el-table-column
            :index="2"
           width="150">
           <template slot-scope="scope">
             <div v-if="scope.row.state == 0">
               <el-button
                 size="mini"
                 type="success"
                 @click="handleAgree(scope.$index, scope.row)">同意</el-button>
               <el-button
                 size="mini"
                 type="danger"
                 @click="handleDisagree(scope.$index, scope.row)">拒绝</el-button>
             </div>
             <div v-else-if="scope.row.state == 1">
               <p class="only_read">已同意</p>
             </div>
             <div v-else>
               <p class="only_read">已拒绝</p>
             </div>
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
  import AvatarUserName from '../common/AvatarAndUserName.vue'

  import {updateFriendApply} from '@/api'
  import {getAppliedList} from '@/api'

  export default {
    directives: {
      'el-table-infinite-scroll':elTableInfiniteScroll
    },
    data() {
      return {
        isLoading: false,
        noMore: false,
        noPost: false,
        applyContentDialogVisible: false,
        currentContent: '',
        currentPage: 1,
        pageSize: 6,
        newCount: 0,
        applyList: [
          // {
          //     toId：
          //     fromId:
          //     userName:
          //     imgUrl:
          //     content:
          //     state:
          //     applyTime:
          //     friendApplyId:
          // },
        ],

      }
    },
    methods: {
      loadApply() {
        if (!this.noPost && !this.noMore) {
          this.currentPage++;
		  this.getApplyList()
        }
      },
      getApplyList() {
        this.isLoading = true;
        console.log("请求申请");
        getAppliedList(this.$store.state.user.userId, this.currentPage, this.pageSize).then(response => {
          const data = response.data;
          if (data.code == '809') {
            this.applyList = this.applyList.concat(data.info.list);
            this.noMore = data.info.noMore;
            this.noPost = data.info.noPost;
            this.isLoading = false;
            this.newCount = data.info.newCount;
            this.$emit('return-applycount', this.newCount);
          } else {
            console.log(data);
            this.$message({
              message: '请求申请列表失败',
              type: 'error',
              center: true
            })
          }
        })
      },
      tableRowClassName({row, rowIndex}) {
         if (row.state != 0) {
           return 'read-row'
         }
      },
      showContent(row, column) {
        if (column.index < 2) {
          this.currentContent = row.content
          this.applyContentDialogVisible = true
        }
      },
      handleAgree(index, row) {
        updateFriendApply(row.friendApplyId, 1).then(resposne => {
          const data = resposne.data;
          if (data.code == '808') {
            this.applyList[index].state = 1;
            this.$message({
              message: "已同意申请",
              type: 'success',
              center: true
            })
          }
        })
      },
      handleDisagree(index, row) {
        updateFriendApply(row.friendApplyId, 2).then(resposne => {
          const data = resposne.data;
          if (data.code == '808') {
            this.applyList[index].state = 2;
            this.$message({
              message: "已拒绝申请",
              type: 'success',
              center: true
            })
          }
        })
      },
    },
    mounted() {
      this.getApplyList()
    },
    components: {
      AvatarUserName,
    }
  }
</script>

<style lang="scss">
  .apply_time {
    font-size: 13px;
    color: $only-read-color;
  }
  .only_read {
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
