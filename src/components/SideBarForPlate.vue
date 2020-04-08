<template>
  <div>
    <div class="plateInfo">
      <div class="topBar">板块信息</div>
        <div class="imgContain">
          <el-avatar class="plateImg" shape="square" fit="fill" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-avatar>
        </div>

        <div class="plateData">
          <span class="plateName">{{plateInfo.name}}</span>
          <div class="plateNumber">关注数 {{plateInfo.followed | numberFormatter()}}  <br/>帖子 {{plateInfo.posts | numberFormatter()}}</div>

          <div style="text-align:center; margin-top: 3px;">
            <span v-if="plateInfo.isFollow">
              <el-popconfirm
                confirmButtonText='确认'
                cancelButtonText='取消'
                icon="el-icon-question"
                iconColor="green"
                title="取消关注？"
                @onConfirm="disFollow"
              >
                <el-button slot="reference" size="mini" class="disabledColor">已关注</el-button>
              </el-popconfirm>
            </span>
            <span v-else>
              <el-button type="primary" size="mini">+ 关注</el-button>
            </span>
          </div>
        </div>
        <div class="plateIntroduction">
          <span>板块简介</span><br/>
          <span class="introText">{{ plateInfo.intro }}</span>
        </div>
    </div>

    <div class="plateInfo">
      <div class="topBar">板块相关</div>



    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        plateInfo: {
          id:165,
          name:"vue.js",
          intro:"一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。",
          followed: 36045,
          posts: 1244550,
          isFollow: true,
        }
      }
    }
  }
</script>

<style>
  .plateInfo {
    width: 100%;
    background-color: #ffffff;
    margin-top: 10px;
  }
  .topBar {
    padding: 10px;
    background-color: #f6f6f6;
    height: 36px;
    font-size: 12px;
  }
  .imgContain {
   width: 100px;
   height: 100px;
   display: inline-block;
   margin-top: 6px;
  }
  .plateImg{
    margin-top: 6px;
    margin-left: 4px;
    width: 100%;
    height: 100%;

  }
  .plateData {
    height: 100px;
    width: 55%;
    margin-top: 16px;
    margin-left: 5px;
    float: right;
   }
  .plateName {
    margin-top: 10px;
    margin-left: 5px;
    font-size: 18px;
   }
   .plateNumber {
     font-size: 12px;
     margin-left: 6px;
   }

   .plateIntroduction {
     border-top: 1px solid #e5e5e5;
     margin: 0px 4px;
     padding: 4px 4px;
   }

   .introText {
     font-size: 12px;
   }


</style>
