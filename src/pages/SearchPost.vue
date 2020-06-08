<template>
  <div class="mainPage">
    <div class="container">
      <div class="search_text">
        <span>帖子搜索</span>
      </div>
      <div class="search_container">
        <el-input placeholder="请输入搜索内容" v-model="searchString" class="input-with-select">
          <el-select v-model="searchType" slot="prepend" placeholder="请选择" style="width: 100px;">
            <el-option label="标题" value="1"></el-option>
            <el-option label="正文" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="clickSearchBtn"></el-button>
        </el-input>
         <el-table
            :data="postList"
            style="width: 100%; margin-top: 8px;"
            height="500"
            max-height="500"
            @row-click="clickToPostContent"
            v-el-table-infinite-scroll="loadPost">
            <el-table-column min-width="100%">
              <template slot="header" slot-scope="scope">
                <span>搜索结果</span>
                <el-dropdown size="small" @command="handleTypeChange" trigger="click"
                style="float: right; font-size: 12px; font-weight: normal; font-family: Microsoft Yahei;">
                  <span class="el-dropdown-link">
                    排序：{{sortType}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="发布时间">发布时间</el-dropdown-item>
                    <el-dropdown-item command="回复时间">回复时间</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
              <template slot-scope="scope">
                <div class="search_post_list">
                  <div>
                    <span  class="serach_post_title">{{scope.row.title}}</span>
                    <PostTag :put-top="scope.row.putTop" :put-good="scope.row.putGood" :tab="scope.row.tab"></PostTag>
                  </div>
                  <ul>
                    <li>&nbsp;发布于{{ scope.row.publishTime | timeFormatterToString()}}</li>
                    <li>&nbsp;作者：
                    <LinkUserName :user-name="scope.row.authorName" :user-id="scope.row.authorId"></LinkUserName>
                    </li>
                    <li>&nbsp;{{scope.row.visitNumber | numberFormatter()}}次浏览</li>
                    <li>&nbsp;{{scope.row.replyNumber | numberFormatter()}}次回复</li>
                    <li>&nbsp;来自 {{scope.row.plateName}}&nbsp;{{scope.row.tab | tabFormatter}}</li>
                    <li>&nbsp;上一次回复{{ scope.row.replyTime | timeFormatterToLast()}}</li>
                  </ul>
                  <div class="serch_post_content" v-html="scope.row.content"></div>
                </div>
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
      <Footer />
    </div>
  </div>
</template>

<script>
  import elTableInfiniteScroll from 'el-table-infinite-scroll'
  import TopNav from "../components/TopNav.vue"
  import Footer from "../components/Footer.vue"
  import LinkUserName from "../components/common/LinkUserName.vue"
  import PostTag from '../components/post/PostTag.vue'
  import { searchPost } from '@/api'
  export default {
    directives: {
      'el-table-infinite-scroll':elTableInfiniteScroll
    },
    data() {
      return {
        searchString: '',
        searchType: '1',
        isLoading: false,
        sortType: '发布时间',
        currentPage: 1,
        pageSize: 8,
        noMore: false,
        noPost: false,
        postList: [],
      }
    },
    methods: {
      loadPost() {
        if (!this.noPost && !this.noMore && this.searchString !== '') {
		  this.currentPage++
          this.getSearchPost()
        }
      },
      clickSearchBtn() {
        if (this.searchString !== '') {
          this.currentPage = 1;
          this.postList = [];
          this.getSearchPost()
        } else {
          this.$alert("搜索内容为空","失败",{
            confirmButtonText: "确认",
          })
        }
      },
      getSearchPost() {
        this.isLoading = true;
        if (this.searchString !== '') {
          this.$route.params.key = this.searchString;
          this.$route.params.type = this.searchType;
          searchPost(this.searchString, this.searchType, this.sortType, this.currentPage, this.pageSize).then(response => {
            const data = response.data;
            if (data.code == '413') {
              this.postList = this.postList.concat(data.info.list);
              console.log(this.postList);
              this.noMore = data.info.noMore;
              this.noPost = data.info.noPost;
              this.isLoading = false;
            }
          })
        } else {
          this.$alert("搜索内容为空","失败",{
                      confirmButtonText: "确认",
          })
        }
      },
      handleTypeChange(command) {
        if (this.sortType !== command) {
            this.sortType = command;
            this.clickSearchBtn();
        }
      },
      clickToPostContent(row) {
        let routeUrl = this.$router.resolve({
             name:'postContent',
             params:{postId:row.postId, name:row.title}
           });
        window.open(routeUrl.href, '_blank');
      },
    },
    mounted() {
      this.searchString = this.$route.params.key;
      this.getSearchPost()
    },
    components: {
      Footer,
      LinkUserName,
      PostTag,
    }
  }

</script>

<style>
  .search_text {
    font-weight: bold;
    font-size: 22px;
    text-align: center;
    padding: 8px 0 8px;
  }
  .search_container {
    width: 70%;
    margin: auto;
  }

  .search_post_list ul{
    list-style: none;
    margin: 6px;
    border-bottom: #e5e5e5 solid 1px;
  }
  .search_post_list li {
    display: inline-block;
    font-size: 12px;
    color: #838383;
  }
  .serach_post_title {
    font-size: 24px;
    font-weight: bold;
    padding-top: 8px;
    margin-left: 6px;
  }

  .serch_post_content {
    height: 80px;
    overflow: hidden;
    padding: 4px 0 0 4px;
  }

  .append_text {
    font-size: 12px;
    text-align: center;
    color: #838383;
    padding-top: 4px;
    padding-bottom: 4px;
  }

</style>
