<template>
  <div>
    <div class="header_container">
      <div class="logo_container">
        <img src="../assets/logo.png" width="55" height="45" style="vertical-align: middle;">
        <span class="logo_word">后台管理系统</span>
      </div>
    </div>
    <el-form ref="account" :model="account" :rules="rules" label-position="left" label-width="0px"
             class="login_container">
      <h3 class="login_title">欢迎登录</h3>
      <el-form-item prop="email">
        <el-input type="text" v-model="account.email" auto-complete="off" placeholder="请输入管理员邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="account.password" auto-complete="off" placeholder="请输入登录密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleLogin('account')" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
    <div>
        <Footer></Footer>
    </div>

  </div>
</template>

<script>
  import Footer from "../components/backManange/BackFooter.vue"

  export default {
    data() {
      var validateEmail = (rule, value, callback) =>{
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入正确的邮箱'));
        } else {
          callback();
        }

      };
      var validatePassword = (rule, value, callback) =>{
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        loading: false,
        account: {
          email: '',
          password: '',
        },

        rules: {
          email: [
            {required: true, message: "请输入登录邮箱", trigger:'blur'},
            {validator: validateEmail, trigger: 'blur'}
          ],
          password: [
            {required: true, message: "请输入登录密码", trigger:'blur'}, {validator: validatePassword, trigger: 'blur'}
          ],
        },



      }
    },
    methods: {
      handleLogin(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push("/backManage")
          } else {
            return false;
          }
        });
      },
    },
    components: {
      Footer,
    }
  }
</script>

<style scoped>
  body {
    background: #DFE9FB;
  }
  .header_container {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 0 2px #ddd;
    text-align: center;
  }
  .logo_container {
    margin-left: 10px;
    display: inline-block;
    vertical-align: middle;
  }
  .logo_word {
    font-size: 18px;
    color: #999;
    line-height: 50px;
  }
  .login_container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    background: -ms-linear-gradient(top, #ace, #00C1DE); /* IE 10 */
    background: -moz-linear-gradient(top, #ace, #00C1DE); /*火狐*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ace), to(#00C1DE)); /*谷歌*/
    background: -webkit-linear-gradient(top, #ace, #00C1DE); /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top,#ace, #00C1DE); /*Opera 11.10+*/

  }
  .login_title {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 6px;
  }
</style>
