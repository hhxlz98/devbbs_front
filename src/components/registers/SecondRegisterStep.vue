<template>
  <div class="container">
    <section class="topMargin">
      <b-field label="用户名" label-position="on-border" :type="userNameType" :message="userNameMessage">
        <b-input
        v-model="userName"
        minlength="3"
        maxlength="8"
        required
        @blur="userNameVerify"
        ></b-input>
      </b-field>

      <b-field label="性别" label-position="on-border">
        <b-select placeholder="选择性别" v-model="userSex">
          <option value="man">男</option>
          <option value="woman">女</option>
          <option value="-">秘密</option>
        </b-select>
      </b-field>

      <b-field label="个性签名" label-position="on-border">
        <b-input maxlength="30" custom-class="userShowInput" v-model="userShow"></b-input>
      </b-field>
      <b-field label="个性介绍" label-position="on-border">
        <b-input maxlength="200" type="textarea" v-model="userShow"></b-input>
      </b-field>
    </section>
  </div>

</template>

<script>
  import { userNameExist } from '@/api'
  export default {
    data() {
      return {
        userNameType: '',
        userNameMessage: '',
      };
    },
    methods: {
      userNameVerify() {
        if (this.userName.length >= 3 && this.userName.length <= 8) {
          userNameExist(this.userName).then(response => {
            const exist = response.data;
            if (exist) {
               this.userNameType = 'is-danger'
               this.userNameMessage = '用户名已被使用'
            } else {
               this.userNameType = 'is-success'
               this.userNameMessage = '用户名可用'
            }
          })
        }
      }
    },
    computed: {
      userName: {
        get() {
          return this.$store.state.registerUser.userName
        },
        set(value) {
          this.$store.dispatch("registerUserName",value)
        }
      },
      userSex: {
        get() {
          return this.$store.state.registerUser.userSex
        },
        set(value) {
          this.$store.dispatch("registerUserSex",value)
        }
      },
      userShow: {
        get() {
          return this.$store.state.registerUser.userShow
        },
        set(value) {
          this.$store.dispatch("registerUserShow",value)
        }
      },
    },

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
