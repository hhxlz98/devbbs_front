<template>
    <el-tabs v-model="activeName">
      <el-tab-pane>
        <span slot="label">我的消息<el-badge v-if="messageNewCount > 0" class="mark" :value="messageNewCount" :max="99" /></span>
          <MyInfor @return-messagecount="getMessageCount"></MyInfor>
        </el-tab-pane>
      <el-tab-pane>
        <span slot="label">站内信<el-badge v-if="mailNewCount > 0" class="mark" :value="mailNewCount" :max="99" /></span>
          <Mail @return-mailcount="getMailCount"></Mail>
        </el-tab-pane>
      <el-tab-pane>
        <span slot="label">好友申请<el-badge v-if="applyNewCount > 0" class="mark" :value="applyNewCount" :max="99" /></span>
          <FriendApply @return-applycount="getApplyCount"></FriendApply>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
  import MyInfor from './MyInfor.vue'
  import Mail from './Mail.vue'
  import FriendApply from './FriendApply.vue'

  export default {
    data() {
      return {
        messageNewCount: 0,
        mailNewCount: 0,
        applyNewCount: 0,

      }
    },
    methods: {
      getMailCount(count) {
        this.mailNewCount = count;
      },
      getApplyCount(count) {
        this.applyNewCount = count;
      },
      getMessageCount(count) {
        this.messageNewCount = count;
      },

    },
    computed: {


    },
    mounted() {

    },
    components: {
      MyInfor,
      Mail,
      FriendApply
    }
  }
</script>

<style>
</style>
