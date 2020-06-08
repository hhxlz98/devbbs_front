<template>
  <div>
    <el-dialog
      :visible.sync="editorDialogVisible"
      width="30%">
      <template slot="title">
        <span style="font-size: 14px;">编辑板块</span>
      </template>
      <EditorPlateForm size="mini" :plateInfo="currentPlate" :plateNameEditable="false" :userId="0" @update-success="updatePlateInfo"></EditorPlateForm>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="mini" @click="editorDialogVisible = false">取 消</el-button>
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
           min-width="100%">
           <template slot-scope="scope">
            <p class="plate_name">{{scope.row.plateName}}</p>
            <span>简介：{{scope.row.plateIntro}}</span>
           </template>
         </el-table-column>
         <el-table-column
           label="板块数据"
           width="120">
           <template slot-scope="scope">
             <span class="plate_data">关注数: {{ scope.row.followNumber| numberFormatter()}}</span>
             <span class="plate_data">帖子数: {{ scope.row.postNumber | numberFormatter() }}</span>
           </template>
         </el-table-column>
         <el-table-column
           width="170">
           <template slot="header" slot-scope="scope">
             <span>操作</span>
             <el-dropdown size="small" @command="handleTypeChange"
             style="float: right; font-size: 12px; font-weight: normal; font-family: Microsoft Yahei;">
               <span class="el-dropdown-link">
                 {{showType}}<i class="el-icon-arrow-down el-icon--right"></i>
               </span>
               <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item command="已生效">已生效</el-dropdown-item>
                 <el-dropdown-item command="已删除">已删除</el-dropdown-item>
               </el-dropdown-menu>
             </el-dropdown>
           </template>
           <template slot-scope="scope">
             <el-button
               v-if="showType == '已生效'"
               size="mini"
               type="primary"
               @click="handleEditor(scope.$index, scope.row)">编辑</el-button>
               <el-popconfirm
                 v-if="showType == '已生效'"
                 confirmButtonText='确认'
                 cancelButtonText='取消'
                 icon="el-icon-info"
                 iconColor="red"
                 title="确认删除该板块？"
                 @onConfirm="handleDelete(scope.$index, scope.row)"
               >
               <el-button
                 size="mini"
                 type="danger"
                 slot="reference"
                >删除</el-button>
               </el-popconfirm>
               <el-button
                 v-if="showType == '已删除'"
                 size="mini"
                 type="primary"
                 @click="handleResume(scope.$index, scope.row)">恢复</el-button>
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
  import EditorPlateForm from './EditorPlateForm.vue';
  import { backGetPlateList } from '@/api'
  import { changePlateState } from '@/api'
  export default {
    data() {
      return {
        editorDialogVisible: false,
        maxHeight: "100%",
        showType: '已生效',
        currentIndex: 0,
        currentPlate: {
          plateId: 0,
          plateName: '',
          imgUrl: '',
          plateIntro: '',
        },
        plateList: [
          {
            plateId: 1,
            plateName: 'Vue.js',
            imgUrl: '/plateImg/Vue.js.jpg',
            followNumber: 5,
            postNumber: 12,
            plateIntro: "板块的简介零零零零了了了了了",
          },
        ],
      }
    },
    watch: {
      currentPlate(newValue, oldValue) {
        this.currentPlate = newValue
      }
    },
    methods: {
      handleTypeChange(command) {
        if (this.showType !== command) {
          if (command === '已生效') {
            this.showType = '已生效'
            this.getPlate(0)
          } else if (command === '已删除') {
            this.showType = '已删除'
            this.getPlate(1)
          }
        }
      },
      getPlate(val) {
        backGetPlateList(val).then(response => {
          const data = response.data;
          if (data.code == '201') {
            this.plateList = data.info;
          }
        })

      },
      handleEditor(index, row) {
        this.currentIndex = index;
        this.currentPlate.plateId = row.plateId;
        this.currentPlate.plateName = row.plateName;
        this.currentPlate.imgUrl = row.imgUrl;
        this.currentPlate.plateIntro = row.plateIntro;
        this.editorDialogVisible = true;
      },
      updatePlateInfo() {
        let index = this.currentIndex;
        this.plateList[index].plateName = this.currentPlate.plateName;
        this.plateList[index].imgUrl = this.currentPlate.imgUrl;
        this.plateList[index].plateIntro = this.currentPlate.plateIntro;
        this.editorDialogVisible = false;
      },
      handleDelete(index, row) {
        changePlateState(row.plateId, 1).then(response => {
          const data = response.data;
          if (data.code == '204') {
            this.$message({
              message: "删除成功",
              type: "success",
              center: true
            })
            this.plateList.splice(index, 1)
          } else {
            this.$message({
              message: "删除失败",
              type: "error",
              center: true
            })
          }
        })

      },
      handleResume(index, row) {
        changePlateState(row.plateId, 0).then(response => {
          const data = response.data;
          if (data.code == '204') {
            this.$message({
              message: "恢复成功",
              type: "success",
              center: true
            })
            this.plateList.splice(index, 1)
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
      this.getPlate(0)
    },
    components: {
      EditorPlateForm,

    },

  }
</script>

<style scoped lang="scss">
  .plate_name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
  }
  .plate_data {
    font-size: 13px;
    color: $only-read-color;
    display: block;
  }
  .nobb {
    border: 0px;
  }
  .append_text {
    font-size: 12px;
    text-align: center;
    color: $only-read-color;
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
