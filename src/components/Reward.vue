<template>
  <span class="reward_body">
     <div v-if="!isOver">
       <span>悬赏积分：{{figure}}</span>
       <el-divider direction="vertical"></el-divider>
       <span>热心助人：{{helpful}}</span>
       <el-divider direction="vertical"></el-divider>
       <i class="el-icon-warning-outline">剩余时间：{{restTime}}</i>
     </div>
     <div v-else-if="isSolve" :class="[isSolve ? 'solve': 'loose']">
       <span>悬赏积分：{{figure}}</span>
       <el-divider direction="vertical"></el-divider>
       <i class="el-icon-circle-check">已解决</i>
     </div>
     <div v-else :class="[isSolve ? 'solve': 'loose']">
       <span>悬赏积分：{{figure}}</span>
       <el-divider direction="vertical"></el-divider>
       <i class="el-icon-circle-close">已失效</i>
     </div>
  </span>
</template>

<script>
  export default {
    data() {
      return {
        figure: 50,
        helpful: 20,
        isOver: false,
        restTime: "7天6小时",
        isSolve: false,
      }
    }
  }
</script>

<style scoped>
  .reward_body {
    border-radius: 30px;
    background-color: #e4f3ff;
    display:table;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding: 0 6px 0 6px;
  }

  .solve {
    background-color: #a6e47f;
  }

  .loose {
    background-color: #ffaa7f;
  }

</style>
