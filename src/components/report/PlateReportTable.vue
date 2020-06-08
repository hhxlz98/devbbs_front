<template>
  <el-table
      :data="reportList"
      height="350"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table
          :data="scope.row.list"
          style="width: 100%">
           <el-table-column
             label="举报用户"
             width="180">
              <template slot-scope="scope">
                <LinkUserName :userName="scope.row.reportUserName" :userId="scope.row.reportId"></LinkUserName>
              </template>
            </el-table-column>

            <el-table-column
            label="举报日期"
            width="180">
              <template slot-scope="scope">
                <span class="data_text">{{scope.row.reportTime | timeFormatterToString}}</span>
              </template>
            </el-table-column>

            <el-table-column
            label="举报理由">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <span>{{scope.row.reportInfo}}</span>
                  <span slot="reference">
                    {{scope.row.reportInfo | stringLengthConversion(30)}}
                  </span>
                </el-popover>
              </template>
            </el-table-column>

          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        label="举报数目"
        width="80">
        <template slot-scope="scope">
          <span class="report_num">{{scope.row.num}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="举报对象"
        width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 0">帖子</span>
          <span v-else-if="scope.row.type == 1">回复</span>
        </template>
      </el-table-column>
      <el-table-column
        label="内容"
        width="100">
        <template slot-scope="scope">
          <el-popover
            placement="top"
            trigger="click">
            <div v-html="scope.row.typeContent.content"></div>
            <el-button size="mini" type="primary" slot="reference">查看</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
      label="作者"
      width="160">
        <template slot-scope="scope">
          <LinkUserName :userName="scope.row.typeContent.userName" :userId="scope.row.typeContent.userId"></LinkUserName>
        </template>
      </el-table-column>
      <el-table-column
      label="账号状态"
      width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.typeContent.userStatus == 0" class="user_status">正常</span>
          <span v-else-if="scope.row.typeContent.userStatus == 1" class="user_status">已封禁</span>
          <el-popover trigger="hover" placement="top" v-else-if="scope.row.typeContent.userStatus == 2">
            <span>{{scope.row.typeContent.forbiddenTime | timeFormatterToRest}}后解除</span>
            <span slot="reference" class="user_status">
              已禁言
            </span>
          </el-popover>
          <span  ></span>
        </template>
      </el-table-column>
      <el-table-column
      label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            slot="reference"
            @click="clickIgnoreBtn(scope.$index, scope.row)"
           >忽略</el-button>
           <el-popover
             placement="top"
             trigger="click">
             <el-form label-position="left" label-width="80px" :model="prohibitForm" size="mini">
               <el-form-item label="禁言时间">
                  <el-select v-model="prohibitForm.lastDay" placeholder="请选择禁言时间" style="width: 85px;">
                       <el-option label="不处罚" :value="0"></el-option>
                       <el-option label="1天" :value="1"></el-option>
                       <el-option label="3天" :value="3"></el-option>
                       <el-option label="7天" :value="7"></el-option>
                       <el-option label="30天" :value="30"></el-option>
                  </el-select>
               </el-form-item>
               <el-form-item label="是否删除">
                 <el-checkbox v-model="prohibitForm.isDelete">删除</el-checkbox>
               </el-form-item>
               <el-form-item label="是否上报">
                 <el-checkbox v-model="prohibitForm.isUpReport">上报</el-checkbox>
               </el-form-item>
               <el-form-item style="text-align:center">
                 <el-button type="primary" @click="clickSubmit(scope.$index, scope.row)">确认</el-button>
               </el-form-item>
             </el-form>
             <el-button size="mini" type="danger" slot="reference" id="deal-btn">处理</el-button>
           </el-popover>

        </template>
      </el-table-column>
      <div slot="append" class="append_text">
         <p v-if="reportList.length > 0">已无更多</p>
      </div>
    </el-table>
</template>

<script>
  import { getReportForPlate } from '@/api'
  import { ignoreReport } from '@/api'
  import { dealReport } from '@/api'
  import LinkUserName from '../common/LinkUserName.vue'
  export default {
    data() {
      return {
        prohibitForm: {
          isDelete: false,
          isUpReport: false,
          lastDay: 1,
        },
        reportList: [
          // {
          //   list: [
          //     {
          //       reportUserName: "hhxlz",
          //       reportInfo: "156",
          //       reportUserId: 3,
          //       reportTime: 1589641146048,
          //     },
          //   ],
          //   typeContent: {
          //     "title": "afs",
          //     "userName": "xixi",
          //     "content": "cccc",
          //   },
          //   type: 0,
          //   typeId: 3,
          // },
        ],
      }
    },
    props: ['plateId'],
    methods: {
      getList() {
        getReportForPlate(this.$store.state.user.userId, this.plateId, false).then(response => {
          const data = response.data;
          console.log(data);
          if (data.code == '1102') {
            this.reportList = data.info;
          }
        })
      },
      clickIgnoreBtn(index, row) {
        ignoreReport(this.$store.state.user.userId, row.type, row.typeId, this.$route.params.plateId).then(response => {
          const data = response.data;
          if (data.code == "1103") {
            this.$message.success("处理成功");
            this.reportList.splice(index, 1);
          }
        })
      },
      clickSubmit(index, row) {
        dealReport(this.$store.state.user.userId, this.$route.params.plateId, row.type, row.typeId, this.prohibitForm.lastDay, this.prohibitForm.isDelete, this.prohibitForm.isUpReport).then(response => {
          const data = response.data;
          if (data.code == '1103') {
            this.$message.success("处理成功");
            var dealButton =document.getElementById("deal-btn");
            dealButton.click();
            this.reportList.splice(index, 1);
            this.prohibitForm.isDelete = false;
            this.prohibitForm.isUpReport = false;
            this.prohibitForm.lastDay = 1;
          }
        })

      },
    },
    mounted() {
      this.getList()
    },
    components: {
      LinkUserName,
    }
  }
</script>

<style>
  .data_text {
    font-size: 12px;
    color: #778087;
  }
  .user_status {
    font-size: 13px;
    font-weight: bold;
    color: #778087;
  }
  .report_num {
    color: #9e78c0;
    font-size: 14px;
  }
  .append_text {
    font-size: 12px;
    text-align: center;
    color: $only-read-color;
    padding-top: 4px;
    padding-bottom: 4px;
  }
</style>
