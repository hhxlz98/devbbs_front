<template>
  <el-table
       :data="infroList"
       style="width: 100%"
       :height="300"
       :max-height="350"
       v-el-table-infinite-scroll="loadInfro"
       :show-header="false">
       <el-table-column
         min-width="100%">
         <template slot-scope="scope">
           <!-- <div class="myInfor_userinfo" @click="clickToUserInfo(scope.row)">
             <el-avatar size="small" :src="CommonUtil.baseUrl + scope.row.imgUrl"  ></el-avatar>
             <span style="font-size: 12px;">&nbsp;{{scope.row.userName}}</span>
           </div> -->
           <AvatarUserName
           size="medium" :url="scope.row.imgUrl" :user-name="scope.row.userName" :user-id="scope.row.userId"
            ></AvatarUserName>
           <p class="to_reply" v-if="scope.row.upId > 0">回复&nbsp;{{scope.row.upUserName}}({{scope.row.floorNumber}}L):</p>
           <div v-html="scope.row.content" class="infor_content"></div>
           <span class="comment_post">{{scope.row.plateName}}
           <i class="fa fa-chevron-right" aria-hidden="true"></i>
           帖子：{{scope.row.title}}</span>
         </template>
       </el-table-column>
       <el-table-column
         width="150">
         <template slot-scope="scope">
           <span class="infro_time">{{scope.row.publishTime | timeFormatterToStringForMinute}}</span>
           <el-button type="text"><i class="fa fa-comment" aria-hidden="true"></i>&nbsp;回复</el-button>
         </template>
       </el-table-column>
       <div slot="append" class="append_text">
          <p v-if="noMore && !noPost">已无更多</p>
          <p v-if="isLoading">加载中...</p>

       </div>
      <template slot="empty">
         <i class="fa fa-frown-o" aria-hidden="true">&nbsp;暂无消息~</i>
       </template>
     </el-table>
</template>

<script>
  import elTableInfiniteScroll from 'el-table-infinite-scroll'
  import AvatarUserName from '../common/AvatarAndUserName.vue'

  import {getMessageList} from '@/api'
  import {getNewMessageCount} from '@/api'

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
        pageSize: 5,
        infroList: [
          // {
          //   imgUrl: '/userImg/1586003018447.jpeg',
          //   userName: 'hhxlz',
          //   userId: 3,
          //   publishTime: 1586416141299,
          //   contenet: "这个问题我也不太清楚",
          //   postId: 3,
          //   postTitle: '帮忙看看这个bug',
          //   plateName: 'Vue.js',
          //   upId: 0,
          //   upInfo: "xixi(3L)"
          // },
        ],

      }
    },
    methods: {
      loadInfro() {
        if (!this.noMore && !this.noPost) {
          this.currentPage++
          this.getInforList()
        }

      },
      clickToUserInfo(row) {
        let routeUrl = this.$router.resolve({
             name: "userInfo",
             params:{userId: row.userId, userName: row.userName}
           });
           window.open(routeUrl.href, '_blank');
      },
      getInforList() {
        this.isLoading = true
        getMessageList(this.$store.state.user.userId, this.currentPage, this.pageSize).then(response => {
          const data = response.data
          console.log("请求info",data);
          if (data.code == '610') {
            this.infroList = this.infroList.concat(data.info.list)
            this.noMore = data.info.noMore
            this.noPost = data.info.noPost
            this.isLoading = false
            this.$emit('return-messagecount', data.info.newCount)
          }
        })

      },
    },
    mounted() {
      this.getInforList()
    },
    components: {
      AvatarUserName,
    }
  }
</script>

<style lang="scss">
  .myInfor_userinfo {
    width: 20%;
    height: 24px;
    display: flex;
    align-items: center;
  }
  .myInfor_userinfo:hover {
    color: #0000FF;
    cursor: pointer;
  }
  .infor_content {
    padding: 4px 0 0 4px;
    min-height: 40px;
    max-height: 120px;
    overflow: scroll;
  }
  .infor_content::-webkit-scrollbar {
      display: none;
  }
  .to_reply {
    font-size: 14px;
    color: #bbbbbb;
    font-weight: bold;
  }
  .infro_time {
    display: block;
    font-size: 12px;
    color: $only-read-color;
  }
  .append_text {
    font-size: 12px;
    text-align: center;
    color: $only-read-color;
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .comment_post {
    background-color: #e7e9ee;
    padding: 4px 4px 4px 4px;
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
