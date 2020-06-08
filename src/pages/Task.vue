<template>
  <div class="mainPage">
    <div class="container">
      <TopNav />
      <div class="task_container">
        <div class="left_taskContainer">
          <img src="../assets/task.png"/>
          <p class="task_title"><i class="fa fa-quote-left" aria-hidden="true"></i>&nbsp;社区任务&nbsp;<i class="fa fa-quote-right" aria-hidden="true"></i></p>
        </div>
        <div class="right_taskContainer">
           <el-tabs tab-position="left" type="border-card" style="height: auto;">
              <el-tab-pane>
                <span slot="label"><i class="fa fa-plus-square-o"></i>
                 &nbsp;可领取任务</span>
                  <TaskList :type="1"  @take-success="refreshList(1)"></TaskList>
                 </el-tab-pane>
              <el-tab-pane><span slot="label"><i class="fa fa-minus-square-o"></i>
                 &nbsp;进行中任务</span>
                  <TaskList :type="2" @reward-success="refreshList(2)" ref="doing"></TaskList>
                 </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="fa fa-check-square-o"></i>
                 &nbsp;已完成任务</span>
                  <TaskList :type="3"  ref="finish"></TaskList>
                 </el-tab-pane>
            </el-tabs>

        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
  import TopNav from "../components/TopNav.vue"
  import Footer from "../components/Footer.vue"
  import TaskList from "../components/TaskList.vue"

  export default {
    data() {
      return {

      }
    },
    methods: {
      refreshList(val) {
        if (val == 1) {
          this.$refs.doing.getList()
        } else if (val == 2){
          this.$refs.finish.getList()
        }
      }
    },
    components:{
      TopNav,
      Footer,
      TaskList
    }
  }
</script>

<style>
  .task_container {
    margin: 0px 55px 0px 55px;
    border: 1px solid $border-color;
    background-color: white;
    display: table;
    width: 90%;
  }
  .left_taskContainer {
    display: table-cell;
    width: 23%;
    /* background-color: #00ffff; */
    vertical-align: top;
  }
  .right_taskContainer {
    display: table-cell;
    float: right;
    width: 100%;
    padding: 4px 16px 6px;
    /* background-color: #000000; */
  }
  .task_img {
    width: 250px;
    height: 250px;
    text-align: center;
  }
  .task_title{
    text-align: center;
    font-size: 21px;
    font-weight: bold;
    padding-bottom: 4px;
    font-family: "SimHei";
  }
</style>
