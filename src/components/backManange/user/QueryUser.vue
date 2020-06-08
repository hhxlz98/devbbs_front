<template>
  <div class="main_container">
    <el-form :model="searchInfo" :rules="rules" ref="searchInfo">
     <el-form-item prop="searchString">
        <el-input placeholder="请输入搜索内容" v-model="searchInfo.searchString" class="input-with-select">
            <el-select v-model="searchInfo.searchType" slot="prepend" placeholder="请选择" style="width: 100px;">
              <el-option label="用户Id" value="userId"></el-option>
              <el-option label="用户名" value="userName"></el-option>
              <el-option label="邮箱" value="userEmail"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="clickSearchBtn"></el-button>
        </el-input>
     </el-form-item>
     <el-form-item>
       <el-table
           v-loading="loading"
           :data="userList"
           style="width: 100%;"
           :max-height="maxHeight">
           <el-table-column
             label="用户Id"
             width="80">
             <template slot-scope="scope">
               <span>{{ scope.row.userId }}</span>
             </template>
           </el-table-column>
           <el-table-column
             label="头像"
             width="80">
             <template slot-scope="scope">
               <el-avatar shape="square" size="medium" :src="CommonUtil.baseUrl + scope.row.imgUrl"></el-avatar>
             </template>
           </el-table-column>
           <el-table-column
             label="用户名"
             width="140">
             <template slot-scope="scope">
               <span class="user_data">{{ scope.row.userName }}</span>
             </template>
           </el-table-column>
           <el-table-column
             label="邮箱"
             width="180">
             <template slot-scope="scope">
               <span class="user_data">{{ scope.row.userEmail }}</span>
             </template>
           </el-table-column>
           <el-table-column
             label="用户签名"
             width="180">
             <template slot-scope="scope">
               <el-popover
                  placement="bottom-start"
                  width="180"
                  trigger="hover"
                  :content="scope.row.userShow">
                  <span slot="reference">{{ scope.row.userShow | stringLengthConversion(32)}}</span>
                </el-popover>
             </template>
           </el-table-column>
           <el-table-column
             label="用户简介"
             width="240">
             <template slot-scope="scope">
                <el-popover
                   placement="bottom-start"
                   width="240"
                   trigger="hover"
                   :content="scope.row.userIntro">
                   <span slot="reference">{{ scope.row.userIntro | stringLengthConversion(50)}}</span>
                 </el-popover>
             </template>
           </el-table-column>
           <el-table-column
             label="注册时间"
             width="100">
             <template slot-scope="scope">
               <span>{{ scope.row.registerTime | timeFormatterToStringForDay}}</span>
             </template>
           </el-table-column>
           <el-table-column
             label="用户数据"
             width="120">
             <template slot-scope="scope">
               <span class="user_data">发帖数：{{ scope.row.publishCount }}</span>
               <span class="user_data">回复数：{{ scope.row.replyCount }}</span>
             </template>
           </el-table-column>
           <el-table-column
             label="帖子数据数据"
             width="120">
             <template slot-scope="scope">
               <span class="user_data">最佳回答数：{{ scope.row.bestCount }}</span>
               <span class="user_data">精华帖数：{{ scope.row.goodCount }}</span>
             </template>
           </el-table-column>
           <el-table-column
             label="点赞数据"
             width="120">
             <template slot-scope="scope">
               <span class="user_data">帖子获赞：{{ scope.row.postLikeNumber }}</span>
               <span class="user_data">回复获赞：{{ scope.row.commentLikeNumber }}</span>
             </template>
           </el-table-column>
           <el-table-column
             label="积分数"
             width="80">
             <template slot-scope="scope">
               <span>{{ scope.row.points }}</span>
             </template>
           </el-table-column>
           <el-table-column
             label="操作"
             width="100">
             <template slot-scope="scope">
               <el-button
                 size="mini"
                 type="success"
                 @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
             </template>
           </el-table-column>
           <div slot="append" class="append_text">
              <p v-if="userList.length>0">已无更多</p>
           </div>
          <template slot="empty">
             <i class="fa fa-frown-o" aria-hidden="true">&nbsp;暂无用户</i>
           </template>
         </el-table>
     </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import { getUserInfo } from '@/api'
  import { queryUser } from '@/api'
  export default {
    data() {
      return {
        loading: false,
        maxHeight: "100%",
        searchInfo: {
          searchString: '',
          searchType: 'userId',
        },
        rules: {
          searchString:[{required: true, message: '请输入搜索内容', trigger: 'blur'}],
        },
        userList: [
          // {
          //   userId: 3,
          //   userEmail: '2414523432@qq.com',
          //   userName: 'hhxlz',
          //   imgUrl: '/asfds',
          //   userShow: 'niag好噶阿凡地啊打发啊打发撒旦啊的污染要求',
          //   userIntro: 'er让人啊范德萨发哦哦他安排，嘎斯皮欧文， 欧普发，阿萨法撒旦父亲',
          //   registerTime: 1588001441947,
          //   postNumber: 4,
          //   replyNumber: 34,
          //   topNumber: 0,
          //   goodNumber: 1,
          //   postLikeNumber: 33,
          //   replyLikeNumber: 156,
          //   points: 143,
          // },
        ],
      }
    },
    methods: {
      clickSearchBtn() {
        this.loading = true;
        queryUser(this.searchInfo.searchString, this.searchInfo.searchType).then(response => {
          console.log(response);
          const data = response.data;
          if (data.code == '708') {
            var list = data.info;
            for(var j = 0; j < list.length; j++) {
              var userId = list[j].userId;
              getUserInfo(userId, 0).then(response => {
                const data = response.data;
                if (data.code == '701') {
                  console.log(data.info);
                  this.userList.push(data.info)
                }
              })
            }
          }
          this.loading = false;
        })
      },
      requestUserInfo(userId) {
        getUserInfo(userId, 0).then(response => {
          const data = response.data;
          if (data.code == '701') {
            this.userData = data.info;
            console.log(this.userData)
          }
        })
      }
    },
    handleEdit(index, row) {
      
    }
  }
</script>

<style scoped lang="scss">
  .main_container {
    padding: 8px 8px 8px 8px;
  }
  .append_text {
    font-size: 12px;
    text-align: center;
    color: $only-read-color;
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .user_data {
    display: inline-block;
    font-size: 13px;
    color: $only-read-color;
  }
</style>
