<template>
  <div class="center">
    <section class="topMargin">
      <b-field label="邮箱">
        <b-input
        placeholder="请输入邮箱"
        type="email"
        required
        v-model="userEmail"></b-input>
      </b-field>
      <b-field label="密码">
        <b-input
        placeholder="请输入密码"
        password-reveal
        required
        v-model="userPassword"></b-input>
      </b-field>
      <b-field label="确认密码">
        <b-input
        placeholder="请再次输入密码"
        password-reveal
        required
        v-model="confirmPassword"></b-input>
      </b-field>
      <b-button type="is-info" outlined rouded
      @click="saveInfo">保存</b-button>
    </section>
  </div>
</template>

<script>
  import { SnackbarProgrammatic as Snackbar } from "buefy";
  import { NotificationProgrammatic as Notification } from 'buefy'

  export default {
    data() {
      return {
        userName: "",
        userEmail: "",
        userPassword: "",
        confirmPassword: "",
      };
    },
    methods: {
      saveInfo() {

        Notification.open('Notify!')

    }
  },
 }
</script>

<style>
  .center {
    margin: auto;
    width: 500px;
    height: 500px;
    text-align: center;
  }
  .topMargin {
    padding-top: 2rem;
  }
</style>
