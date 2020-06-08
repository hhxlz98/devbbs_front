<template>
  <div>
    <el-dialog
      :visible.sync="editorDialogVisible"
      width="30%">
      <template slot="title">
        <span style="font-size: 14px;">编辑板块</span>
      </template>
      <EditorPlateForm size="mini" :plateInfo="plateInfo" :plateNameEditable="true" :userId="$store.state.user.userId" @update-success="getInfo"></EditorPlateForm>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="mini" @click="editorDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="reportDialogVisible"
      width="55%">
      <template slot="title">
        <span style="font-size: 14px;">举报处理</span>
      </template>
      <ReportTable :plateId="$route.params.plateId"></ReportTable>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="mini" @click="editorDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <div class="plateInfo">
      <div class="topBar">
        板块信息
        <el-dropdown @command="handleCommand" trigger="click" title="管理"
          style="float: right" v-if="plateInfo.isManage">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="fa fa-pencil-square-o" command='a'>修改信息</el-dropdown-item>
            <el-dropdown-item icon="fa fa-user-times" command='b'>举报处理</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
        <div class="imgContain">
          <el-avatar class="plateImg" shape="square" fit="fill" :src="imgUrl"></el-avatar>
        </div>

        <div class="plateData">
          <span class="plateName">{{plateInfo.plateName}}</span>
          <div class="plateNumber">关注数 {{plateInfo.followNumber | numberFormatter()}}  <br/>帖子数 {{plateInfo.postNumber | numberFormatter()}}</div>

          <div style="text-align:center; margin-top: 3px;">
            <span v-if="plateInfo.isFollow">
              <el-popconfirm
                confirmButtonText='确认'
                cancelButtonText='取消'
                icon="el-icon-question"
                iconColor="red"
                title="取消关注？"
                @onConfirm="disFollow"
              >
                <el-button slot="reference" size="mini" class="disabledColor">已关注</el-button>
              </el-popconfirm>
            </span>
            <span v-else>
              <el-button type="primary" size="mini" @click="follow">+ 关注</el-button>
            </span>
          </div>
        </div>
        <div class="plateIntroduction">
          <span>板块简介</span><br/>
          <span class="introText">{{ plateInfo.plateIntro }}</span>
        </div>
    </div>

  </div>
</template>

<script>
  import {getPlateInfo} from '@/api'
  import {addPlateRelate} from '@/api'
  import {deletePlateRelate} from '@/api'

  import ReportTable from "./report/PlateReportTable.vue"
  import EditorPlateForm from "./backManange/plate/EditorPlateForm.vue"
  export default {
    data() {
      return {
        imgUrl: '',
        editorDialogVisible: false,
        reportDialogVisible: false,
        plateInfo: {},
      }
    },
    methods: {
      getInfo() {
        getPlateInfo(this.$store.state.user.userId, this.$route.params.plateId).then(response => {
          const data = response.data;
          console.log(data)
          if(data.code == "207") {
            this.plateInfo = data.info;
            this.imgUrl = this.CommonUtil.baseUrl + data.info.imgUrl;
          }
        })
      },
      disFollow() {
        if(!this.$store.state.isLogin) {
          this.CommonUtil.userLoginInfo();
        } else {
          var type = 0;
          deletePlateRelate(this.$store.state.user.userId, this.$route.params.plateId, type)
          .then(response => {
            const data = response.data;

            if(data.code == "303") {
              this.$message({
                        message: '取消关注成功',
                        type: 'success'
                      });
              this.plateInfo.isFollow = false;
               this.plateInfo.followNumber -= 1;
            }
          })

        }
      },
      follow() {
        if(!this.$store.state.isLogin) {
          this.CommonUtil.userLoginInfo();
        } else {
          var type = 0;
          addPlateRelate(this.$store.state.user.userId, this.$route.params.plateId, type)
          .then(response => {
            const data = response.data;

            if(data.code == "302") {
              this.$message({
                        message: '关注成功',
                        type: 'success'
                      });
              this.plateInfo.isFollow = true;
              this.plateInfo.followNumber += 1;
            }
          })
        }
      },
      handleCommand(command){
        if(command == 'a') {
          this.editorDialogVisible = true;
        } else if (command == 'b') {
          this.reportDialogVisible = true;
        }
      }

    },
    mounted() {
      this.getInfo()
    },
    components: {
      EditorPlateForm,
      ReportTable,
    },
  }
</script>

<style>
  .plateInfo {
    width: 100%;
    background-color: #ffffff;
    margin-top: 10px;
  }
  .topBar {
    padding: 10px;
    background-color: #f6f6f6;
    height: 36px;
    font-size: 12px;
  }
  .imgContain {
   width: 100px;
   height: 100px;
   display: inline-block;
   margin-top: 6px;
  }
  .plateImg{
    margin-top: 6px;
    margin-left: 4px;
    width: 100%;
    height: 100%;

  }
  .plateData {
    height: 100px;
    width: 55%;
    margin-top: 16px;
    margin-left: 5px;
    float: right;
   }
  .plateName {
    margin-top: 10px;
    margin-left: 5px;
    font-size: 18px;
   }
   .plateNumber {
     font-size: 12px;
     margin-left: 6px;
   }

   .plateIntroduction {
     border-top: 1px solid #e5e5e5;
     margin: 0px 4px;
     padding: 4px 4px;
   }

   .introText {
     font-size: 12px;
   }


</style>
