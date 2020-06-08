<template>
  <el-tabs>
    <el-tab-pane>
      <span slot="label">站内信</span>
      <DeleteMail></DeleteMail>
      </el-tab-pane>
    <el-tab-pane>
      <span slot="label">发件信</span>
      <DeleteSentMail></DeleteSentMail>
      </el-tab-pane>
    <el-tab-pane>
      <span slot="label">主题</span>
      <DeletePost></DeletePost>
      </el-tab-pane>
    <el-tab-pane>
      <span slot="label">回复</span>
        <DeleteComment></DeleteComment>
      </el-tab-pane>
  </el-tabs>
</template>

<script>
  import DeleteComment from './DeleteComment.vue'
  import DeletePost from './DeletePost.vue'
  import DeleteMail from './DeleteMail.vue'
  import DeleteSentMail from './DeleteSentMail.vue'
  
  export default {
    components: {
      DeleteComment,
      DeletePost,
      DeleteMail,
      DeleteSentMail
    }
  }
</script>

<style>
</style>
