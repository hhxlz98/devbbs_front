<template>
  <div>
    <el-dialog
      :visible.sync="addDialogVisible"
      width="25%">
      <template slot="title">
        <span style="font-size: 14px;">为板块：{{currentPlate.plateName}}&nbsp;增加版主</span>
      </template>
      <UserSearch v-loading="addLoading" @select-user="chooseUser"></UserSearch>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="addManage">添 加</el-button>
        <el-button type="danger" size="mini" @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-table
         :data="plateList"
         style="width: 100%;"
         :max-height="maxHeight">
         <el-table-column
           label="板块信息"
           width="100">
           <template slot-scope="scope">
             <el-avatar shape="square" :size="80" fit="contain" :src="CommonUtil.baseUrl + scope.row.imgUrl"></el-avatar>
           </template>
         </el-table-column>
        <el-table-column
           width="100">
           <template slot-scope="scope">
            <p class="plate_name">{{scope.row.plateName}}</p>
           </template>
         </el-table-column>
         <el-table-column
           label="版主列表"
           min-width="100%">
           <template slot-scope="scope">
             <el-tag v-for="(item,index) in scope.row.manageList" :key="index"
             @click="clickTag(item)" @close="clickDelete(item, index, scope.row, scope.$index)"
             closable>
                <img :src="CommonUtil.baseUrl + item.imgUrl" style="vertical-align:middle;width:30px; height:30px; border-radius:50%;"/>
                <span style="font-size: 16px;vertical-align:middle;">{{item.userName}}</span>
             </el-tag>
             <el-button icon="el-icon-plus" size="small" @click="clickAdd(scope.$index, scope.row)" style="margin-left: 10px;"></el-button>
           </template>
         </el-table-column>
         <div slot="append" class="append_text">
            <p v-if="plateList.length>0">已无更多</p>
         </div>
        <template slot="empty">
           <i class="fa fa-frown-o" aria-hidden="true">&nbsp;暂无板块~</i>
         </template>
       </el-table>
  </div>
</template>

<script>
  import UserSearch from '../user/UserSearch.vue';
  import {plateManageList} from '@/api'
  import { addPlateRelate } from '@/api'
  import { deletePlateRelate } from '@/api'
  export default {
    data() {
      return {
        addLoading: false,
        addDialogVisible: false,
        hasChoose: false,
        maxHeight: "100%",
        currentIndex: 0,
        currentPlate: {
          plateName: '',
          palteId: 0,
        },
        currentUser: {
          userName: '',
          userId: '',

        },
        plateList: [
          // {
          //   plateId: 2,
          //   plateName: 'Node.js',
          //   imgUrl: '/plateImg/Vue.js.jpg',
          //   manageList: [
          //     {
          //       userName: 'hhxlz',
          //       imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          //       userId: 3,
          //     },
          //     {
          //       userName: 'xixi',
          //       imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          //       userId: 4,
          //     },
            ],
          }
    },
    methods: {
      clickTag(item) {
        let routeUrl = this.$router.resolve({
             name: "userInfo",
             params:{userId: item.userId, userName: item.userName}
           });
        window.open(routeUrl.href, '_blank');
      },
      clickDelete(item, index, row, rowIndex) {
        deletePlateRelate(item.userId, row.plateId, 1).then(response => {
          const data = response.data;
          if (data.code == '303') {
            this.$message.success("已撤销");
            this.plateList[rowIndex].manageList.splice(index, 1);
          }
        })
      },
      clickAdd(index, row) {
        this.addDialogVisible = true;
        this.currentPlate.plateId = row.plateId;
        this.currentPlate.plateName = row.plateName;
        this.currentIndex = index;
        console.log(row);
      },
      chooseUser(val) {
        this.hasChoose = true;
        this.currentUser.userId = val.userId;
        this.currentUser.userName = val.userName;
        this.currentUser.imgUrl = val.imgUrl;
      },
      addManage() {
        this.addLoading = true;
        addPlateRelate(this.currentUser.userId, this.currentPlate.plateId, 1).then(response => {
          const data = response.data;
          if (data.code == '302') {
            this.$message.success("添加版主成功");
            this.plateList[this.currentIndex].manageList.push(this.currentUser);
          }
          this.addLoading = false;
          this.addDialogVisible = false;
        })
      },
      getList() {
        plateManageList().then(response => {
          const data = response.data;
          if (data.code == '208') {
            this.plateList = data.info;
          }
        })
      }
    },
    mounted() {
      this.getList()
    },
    components: {
      UserSearch,
    },
  }
</script>

<style scoped>
    .el-tag + .el-tag {
      margin-left: 15px;
    }
    .el-tag :hover{
      cursor: pointer;
    }
    .append_text {
      font-size: 12px;
      text-align: center;
      color: $only-read-color;
      padding-top: 4px;
      padding-bottom: 4px;
    }
</style>
