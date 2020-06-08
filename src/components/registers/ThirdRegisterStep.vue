<template>
  <div class="container">
    <section class="topMargin">
      <div class="content">
        <h3>用户须知</h3>
        <p>
          用户协议：<br />
          请承诺遵守本站相关规定，违反规定账户将予以临时禁言和封禁等处罚！</br>
          <ol>
            <li>请遵守网站所在服务器的相关法律法规，禁止发布违规信息。</li>
            <li>......</li>
          </ol>

        </p>
      </div>
      <b-button rounded type="is-info"
      @click="submit">同意并提交注册</b-button>
    </section>
  </div>
</template>

<script>
  import { userRegister } from '@/api'
  export default {
    data() {
      return {

      };
    },
    methods: {
      submit() {
        const userName = this.$store.state.registerUser.userName;
        const userPassword = this.$store.state.registerUser.userPassword;
        const userShow = this.$store.state.registerUser.userShow;
        const userEmail = this.$store.state.registerUser.userEmail;
        const userSex = this.$store.state.registerUser.userSex;
        if(userPassword === '' || userEmail === '' || userName === '') {
          this.$alert("注册信息不完整","失败",{
            confirmButtonText: "确认",
          })
        }
        console.log(userName)
        console.log(userPassword)
        console.log(userShow)
        console.log(userEmail)
        console.log(userSex)
        userRegister(userEmail, userPassword, userName, userSex, userShow)
        .then(response => {
          const data = response.data;
          if(data.code == "106") {
            this.$message({
                  message: '注册成功',
                  type: 'success'
            });
            this.$router.push('/')
          }
        })

      }
    }
  }
</script>

<style>
  .topMargin {
    margin: auto;
    width: 500px;
    height: 360px;
    padding-top: 2rem;
  }
</style>
