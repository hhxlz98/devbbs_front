<template>
  <div class="center-div">
    <img src="../assets/logo.png" />
    <div class="info-text">
      {{info}}
    </div>
    <div class="read-info">
      将自动跳转页面
      <el-progress :percentage="count" :show-text="false"></el-progress>
    </div>

    <span>

    </span>

  </div>
</template>

<script>
  export default {
    data() {
      return{
         postId: '',
         title: '',
         info: '',
         count: 0,
      }
    },
    created() {
      this.toPage()
    },
    methods: {
      toPage() {
        var that = this
        var interval = setInterval(function(){
            if(that.count == 115){
                clearInterval(interval);
            }
            that.count += 10;
        }, 200);

      }

    },
    mounted() {
      this.postId = this.$route.query.postId;
      this.title = this.$route.query.title;
      this.info = this.$route.query.info;
    },
    watch: {
      count: function (n, o){
        if(n >= 115) {
            this.$router.push({name:'postContent',params:{postId:this.postId,name:this.title}})
            this.count = 0
        }
      }

    },
  }
</script>

<style scoped lang="scss">
  .center-div {
     position: absolute;
        top:40%;
        left:50%;
        transform: translate(-50%,-50%);

        width: 280px;
        height: 210px;
        border: 1px solid $border-color;
        box-shadow: 1px 1px 2px #888888;
        border-radius: 10px;
        text-align: center;
  }

  .info-text {
    margin-top: 8px;
    font-size: 16px;
    color: #0086B3;

  }
  .read-info {
    margin-top: 20px;
    color: $only-read-color;
    font-size: 12px;
   }
</style>
