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
               <AvatarUserName size="medium" :url="scope.row.imgUrl" :user-name="scope.row.userName" :user-id="scope.row.toId"></AvatarUserName>
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
                 <p class="only_read">等待验证</p>
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
  
  import {getApplyList} from '@/api'
  
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
        applyList:[],
      }
    },
    methods: {
      loadApply() {
        if (!this.noPost && !this.noMore) {
		  this.currentPage++;
          this.getApply()
        }
      },
      getApply() {
        this.isLoading = true;
        console.log("请求申请");
        getApplyList(this.$store.state.user.userId, this.currentPage, this.pageSize).then(response => {
          const data = response.data;
          if (data.code == '809') {
            this.applyList = this.applyList.concat(data.info.list);
            this.noMore = data.info.noMore;
            this.noPost = data.info.noPost;
            this.isLoading = false;
            this.newCount = data.info.newCount;
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
      showContent(row, column) {
        if (column.index < 2) {
          this.currentContent = row.content
          this.applyContentDialogVisible = true
        }
      },
      tableRowClassName({row, rowIndex}) {
         if (row.state != 0) {
           return 'read-row'
         }
      },
    },
    components: {
      AvatarUserName,
    },
    mounted() {
      this.getApply()
    }
  }
</script>

<style>
</style>
