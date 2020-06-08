<template>
  <el-table
      :data="userList"
      max-height="350">
      <el-table-column
        label="头像"
        min-width="10%">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="50"  :fit="fit" :src="CommonUtil.baseUrl + scope.row.imgUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
        min-width="40%">
        <template slot-scope="scope">
          <p class="user_name"> {{ scope.row.userName }}<span class="user_id"> (UID: {{scope.row.userId}})</span></p>
        </template>
      </el-table-column>
      <el-table-column
        label="添加时间"
        min-width="20%">
        <template slot-scope="scope">
          <p class="post_time"> {{ scope.row.addTime | timeFormatterToStringForDay}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="30%">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="clickLookProfile(scope.$index, scope.row)">查看资料</el-button>

              <el-popconfirm
                confirmButtonText='确认'
                cancelButtonText='取消'
                icon="el-icon-info"
                iconColor="red"
                title="确认移除？"
                @onConfirm="deleteForBlacklist(scope.$index, scope.row)"
              >
              <el-button
                size="mini"
                type="danger"
                slot="reference">移除列表</el-button>
              </el-popconfirm>
        </template>
      </el-table-column>
      <div slot="append" class="append_text">
         <p v-if="isOver">已无更多</p>
      </div>
     <template slot="empty">
        <i class="fa fa-frown-o" aria-hidden="true">&nbsp;报告,这里没有坏人~</i>
      </template>
    </el-table>
</template>

<script>
  import {userRelateList} from '@/api'
  import {deleteUserRelate} from '@/api'
  export default {
    data() {
      return{
        fit: 'fill',
        userList:[
          // {
          //   userName: 'hhxlz',
          //   userShow: '我要飞得更高! ',
          //   imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          //   addTime: '2020-10-03',
          //   userId: 3

          // },
          // {
          //   userName: 'hhxlz',
          //   userShow: '我要飞得更高! ',
          //   imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          //   addTime: '2020-10-03',
          //   userId: 3
          // },
          // {
          //   userName: 'hhxlz',
          //   userShow: '我要飞得更高! ',
          //   imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          //   addTime: '2020-10-03',
          //   userId: 3
          // },

        ],

      }
    },
    methods: {
      getBlackList() {
        userRelateList(this.$store.state.user.userId, 1).then(response => {
          const data = response.data;
          console.log(data);
          if (data.code == '805') {
            this.userList = data.info
          }
        })
      },
      clickLookProfile(index, row) {
        let routeUrl = this.$router.resolve({
             name: "userInfo",
             params:{userId: row.userId, userName: row.userName}
           });
           window.open(routeUrl.href, '_blank');
      },
      deleteForBlacklist(index, row) {
        deleteUserRelate(this.$store.state.user.userId, row.userId, 1).then(response => {
          const data = response.data
          if (data.code == '803') {
            this.userList.splice(index,1);
            this.$message({
                  message: '移除成功',
                  type: 'success'
            });
          }
        })
      }


    },
    computed: {
      isOver: function(){
        return this.userList.length > 0
      }
    },
    props:[],
    mounted() {
      this.getBlackList()
    },
  }
</script>

<style>
</style>
