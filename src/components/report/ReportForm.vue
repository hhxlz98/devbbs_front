<template>
  <el-form ref="reportInfo" :model="reportInfo" :rules="reportRules"
  size="mini" label-width="80px" label-position="top">
    <el-form-item label="举报理由" prop="reason">
      <el-radio-group v-model="reportInfo.reason" @change="changeReason">
        <el-radio v-for="(item, index) in reportReasons" :key="index"
        :label="item.value">{{item.label}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="其他理由" v-show="reportInfo.reason == 5" prop="reasonInfo">
      <el-input
        type="textarea"
        autosize
        placeholder="请输入举报理由"
        maxlength="20"
        show-word-limit
        v-model="reportInfo.reasonInfo">
      </el-input>
    </el-form-item>
    <el-form-item style="text-align: center;">
      <el-button type="primary" size="mini" @click="clickSubmintReportBtn">提 交</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
  import { addReport } from '@/api'
  export default {
    data() {
      var validateReasonInfo = (rule, value, callback) => {
              if (value === '' && this.reportInfo.reason === 5) {
                callback(new Error('理由不能为空'));
              } else {
                callback();
              }
            };
      return {
        reportInfo: {
          reason: 0,
          reasonInfo: '垃圾、无意义的内容',
        },
        reportRules: {
          reason: [
            {required: true, message: '请选择举报理由', trigger: 'blur'},
          ],
          reasonInfo: [
            { validator: validateReasonInfo, trigger: 'blur' }
          ]
        },
        reportReasons: [],
        postReasons: [
          {
            label: '垃圾、无意义的帖子内容',
            value: 0,
          },
          {
            label: '帖子涉嫌政治、民族、宗教等敏感信息',
            value: 1,
          },
          {
            label: '帖子包含传销、诈骗、虚假宣传等信息',
            value: 2,
          },{
            label: '帖子包含辱骂、恶意人身攻击信息',
            value: 3,
          },{
            label: '帖子涉嫌恶意误导、歪曲事实',
            value: 4,
          },{
            label: '其它',
            value: 5,
          },
        ],
        commentReasons: [
          {
            label: '回复垃圾、无意义的内容',
            value: 0,
          },
          {
            label: '回复涉嫌政治、民族、宗教等敏感信息',
            value: 1,
          },
          {
            label: '回复包含传销、诈骗、虚假宣传等信息',
            value: 2,
          },{
            label: '回复包含辱骂、恶意人身攻击信息',
            value: 3,
          },{
            label: '回复涉嫌恶意误导、歪曲事实',
            value: 4,
          },{
            label: '其它',
            value: 5,
          },
        ],
        userReasons: [
          {
            label: '该用户对我恶意人身攻击行为',
            value: 0,
          },
          {
            label: '该用户信息包含敏感内容',
            value: 1,
          },
          {
            label: '该用户不是正常用户（机器人等）',
            value: 2,
          },{
            label: '该用户涉嫌诈骗、欺诈等行为',
            value: 3,
          },{
            label: '该用户行为异常，疑似被盗',
            value: 4,
          },{
            label: '其它',
            value: 5,
          },
        ],
      }
    },
    props:['type', 'typeId', 'reportedUserId', 'plateId'],
    methods: {
      clickSubmintReportBtn() {
        this.$refs['reportInfo'].validate((valid) => {
          if (valid) {
            if (this.$store.state.isLogin) {
              this.sendReport()
            } else {
              this.CommonUtil.userLoginInfo();
            }
          } else {
            return false;
          }
        });
      },
      changeReason() {
        var index = this.reportInfo.reason;
        if (index == 5) {
          this.reportInfo.reasonInfo = '';
        } else {
          this.reportInfo.reasonInfo = this.reportReasons[index].label;
        }
      },
      sendReport() {
        addReport(this.$store.state.user.userId, this.reportInfo.reasonInfo, this.reportedUserId, this.type, this.typeId, this.plateId).then(response => {
          const data = response.data;
          if (data.code == '1101') {
            this.$message.success("举报成功")
            this.$emit("report-success")
          }
        })
      }

    },
    mounted() {
      switch(this.type) {
           case 0:
              this.reportReasons = this.postReasons;
              break;
           case 1:
              this.reportReasons = this.commentReasons;
              break;
           case 2:
               this.reportReasons = this.userReasons;
               break;
           default:
              this.reportReasons = this.postReasons;
      }
    },
  }
</script>

<style>
</style>
