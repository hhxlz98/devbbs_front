<template>
    <el-table
      :data="commentList"
      style="width: 100%"
      :max-height="350"
      v-el-table-infinite-scroll="loadComment">
      <el-table-column
        label="回复内容"
        min-width="60%">
        <template slot-scope="scope">
          <div v-html="scope.row.content" class="comment_content"></div>
          <span class="comment_post">帖子：{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="回复日期"
        min-width="20%">
        <template slot-scope="scope">
          <span class="post_time"> {{scope.row.publishTime | timeFormatterToStringForDay}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="20%">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleLook(scope.$index, scope.row)">查看</el-button>
            <el-popconfirm
              v-if="isOwner"
              confirmButtonText='确认'
              cancelButtonText='取消'
              icon="el-icon-info"
              iconColor="red"
              title="确认删除该评论？"
              @onConfirm="handleDelete(scope.$index, scope.row)"
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
         <p v-if="noMore && !noPost && commentList.length>0">已无更多</p>
      </div>
      <template slot="empty">
         <i class="fa fa-frown-o" aria-hidden="true">&nbsp;暂无回复~</i>
       </template>
    </el-table>
</template>

<script>
  import elTableInfiniteScroll from 'el-table-infinite-scroll'
  import {userCommentList} from '@/api'
  import {updateCommentState} from '@/api'
  export default {
    directives: {
      'el-table-infinite-scroll':elTableInfiniteScroll
    },
    data() {
      return {
        isLoading: false,
        noMore: false,
        noPost: false,
        currentPage: 1,
        pageSize: 4,
        commentList:[],
      }
    },
    methods: {
      loadComment() {
        if(!this.noMore && !this.noPost) {
		  this.currentPage++;
          this.getUserCommentList()
        }
      },
      handleLook(index, row) {
        this.$router.push({name:'postContent',params:{postId:row.postId,name:row.title}})
      },
      handleDelete(index, row) {
        updateCommentState(row.commentId, 1).then(response => {
          const data = response.data;
          if (data.code == '612') {
            this.$message({
              message: "删除成功",
              type: "success",
              center: true
            })
            this.commentList.splice(index, 1);
          } else {
            this.$message({
              message: "删除失败",
              type: "error",
              center: true
            })
          }
        })
      },
      getUserCommentList() {
        this.isLoading = true
        userCommentList(this.$route.params.userId, this.currentPage, this.pageSize).then(response => {
          const data = response.data
          if (data.code == '609') {
            this.commentList = this.commentList.concat(data.info.list)
            this.noMore = data.info.noMore
            this.noPost = data.info.noPost
            this.isLoading = false
          }
        })
      },

    },
    mounted() {
      this.getUserCommentList()
    },
    props:['isOwner'],

  }
</script>

<style scoped>
  .comment_post {
    height: 28px;
    background-color: #e7e9ee;
    font-size: 13px;
    padding: 2px 2px 2px 2px;
  }
  .post_time {
    font-size: 12px;
    color: $only-read-color;
  }
  .comment_content {
    min-height: 40px;
    max-height: 120px;
    padding-left: 4px;
    overflow: scroll;
  }
  ::-webkit-scrollbar {
      display: none;
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

  .append_text {
    font-size: 12px;
    text-align: center;
    color: $only-read-color;
    padding-top: 4px;
    padding-bottom: 4px;
  }
</style>
