<template>
  <span class="reward_body">
     <div v-if="rewardInfo.status == 0" class="unsolve">
       <span>悬赏积分：{{rewardInfo.reward}}</span>
       <el-divider direction="vertical"></el-divider>
       <span>热心助人：{{rewardInfo.helpfulNumber * rewardInfo.helpfulReward}}</span>
       <el-divider direction="vertical"></el-divider>
       <i class="el-icon-warning-outline">剩余时间：{{rewardInfo.restTime | timeFormatterToRest}}</i>
     </div>
     <div v-else-if="rewardInfo.status == 1" class="solve">
       <span>悬赏积分：{{rewardInfo.reward}}</span>
       <el-divider direction="vertical"></el-divider>
       <i class="el-icon-circle-check">已解决</i>
     </div>
     <div v-else-if="rewardInfo.status == 2" class="loose">
       <span>悬赏积分：{{rewardInfo.reward}}</span>
       <el-divider direction="vertical"></el-divider>
       <i class="el-icon-circle-close">已失效</i>
     </div>
  </span>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props:['rewardInfo'],
  }
</script>

<style scoped>
  .reward_body {
    display:table;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }

  .unsolve {
    padding: 0 6px 0 6px;
    border-radius: 30px;
    background-color: #e4f3ff;
   }

  .solve {
    padding: 0 6px 0 6px;
    border-radius: 30px;
    background-color: #a6e47f;

  }

  .loose {
    padding: 0 6px 0 6px;
    border-radius: 30px;
    background-color: #ffaa7f;
  }

</style>
