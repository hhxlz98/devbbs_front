<template>
 <el-dialog
  :visible.sync="shareDialogVisible"
  width="20%"
  :show-close="false"
  :before-close="clickCancelBtn"
  center
  >
  <div slot="title" class="header-title">
    <span>分享链接</span>
  </div>
  <div class="share_content">
    <el-input v-model="shareString" onfocus="this.select()" placeholder="请输入内容" id="shareInput" readOnly></el-input>
  </div>
  <div slot="footer" class="card-footer share_footer">
    <a class="card-footer-item" @click="clickCancelBtn">取消</a>
    <a class="card-footer-item" v-clipboard:copy="shareString" v-clipboard:success="onCopyUrl" v-clipboard:error="onErrorUrl">复制</a>
  </div>
  </div>


  </el-dialog>

  <!-- <div class=""shadow_wrapper @click.stop>
    <div class="dialog_cover" v-show="isVisible">
      <div class="card shareCard">
        <header class="card-header">
          <span>分享</span>
        </header>
        <div class="card-content">
          <el-input v-model="shareString" placeholder="请输入内容"></el-input>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="shareDialogVisible = false">取消</a>
          <a class="card-footer-item" v-clipboard:copy="shareString" v-clipboard:success="onCopyUrl" v-clipboard:error="onErrorUrl">复制</a>
        </footer>
      </div>
    </div>

  </div> -->
</template>

<script>
  import Vue from "vue";
  import VueClipboard from "vue-clipboard2";
  Vue.use(VueClipboard);
  export default {
    data() {
      return {
        shareString: '',
        cancelClick: false,
      }
    },
    props: {
      link: {
        type: String,
        default: 'link'
      },
      shareDialogVisible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onCopyUrl() {
        this.$message.success("已复制到剪切板");
      },
      onErrorUrl() {
        this.$message.error("复制失败，请重试");
      },
      clickCancelBtn() {
        this.$emit("share-close")
      },
    },
    watch: {
      link: function(val) {
        this.shareString = val
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .header-title {
    margin-bottom: -30px;
    font-weight: bold;
  }
  .shareCard {
    /* margin: 0px 0px 0px 0px;
 */
  }
  .share_footer {
    margin-top: -20px;
    margin-bottom: -20px;
    margin-left: -20px;
    margin-right: -20px;
  }
  .ccc {
    background-color: #000066;
  }
</style>
