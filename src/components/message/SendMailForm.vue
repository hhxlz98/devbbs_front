<template>
  <el-form ref="mailInfo" :model="mailInfo" :rules="rules" size="mini" label-position="top">
    <el-form-item label="标题" prop="title">
        <el-input v-model="mailInfo.title" placeholder="请输入标题"></el-input>
    </el-form-item>
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
  import {sendMail} from '@/api'
  export default {
    data() {
      return {
        mailInfo: {
          title: '',
          content: '',
        },
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
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
        sendMail(this.$store.state.user.userId, this.toId, this.mailInfo.title, this.mailInfo.content).then(response => {
          const data = response.data;
          if (data.code == '901') {
            this.$message({
              message: '发送成功',
              type: 'success',
              center: true
            })
            this.$emit('send-success');
          } else {
            this.$message({
              message: '发送失败',
              type: 'error',
              center: true
            })
          }
        })
      },
    },
    props:['toId'],

  }
</script>

<style>
</style>
