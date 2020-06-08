<template>
  <div>
    <el-form :model="searchInfo" :rules="rules" ref="searchInfo">
     <el-form-item prop="searchString">
        <el-input placeholder="请输入搜索内容" v-model="searchInfo.searchString" class="input-with-select">
            <el-select v-model="searchInfo.searchType" slot="prepend" placeholder="请选择" style="width: 100px;">
              <el-option label="用户ID" value="userId"></el-option>
              <el-option label="用户名" value="userName"></el-option>
              <el-option label="邮箱" value="userEmail"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="clickSearchBtn"></el-button>
        </el-input>
     </el-form-item>
     <el-form-item>
       <el-table
           v-loading="searchLoading"
           :data="userList"
           highlight-current-row
           @current-change="handleCurrentChange"
           :height="200">
           <el-table-column
             label="用户Id"
             width="100">
             <template slot-scope="scope">
               <p>{{ scope.row.userId }}</p>
             </template>
           </el-table-column>
           <el-table-column
             label="用户信息"
             min-width="100%">
             <template slot-scope="scope">
               <AvatarUser size="small" :url="scope.row.imgUrl" :user-name="scope.row.userName" :user-id="scope.row.userId"></AvatarUser>
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
  import AvatarUser from '../../common/AvatarAndUserName.vue'
  import { queryUser } from '@/api'
  export default {
    data() {
      return {
        searchLoading: false,
        searchInfo: {
          searchString: '',
          searchType: 'userId',
        },
        rules: {
          searchString:[{required: true, message: '请输入搜索内容', trigger: 'blur'}],
        },

        userList:[],
      }
    },
    methods: {
      clickSearchBtn() {
        this.$refs['searchInfo'].validate((valid) => {
          if (valid) {
            this.searchUser()
          } else {
            return false;
          }
        });
      },
      searchUser() {
        this.searchLoading = true;
        queryUser(this.searchInfo.searchString, this.searchInfo.searchType).then(response => {
          console.log(response);
          const data = response.data;
          if (data.code == '708') {
            this.userList = data.info;
          }
          this.searchLoading = false;
        })
      },
      handleCurrentChange(val) {
        this.$emit('select-user', val)
      },
    },
    components: {
      AvatarUser
    },
  }
</script>

<style scoped>
  .append_text {
    font-size: 12px;
    text-align: center;
    color: $only-read-color;
    padding-top: 4px;
    padding-bottom: 4px;
  }
</style>
