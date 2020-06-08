<template>
  <span class="userName" @click.stop="toUserInfo">{{userName}}</span>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      toUserInfo() {
        let routeUrl = this.$router.resolve({
             name: "userInfo",
             params:{userId: this.userId, userName: this.userName}
           });
        window.open(routeUrl.href, '_blank');
      },
    },
    props:['userName', 'userId'],
  }
</script>

<style scoped>
  .userName {
    color: #55ff7f;
  }
  .userName:hover {
    color: #0000FF;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
