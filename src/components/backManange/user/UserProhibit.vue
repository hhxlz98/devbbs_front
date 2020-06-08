<template>
  <div class="user_prohibit_container">
    <el-form :model="searchInfo" :rules="rules" ref="searchInfo">
     <el-form-item prop="searchString">
        <el-input placeholder="请输入搜索内容" v-model="searchInfo.searchString" class="input-with-select">
            <el-select v-model="searchInfo.searchType" slot="prepend" placeholder="请选择" style="width: 100px;">
              <el-option label="用户ID" value="userId"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="clickSerachBtn"></el-button>
        </el-input>
     </el-form-item>
     <el-form-item>
       <el-table
           v-loading="searchLoading"
           :data="userPublishList">
           <el-table-column type="expand">
             <template slot-scope="scope">
               <el-table
               :data="scope.row.list"
               style="width: 100%">
                <el-table-column
                  label="处理用户"
                  width="120">
                   <template slot-scope="scope">
                     <LinkUserName :userName="scope.row.dealUserName" :userId="scope.row.dealUserId" v-if="scope.row.dealUserId > 0"></LinkUserName>
                     <span v-else>系统管理员</span>
                   </template>
                 </el-table-column>
                 <el-table-column
                   label="封禁类型"
                   width="100">
                    <template slot-scope="scope">
                      <span v-if="scope.row.type == 0"> 版块禁言 </span>
                      <span v-else> 账号封禁 </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="封禁范围"
                    width="140">
                     <template slot-scope="scope">
                       <span v-if="scope.row.type == 1"> 全板块 </span>
                       <span v-else> {{scope.row.plateName}} </span>
                     </template>
                   </el-table-column>
                 <el-table-column
                 label="生效日期"
                 width="180">
                   <template slot-scope="scope">
                     <span class="data_text">{{scope.row.startTime | timeFormatterToStringForMinute}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column
                 label="持续时间"
                 width="120">
                   <template slot-scope="scope">
                     <span class="data_text">{{scope.row.lastTime | timeFormatterToRest}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column
                 label="操作">
                   <template slot-scope="scope">
                     <span v-if="scope.row.valid">
                       <el-button size="mini" @click="clickCancelBtn(scope.$index, scope.row)">撤销</el-button>
                     </span>
                     <span v-else class="invalid_text">已失效</span>
                   </template>
                 </el-table-column>
               </el-table>
             </template>
           </el-table-column>
           <el-table-column
             label="记录数"
             width="100">
             <template slot-scope="scope">
              <span>{{ scope.row.num }}</span>
             </template>
           </el-table-column>
           <el-table-column
             label="用户Id"
             width="100">
             <template slot-scope="scope">
               <p>{{ scope.row.userId }}</p>
             </template>
           </el-table-column>
           <el-table-column
             label="用户信息"
             width="180">
             <template slot-scope="scope">
               <AvatarUser size="small" :url="scope.row.imgUrl" :user-name="scope.row.userName" :user-id="scope.row.userId"></AvatarUser>
             </template>
           </el-table-column>
           <el-table-column
             label="注册日期"
             width="130">
             <template slot-scope="scope">
               <span class="data_text">{{scope.row.registerTime | timeFormatterToStringForDay}}</span>
             </template>
           </el-table-column>
           <el-table-column
             label="用户积分"
             width="100">
             <template slot-scope="scope">
               <span class="data_text">{{scope.row.points}}</span>
             </template>
           </el-table-column>
           <el-table-column
             label="操作">
             <template slot-scope="scope">
               <el-button size="mini" type="danger" @click="clickBanBtn" :disabled="scope.row.status == 1">封禁</el-button>
             </template>
           </el-table-column>

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
  import LinkUserName from '../../common/LinkUserName.vue'
  import { userAllPunishList } from '@/api'
  import { userBan } from '@/api'
  import { cancelPubish } from '@/api'
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
        userPublishList:[],
      }
    },
    methods: {
      clickSerachBtn() {
        this.$refs['searchInfo'].validate((valid) => {
          if (valid) {
            this.searchUserReport()
          } else {
            return false;
          }
        });
      },
      clickCancelBtn(index, row) {
        cancelPubish(row.punishRecordId, row.userId, row.type).then(response => {
          const data = response.data;
          if (data.code == '1107') {
            this.$message.success("已撤销");
            this.searchUserReport()
          }
        })


      },
      clickBanBtn() {
        userBan(this.searchInfo.searchString).then(response => {
          const data = response.data;
          if (data.code == '1105') {
            this.$message.success("已封禁");
            this.searchUserReport()
          }
        })
      },
      searchUserReport() {
        this.searchLoading = true;
        userAllPunishList(this.searchInfo.searchString).then(response => {
          const data = response.data;
          console.log(data);
          if (data.code == '1106') {
            this.userPublishList = data.info;
          }
          this.searchLoading = false;
        })
      }
    },
    components: {
      AvatarUser,
      LinkUserName,
    }
  }
</script>

<style>
  .user_prohibit_container {
    padding: 8px 8px 8px 8px;
  }
  .data_text {
    font-size: 12px;
    color: #778087;
  }
</style>
