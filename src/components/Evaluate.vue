<template>
  <span class="evaluate_body" :class="{choosed: isEvaluated}">
     <div v-if="!isEvaluated">
       <el-button style="margin-left: 6px;" icon="el-icon-caret-top" type="text">赞同 {{ups}}</el-button>
       <el-divider direction="vertical"></el-divider>
       <el-button style="margin-right: 6px;" icon="el-icon-caret-bottom" type="text"></el-button>
     </div>
     <div v-else>
       <el-button 
       style="margin-left: 6px; margin-right: 6px; color: white;" 
       :icon="isUp ? 'el-icon-caret-top' : 'el-icon-caret-bottom'" 
       type="text">
       {{ isUp? '已赞同' : '已反对'}}
       </el-button>
     </div>
  </span>
</template>

<script>
  export default {
    data() {
      return {
        isEvaluated: false,
        isUp: false,
        ups: '1.6w',
      }
    }
  }
</script>

<style>
  .evaluate_body {
    border-radius: 30px;
    background-color: #e4f3ff;
    display:table;
  }
  .choosed {
    background-color: #0084ff;
  }
</style>
