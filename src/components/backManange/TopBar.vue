<template>
  <div>
    <el-row>
      <el-col :span="24" class="top_bar">
        <div style="display: inline-block;">
          <img src="../../assets/logo.png" width="111" height="45" style="vertical-align: bottom;">
          <span class="logo_word" @click="showRouter">后台管理系统</span>
        </div>
        <div class="user_container">
          <el-dropdown>
           <el-avatar size="small" fit="fill" :src="CommonUtil.baseUrl + $store.state.manageUser.imgUrl"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span class="welcome_info">欢迎访问：{{$store.state.manageUser.userName}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    methods: {
      showRouter() {
		  console.log(this.$router.options);
	  }
    }
  }
</script>

<style scoped>
  .top_bar {
    width: 100%;
    height: 50px;
    background-color: #545c64;
    padding-left: 4px;
    vertical-align: middle;
  }
  .top_bar span{
    color: whitesmoke;
    line-height: 50px;
  }
  .user_container {
    margin: 10px;
    height: 50px;
    float: right;

  }
  .welcome_info {
    line-height: 50px;
    color: whitesmoke;
    float: right;
  }

</style>
