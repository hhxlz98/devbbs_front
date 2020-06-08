<template>
  <div class="container">
    <section class="topMargin">
      <b-field label="邮箱">
        <b-input
        placeholder="请输入邮箱"
        type="email"
        required
        v-model="userEmail"></b-input>
      </b-field>
      <b-field label="密码" :type="passwordType" :message="passwrodMessage">
        <b-input
        type="password"
        placeholder="请输入6~16位密码"
        required
        v-model="userPassword"
        minlength="6"
        maxlength="16"
        @blur="pass1Over"
        password-reveal
        ></b-input>
      </b-field>
      <b-field label="确认密码" :type="passwordType" :message="passwrodMessage">
        <b-input
        type="password"
        placeholder="请再次输入密码"
        required
        v-model="confirmPassword"
        minlength="6"
        maxlength="16"
        password-reveal
        @blur="pass2Over"></b-input>
      </b-field>
    </section>
  </div>
</template>

<script>
  import { SnackbarProgrammatic as Snackbar } from "buefy";
  import { NotificationProgrammatic as Notification } from 'buefy'

  export default {
    data() {
      return {
        confirmPassword: '',
        passwordType: '',
        passwrodMessage: '',
      };
    },
    methods: {
      pass1Over() {
        this.confirmPass();
      },
      pass2Over() {
        this.confirmPass();
      },
      confirmPass() {
        if (this.userPassword === '' || this.confirmPassword === '') {
          this.passwordType = ''
          this.passwrodMessage = ''
        } else {
          if(this.userPassword != this.confirmPassword) {
            this.passwordType = 'is-danger'
            this.passwrodMessage = '两次密码不一致'
          } else {
            this.passwordType = 'is-success'
            this.passwrodMessage = ''
          }
        }
      },
    },
    computed: {
      userEmail: {
        get() {
          return this.$store.state.registerUser.userEmail;
        },
        set(value) {
          this.$store.dispatch("registerUserEmail",value)
        }
      },
      userPassword: {
        get() {
          return this.$store.state.registerUser.userPassword;
        },
        set(value) {
          this.$store.dispatch("registerUserPassword",value)
        }

      },
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
