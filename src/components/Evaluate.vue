<template>
    <span class="evaluate_body" :class="{choosed: isEvaluated}">
      <div class="container">
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
         <div v-show="!isEvaluated">
           <el-button style="margin-left: 6px;" icon="el-icon-caret-top" type="text" @click="clickEvaluate(0)">赞同 {{ups | numberFormatter}}</el-button>
           <el-divider direction="vertical"></el-divider>
           <el-button style="margin-right: 6px;" icon="el-icon-caret-bottom" type="text" @click="clickEvaluate(1)"></el-button>
         </div>
         <div v-show="isEvaluated">
           <el-button
           @click="clickEvaluate(3)"
           style="margin-left: 6px; margin-right: 6px; color: white;"
           :icon="isUp ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
           type="text">
           {{ ups | numberFormatter}}
           {{ isUp? '已赞同' : '已反对'}}
           </el-button>
         </div>
      </div>
    </span>
</template>

<script>
  export default {
    data() {
      return {
        info:{},
      }
    },
    props:{
      evaluateInfo:{
        type: Object,
        default:()=>{}
      }

    },
    methods: {
      clickEvaluate(val) {
        if(!this.$store.state.isLogin) {
          this.CommonUtil.userLoginInfo();
        } else {
          this.$emit('clickEvaluateAction',val);
        }
      }
    },
    computed: {
      isEvaluated() {
        return this.info.isEvaluated;
      },
      isLoading() {
        return this.info.isLoading;
      },
      isUp() {
        return this.info.isUp;
      },
      ups() {
        return this.info.ups;
      },
    },
    watch: {
    },
    mounted() {
      this.info = this.evaluateInfo;
    }
  }
</script>

<style>
  .evaluate_container {

  }
  .evaluate_body {
    border-radius: 30px;
    background-color: #e4f3ff;
    display:table;
  }
  .choosed {
    background-color: #0084ff;
  }
</style>
