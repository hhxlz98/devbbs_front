<template>
  <div class="position_container" @click.stop="toUserInfo">
    <el-avatar :size="size" fit="fill" :src="CommonUtil.baseUrl + url"></el-avatar>
    <div class="userN">{{userName}}</div>
  </div>
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
    props:['size', 'url', 'userName', 'userId'],
  }
</script>

<style scoped>
.position_container {
  /* border: 1px solid #000000; */
  display: table;
}

.position_container :hover{
  cursor: pointer;
}

.userN {
  display: table-cell;
  vertical-align: middle;
}
</style>
