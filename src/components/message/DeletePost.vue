<template>
  <el-table
       :data="postList"
       style="width: 100%"
       :max-height="350"
       v-el-table-infinite-scroll="loadPost">
       <el-table-column
         label="主题"
         min-width="100%">
         <template slot-scope="scope">
           <span class="post_title_table">{{ scope.row.title }}</span>
           <PostTag :put-top="scope.row.putTop" :put-good="scope.row.putGood" :tab="scope.row.tab"></PostTag>
           <span class="post_plateName">{{scope.row.plateName}}</span>
         </template>
       </el-table-column>
      <el-table-column
         label=" "
         width="100">
         <template slot-scope="scope">
           <span class="post_data">浏览: {{ scope.row.visitNumber }}</span>
           <span class="post_data">回复: {{ scope.row.replyNumber }}</span>
         </template>
       </el-table-column>
       <el-table-column
         label="发布日期"
         width="100">
         <template slot-scope="scope">
           <span class="post_time">{{scope.row.publishTime | timeFormatterToStringForDay}}</span>
         </template>
       </el-table-column>
       <el-table-column
         label="操作"
         width="150">
         <template slot-scope="scope">
           <el-button
             size="mini"
              type="primary"
             @click="handleResume(scope.$index, scope.row)">恢复</el-button>
         </template>
       </el-table-column>
       <div slot="append" class="append_text">
          <p v-if="isLoading">加载中...</p>
          <p v-if="noMore && !noPost && postList.length>0">已无更多</p>
       </div>
      <template slot="empty">
         <i class="fa fa-frown-o" aria-hidden="true">&nbsp;暂无帖子~</i>
       </template>
     </el-table>
</template>

<script>
  import elTableInfiniteScroll from 'el-table-infinite-scroll'
  import {getUserDeletePostList} from '@/api'
  import {updatePostState} from '@/api'
  import PostTag from '../post/PostTag.vue'
  export default {
    directives: {
      'el-table-infinite-scroll':elTableInfiniteScroll
    },
    data() {
      return {
        currentPage: 1,
        pageSize: 5,
        noMore: false,
        noPost: false,
        isLoading: false,
        postList: [],

      }
    },
    methods: {
      loadPost() {
        if (!this.noPost && !this.noMore) {
          this.currentPage++;
		  this.getPostList()
        }
      },
      getPostList() {
        this.isLoading = true;
        getUserDeletePostList(this.$store.state.user.userId, this.currentPage, this.pageSize).then(response => {
          const data = response.data;
          console.log(data)
          if (data.code == '411') {
            this.postList = this.postList.concat(data.info.list)
            console.log(this.postList)
            this.noMore = data.info.noMore;
            this.noPost = data.info.noPost;
            this.isLoading = false;
          }
        })
      },
      handleResume(index, row) {
        updatePostState(row.postId, 0).then(response => {
          const data = response.data;
          if (data.code == '412') {
            this.$message({
              message: "恢复成功",
              type: "success",
              center: true
            })
            this.postList.splice(index, 1);
          } else {
            this.$message({
              message: "恢复失败",
              type: "error",
              center: true
            })
          }
        })
      },
    },
    mounted() {
      this.getPostList()
    },
    props: ['isOwner'],
    components: {
      PostTag,
    }
  }
</script>

<style>
  .post_title_table {
    display: block;
  }
  .post_data {
    display: block;
    font-size: 12px;
    color: $only-read-color;
  }
  .post_time {
    font-size: 12px;
    color: $only-read-color;
  }
  .post_plateName {
    font-size: 11px;
    display: inline-block;
    float: right;
    margin-right: 24px;
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
