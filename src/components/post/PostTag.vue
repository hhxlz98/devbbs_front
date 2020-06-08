<template>
  <span>
    <span v-if="putTop" class="putTop">置顶</span>
    <span v-if="putGood" class="putGood">精华</span>
    <span class="putNormal"> {{ tab | tabFormatter }} </span>
  </span>
</template>

<script>
  export default {
    props:['putTop', 'putGood', 'tab'],
  }
</script>

<style scoped>
  .putGood,.putTop {
    background: #80bd01;
    padding: 2px 2px 2px 2px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-right: 3px;
    margin-bottom: 1px;
  }
  .putNormal {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 1px 2px 3px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    margin-right: 7px;
  }
</style>
