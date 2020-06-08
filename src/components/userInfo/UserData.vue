<template>
  <div class="userData_maincontainer">
    <div class="personal_info">
      <div>
        <span class="info_header">个人信息</span><span class="info_line">&nbsp;&nbsp;————————————————————————————————</span>
      </div>
      <div class="info_table">
        <ul>
          <li>
            <span class="data_header">用户名：</span>
            <span class="user_data">
              {{user.userName}}
              <span>
                <el-button v-if="isOwner"
                :disabled="!user.changeCount > 0"
                class="userName_input"
                icon="el-icon-edit" size="mini" type="text" @click="dialogVisible = true">点击修改（剩余{{user.changeCount}}次)</el-button>
                <el-dialog title="修改用户名" :visible.sync="dialogVisible" width="20%">
                  <el-form size="medium" ref="inputInfo" :model="inputInfo" :rules="rules">
                    <el-form-item prop="inputUserName">
                      <el-input
                        minlength="3"
                        maxlength="8"
                        show-word-limit
                        placeholder="用户名"
                        v-model="inputInfo.inputUserName">
                      </el-input>
                    </el-form-item>
                    <el-form-item style="text-align:center">
                      <el-button type="primary" @click="alterUserName">修改</el-button>
                    </el-form-item>
                  </el-form>

                  <div slot="footer" class="dialog-footer">
                    <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
                  </div>
                </el-dialog>
              </span>
            </span>
            <span> </span>
          </li>
          <li>
            <span class="data_header">UID：</span>
            <span class="user_data">{{user.userId}}</span>
          </li>
          <li>
            <span class="data_header">性别：</span>
            <span class="user_data" v-if="!isOwner" >{{user.userSex | sexTransfrom}}</span>
            <el-select v-else v-model="inputInfo.inputSex" size="mini" class="sex_input" placeholder="">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
          </li>
          <li>
            <span class="data_header">个人简介：</span>
            <el-input
              class="intro_input"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              maxlength="200"
              placeholder="请输入内容"
              :readonly="!isOwner"
              v-model="user.userIntro">
            </el-input>
          </li>
        </ul>
        <el-button v-if="isOwner" @click="saveUserInfo"
        type="primary" size="small" style="display:block; margin:0 auto;margin-top: 6px;" round>保存</el-button>
      </div>


    </div>

    <div class="forum_info">
      <div>
        <span class="info_header">论坛相关</span><span class="info_line">&nbsp;&nbsp;—————————————————————</span>
      </div>
      <div class="info_table">
        <ul>
          <li>
            <span class="data_header">注册时间：</span>
            <span class="user_data">{{user.registerTime | timeFormatterToStringForDay}}</span>
          </li>
          <li>
            <span class="data_header">发帖数：</span>
            <span class="user_data">{{user.publishCount}}</span>
          </li>
          <li>
            <span class="data_header">回复数：</span>
            <span class="user_data">{{user.replyCount}}</span>
          </li>
          <li>
            <span class="data_header">精华数：</span>
            <span class="user_data">{{user.goodCount}}</span>
          </li>
          <li>
            <span class="data_header">最佳回答数：</span>
            <span class="user_data">{{user.bestCount}}</span>
          </li>
          <li>
            <span class="data_header">积分数：</span>
            <span class="user_data">{{user.points}}</span>
          </li>
        </ul>
      </div>

    </div>

  </div>
</template>

<script>
  import {updateUserName} from '@/api'
  import {updateUserInfo} from '@/api'
  import { userNameExist } from '@/api'
  export default {
    data() {
      var validateUserName = (rule, value, callback) => {
              if (value === this.user.userName) {
                callback(new Error('用户名未修改'));
              } else if (value === '') {
                callback(new Error('用户名不能为空'));
              } else {
                userNameExist(value).then(response => {
                  const exist = response.data;
                  if (exist) {
                     callback(new Error('用户名已存在'));
                  } else {
                     callback()
                  }
                })
              }
            };
      return{
        user: {

         },
        inputInfo: {
          inputSex: '',
          inputUserName: '',
        },
        rules: {
          inputUserName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'change'},
            {validator: validateUserName, trigger: 'blur'}
          ]
        },

        options: [
          {
            value: 'man',
            label: '男'
          },
          {
            value: 'woman',
            label: '女'
          },
          {
            value: '-',
            label: '秘密'
          },
        ],
        dialogVisible: false,

      }
    },
    methods: {
      alterUserName() {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updateUserName(this.user.userId, this.inputInfo.inputUserName).then(response => {
              const data = response.data;
              if (data.code == '703') {
                this.user.userName = this.inputInfo.inputUserName;
                this.user.changeCount--;
                this.$message({
                          message: '修改用户名成功',
                          type: 'success'
                        });
              } else if (data.code == '706') {
                this.$message.error("用户名已存在")
              } else if (data.code == '707') {
                this.$message.error("修改次数不足")
              }
              this.dialogVisible = false
            })
          } else {
            return false;
          }
        });
      },
      saveUserInfo() {
        updateUserInfo(this.user.userId, this.inputInfo.inputSex, this.user.userIntro).then(response => {
          const data = response.data;
          if (data.code == '705') {
            this.$message({
                      message: '保存成功',
                      type: 'success'
                    });
          }
        })
      }
    },
    props:['userData', 'isOwner'],
    mounted() {
    },
    watch:{
      userData: {
        handler(newValue, oldValue) {
          this.user = newValue
          if(!this.user.userSex) {
            this.user.userSex = ''
          }
          if (!this.user.userIntro) {
            this.user.userIntro = '暂无'
          }
          this.inputInfo.inputUserName = newValue.userName
          this.inputInfo.inputSex = newValue.userSex
        }
      }
    }


  }
</script>

<style>
  .userData_maincontainer {
    display: table;
    width: 100%;
  }

  .personal_info {
    /* background-color: #000066; */
    width: 55%;
    display: table-cell;
    padding-left: 6px;
  }
  .info_header {
    font-weight: bold;
    font-size: 14px;
  }

  .info_line {
    font-size: 14px;
    color: #eeeeee;
  }

  .info_table {
    margin: 16px 0 0 8px;
  }

  .info_table li{
    padding: 6px 0 6px;
    border-bottom: 1px solid #eeeeee;
    position:relative;
  }
  .data_header {
    color: #778087;
  }
  .user_data {
    position:absolute;
    left: 220px;
  }
  .user_inputData {
    width: 20%;
    position:absolute;
    left: 220px;
  }
  .userName_input {

  }
  .sex_input {
    position:absolute;
    left: 220px;
    width: 60px;
  }
  .intro_input {
    margin-top: 4px;
  }

  .forum_info {
    display: table-cell;
    padding-left: 5%;
    padding-right: 2%;
    /* background-color: #000000; */
  }

</style>
