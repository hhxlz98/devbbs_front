<template>
  <el-tabs>
    <el-tab-pane>
      <span slot="label">已发站内信</span>
        <SendedMail  ref="SendedMail"></SendedMail>
      </el-tab-pane>
    <el-tab-pane>
      <span slot="label">已发好友申请</span>
        <SendedFriendApply></SendedFriendApply>
      </el-tab-pane>
    <el-tab-pane>
      <span slot="label">发送站内信</span>
        <SendMail @send-mail-success="sendMailSuccess"></SendMail>
      </el-tab-pane>
  </el-tabs>
</template>

<script>
  import SendedMail from './SendedMail.vue'
  import SendedFriendApply from './SendedFriendApply.vue'
  import SendMail from './SendMail.vue'

  export default {
    methods: {
      sendMailSuccess() {
        console.log("ressss");
        this.$refs.SendedMail.reRequestMail()
      },
    },
    components:{
      SendedMail,
      SendedFriendApply,
      SendMail,
    },
  }
</script>

<style>
</style>
