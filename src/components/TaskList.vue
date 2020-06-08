<template>
  <el-table
       :data="taskList"
       style="width: 100%"
       :max-height="350">
       <el-table-column
         label="任务详情"
         min-width="100%">
         <template slot-scope="scope">
           <div>
             <span class="task_titleWord">{{scope.row.title}}&nbsp;&nbsp;</span>
             <span class="task_data">
               <span v-if="scope.row.startTime == 0">永久</span>
               <span v-else>({{scope.row.startTime | timeFormatterToStringForDay}}&nbsp;-&nbsp;{{scope.row.endTime | timeFormatterToStringForDay}})</span>
             </span>
           </div>
           <div class="task_desc">
             <span>{{scope.row.descWords}}</span>
           </div>
         </template>
       </el-table-column>
       <el-table-column
         label="任务奖励"
         width="100">
         <template slot-scope="scope">
           <span class="task_reward">{{scope.row.reward}}</span>
         </template>
       </el-table-column>
       <el-table-column
         label="操作"
         width="150">
         <template slot-scope="scope">
           <el-button
             v-if="type == 1"
             size="large"
             type="text"
             @click="handleTake(scope.$index, scope.row)">领取任务</el-button>
           <el-button
             v-else-if="type == 2"
             size="large"
             type="text"
             @click="handleReward(scope.$index, scope.row)">领取奖励</el-button>
           <span v-else class="task_restTime">距下一次领取还剩</br>{{scope.row.restTime |timeFormatterToRest}}</span>
         </template>
       </el-table-column>
       <div slot="append" class="append_text">
          <p v-if="taskList.length>0">已无更多</p>
       </div>
      <template slot="empty">
         <i class="fa fa-frown-o" aria-hidden="true">&nbsp;这里没有任务哦~</i>
       </template>
     </el-table>
</template>

<script>
  import {getList} from '@/api'
  import {getDoingList} from '@/api'
  import {getFinishList} from '@/api'
  import {takeTask} from '@/api'
  import {getReward} from '@/api'

  export default {
    data() {
      return {
        taskList: [],
      }
    },
    methods: {
      getTaskList() {
        getList(this.$store.state.user.userId).then(response => {
          const data = response.data;
          if (data.code == '1001') {
            this.taskList = data.info;
          }
        })
      },
      getDoingTaskList() {
        getDoingList(this.$store.state.user.userId).then(response => {
          const data = response.data;
          if (data.code == '1004') {
            this.taskList = data.info;
          }
        })
      },
      getFinishTaskList() {
        getFinishList(this.$store.state.user.userId).then(response => {
          const data = response.data;
          if (data.code == '1005') {
            this.taskList = data.info;
          }
        })
      },
      handleTake(index, row) {
        takeTask(this.$store.state.user.userId, row.taskId).then(response => {
          const data = response.data;
          if (data.code == '1002') {
            this.$message({
              message: "已添加到进行中任务",
              type: "success",
              center: true
            })
            this.$emit('take-success');
            this.taskList.splice(index, 1);
          }
        })
      },
      handleReward(index, row) {
        getReward(this.$store.state.user.userId, row.taskRelateId).then(response => {
          const data = response.data;
          if (data.code == '1003') {
            this.$message({
              message: "领取成功",
              type: "success",
              center: true
            })
            this.$emit('reward-success');
            this.taskList.splice(index, 1);
          }
        })
      },
      getList() {
        if (this.type == 1) {
          this.getTaskList()
        } else if (this.type == 2) {
          this.getDoingTaskList()
        } else {
          this.getFinishTaskList()
        }
      },
    },
    props:['type'],
    mounted() {
      this.getList()
    }
  }
</script>

<style lang="scss">
  .task_titleWord {
    font-size: 16px;
    font-weight: bold;
  }
  .task_data {
    color: #0000FF;
    font-size: 12px;
  }
  .task_desc {
    min-height: 40px;
    padding: 6px 0 0 4px;

  }
  .task_reward {
    font-size: 16px;
    font-weight: bold;
    color: #23D160;
  }
  .task_restTime {
    font-size: 12px;
    color: $only-read-color;
  }
  .append_text {
    font-size: 12px;
    text-align: center;
    color: $only-read-color;
    padding-top: 4px;
    padding-bottom: 4px;
  }
</style>
