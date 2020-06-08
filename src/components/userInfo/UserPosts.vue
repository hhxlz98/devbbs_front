<template>
  <div>
    <el-dialog
      :visible.sync="postEditorDialogVisible"
      :before-close="handleClose"
      width="60%"
      center>
      <template slot="title">
        <span>帖子编辑：{{currentPostTitle | stringLengthConversion(26)}}</span>
      </template>
      <Editor v-model="currentContent" :isClear="isClear"></Editor>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="clickSaveBtn">保存修改</el-button>
      </span>
    </el-dialog>

    <el-table
         :data="postList"
         style="width: 100%"
         :max-height="350"
         v-el-table-infinite-scroll="loadPost">
         <el-table-column
           label="主题"
           min-width="95%">
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
           width="250">
           <template slot-scope="scope">
             <el-button
               size="mini"
               @click="handleLook(scope.$index, scope.row)">查看</el-button>
             <el-button
               v-if="isOwner"
               size="mini"
               type="primary"
               @click="handleEditor(scope.$index, scope.row)">编辑</el-button>
               <el-popconfirm
                 v-if="isOwner"
                 confirmButtonText='确认'
                 cancelButtonText='取消'
                 icon="el-icon-info"
                 iconColor="red"
                 title="确认删除帖子？"
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
            <p v-if="noMore && !noPost && postList.length>0">已无更多</p>
         </div>
        <template slot="empty">
           <i class="fa fa-frown-o" aria-hidden="true">&nbsp;暂无帖子~</i>
         </template>
       </el-table>
  </div>

</template>

<script>
  import elTableInfiniteScroll from 'el-table-infinite-scroll'
  import {userPostList} from '@/api'
  import {updatePostState} from '@/api'
  import { updatePostContent } from '@/api'
  import PostTag from '../post/PostTag.vue'
  import Editor from '../Editor.vue'
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
        postEditorDialogVisible: false,
        currentContent: ' ',
        currentPostId: 0,
        currentPostTitle: '',
        isClear: false,
      }
    },
    methods: {
      loadPost() {
        if (!this.noPost && !this.noMore) {
		  this.currentPage++
          this.getPostList()
        }
      },
      getPostList() {
        console.log("请求postList")
        this.isLoading = true;
        userPostList(this.$route.params.userId, this.currentPage, this.pageSize).then(response => {
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
      handleDelete(index, row) {
        updatePostState(row.postId, 1).then(response => {
          const data = response.data;
          if (data.code == '412') {
            this.$message({
              message: "删除成功",
              type: "success",
              center: true
            })
            this.postList.splice(index, 1);
          } else {
            this.$message({
              message: "删除失败",
              type: "error",
              center: true
            })
          }
        })
      },
      initCurrentPost() {
        this.currentPostId = 0;
        this.currentPostTitle = "";
      },
      handleEditor(index, row) {
        console.log(row);
        this.currentContent = row.content;
        this.currentPostId = row.postId;
        this.currentPostTitle = row.title;
        this.postEditorDialogVisible = true;
      },
      handleClose() {
        this.$confirm('将不会保存修改', '确认关闭', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then( () => {
            this.postEditorDialogVisible = false;
            this.initCurrentPost()
          })
          .catch( () => {
            this.postEditorDialogVisible = true;
          });
      },
      handleLook(index, row) {
        this.$router.push({name:'postContent',params:{postId:row.postId,name:row.title}})
      },
      clickSaveBtn() {
        updatePostContent(this.currentPostId, this.currentContent, this.$store.state.user.userId).then(response => {
          const data = response.data;
          if (data.code == '415') {
            this.$message.success("修改成功");
            this.initCurrentPost()
          }
        })
      }
    },
    mounted() {
      this.getPostList()
    },
    props: ['isOwner'],
    components: {
      PostTag,
      Editor,
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
  .append_text {
    font-size: 12px;
    text-align: center;
    color: $only-read-color;
    padding-top: 4px;
    padding-bottom: 4px;
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
