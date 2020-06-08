<template>
  <el-table
      :data="reportList"
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
                <LinkUserName :userName="scope.row.userName" :userId="scope.row.reportUserId"></LinkUserName>
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
        width="180">
        <template slot-scope="scope">
          <span class="report_num">{{scope.row.num}}</span>
        </template>
      </el-table-column>
      <el-table-column
      label="举报用户"
      width="180">
        <template slot-scope="scope">
          <LinkUserName :userName="scope.row.userName" :userId="scope.row.typeId"></LinkUserName>
        </template>
      </el-table-column>
      <el-table-column
      label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            slot="reference"
            @click="clickIgnoreBtn(scope.$index, scope.row)">忽略</el-button>
           <el-button size="mini" type="danger"
           @click="clickBanBtn(scope.$index, scope.row)">
             封禁</el-button>
        </template>
      </el-table-column>
      <div slot="append" class="append_text">
         <p v-if="reportList.length > 0">已无更多</p>
      </div>
    </el-table>
</template>

<script>
  import { userReportList } from '@/api'
  import { ignoreReport } from '@/api'
  import { userBan } from '@/api'
  import LinkUserName from '../../common/LinkUserName.vue'
  export default {
    data() {
      return {
        reportList: [],
      }
    },
    methods: {
      clickIgnoreBtn(index, row) {
        ignoreReport(0, row.type, row.typeId, 0).then(response => {
          const data = response.data;
          if (data.code == "1103") {
            this.$message.success("处理成功");
            this.reportList.splice(index, 1);
          }
        })
      },
      clickBanBtn(index, row) {
        userBan(row.typeId).then(response => {
          const data = response.data;
          if (data.code == '1105') {
            this.$message.success("封禁成功");
            this.reportList.splice(index, 1);
          }
        })


      },
      getUserReportList() {
        userReportList(false).then(response => {
          const data = response.data;
          console.log(data);
          if (data.code == '1104') {
            this.reportList = data.info;
          }
        })
      }
    },
    mounted() {
      this.getUserReportList()
    },
    components: {
      LinkUserName,
    }
  }
</script>

<style>
  .append_text {
    font-size: 12px;
    text-align: center;
    color: $only-read-color;
    padding-top: 4px;
    padding-bottom: 4px;
  }
</style>
