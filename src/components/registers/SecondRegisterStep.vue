<template>
  <div class="center">
    <section class="topMargin">
      <b-field label="用户名" label-position="on-border">
        <b-input
        v-model="userName"
        maxlength="10"
        required
        ></b-input>
      </b-field>

      <b-field label="性别" label-position="on-border">
        <b-select placeholder="选择性别" v-model="userSex">
          <option value="男">男</option>
          <option value="女">女</option>
        </b-select>
      </b-field>

      <b-field label="个性签名" label-position="on-border">
        <b-input maxlength="50" type="textarea" v-model="userShow"></b-input>
      </b-field>

    </section>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        userName: "",
        userSex: "",
        userShow: "",
      };
    },
    methods: {

    }
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
    padding-top: 8rem;
  }
</style>
