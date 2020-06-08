<template>
  <el-form ref="mailInfo" :model="mailInfo" :rules="rules" size="small"  label-width="70px" label-position="left"  v-loading="loading">
    <el-row>
      <el-col :span="14">
        <el-form-item label="标题" prop="title">
          <el-input v-model="mailInfo.title" placeholder="请输入标题"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-form-item label="收件人" prop="toId">
          <el-select v-model="mailInfo.toId" placeholder="请选择收件人" no-data-text="暂无好友">
              <el-option
                v-for="item in users"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
                <el-avatar :size="33" fit="fill" :src="CommonUtil.baseUrl + item.imgUrl" style="float: left"></el-avatar>
                <span style="float: right; color: #8492a6; font-size: 13px">{{item.userName}}</span>
              </el-option>
            </el-select>
        </el-form-item>
      </el-col>
    </el-row>



    <el-form-item label="内容" prop="content">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4}"
          placeholder="请输入内容"
          v-model="mailInfo.content"
           maxlength="50"
            show-word-limit>
        </el-input>
    </el-form-item>
     <el-form-item style="text-align:center">
        <el-button type="primary" @click="submitForm('mailInfo')">发送</el-button>
        <el-button @click="resetForm('mailInfo')">重置</el-button>
      </el-form-item>

  </el-form>
</template>

<script>
  import {userRelateList} from '@/api'
  import {sendMail} from '@/api'
  import AvatarUserName from '../common/AvatarAndUserName.vue'
  export default {
    data() {
      return {
        loading: false,
        mailInfo: {
          title: '',
          content: '',
          toId: '',
        },
        users: [
          // {
          //   userName: 'hhxlz',
          //   userId: 3,
          //   imgUrl: '/userImg/1586003018447.jpeg',
          //   value: 3,
          // },
          // {
          //   userName: '阿萨',
          //   userId: 4,
          //   imgUrl: '/userImg/1586003018447.jpeg',
          //   value: 4,
          // },
        ],
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          toId: [
            { required: true, message: '请选择收件人', trigger: 'blur' }
          ],
          content: [
            {required: true, message: '请输入内容', trigger: 'blur'},
            {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
          ]

        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.addMail();
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      addMail(){
        sendMail(this.$store.state.user.userId, this.mailInfo.toId, this.mailInfo.title, this.mailInfo.content).then(response => {
          const data = response.data;
          if (data.code == '901') {
            this.$message({
              message: '发送成功',
              type: 'success',
              center: true
            })
            this.$emit('send-mail-success');
            this.resetForm('mailInfo');
          } else {
            this.$message({
              message: '发送失败',
              type: 'error',
              center: true
            })
          }
          this.loading = false;
        })
      },
      getFriendsList() {
        userRelateList(this.$store.state.user.userId, 0).then(response => {
          const data = response.data
          console.log(data);
          if (data.code == '805') {
            this.users = data.info;
          }
        })
      },
    },
    components: {
      AvatarUserName,
    },
    mounted() {
      this.getFriendsList()
    }
  }
</script>

<style>
</style>
