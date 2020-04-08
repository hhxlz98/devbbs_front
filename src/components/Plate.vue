<!-- <template> 文字版的板块，感觉有点丑。
  <div>
    <section class="plateStyle">
      <div class="hero-body has-text-centered">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title"> <span class="plateName">板块名:{{ plateInfo.typeName }}</span></p>
          </header>
          <div class="card-content">
            <div class="content">
              板块简介:{{ plateInfo.typeDesc | stringLengthConversion(12)  }}
              <br />
            </div>
          </div>
          <footer class="card-footer">
            <a v-if="!plateInfo.isFollow" @click="follow" class="card-footer-item">关注</a>
            <a v-else @click="disFollow" class="card-footer-item disabledColor">已关注</a>
            <a href="#" class="card-footer-item">进入板块</a>
          </footer>
        </div>
      </div>
    </section>
  </div>
</template> -->

<template>
  <el-card :body-style="{ padding: '1px' }" shadow="hover" class="palteCard">
        <el-avatar class="plateImage" shape="square" fit="fill" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-avatar>
        <div style="padding: 2px;">
          <span>{{ plateInfo.typeName }}</span>
          <div class="desc clearfix">
           <span class="palteDescContent">{{ plateInfo.typeDesc | stringLengthConversion(22) }}</span>
           <el-popover
               v-if="this.commonFunction.stringLengthLongerThan(plateInfo.typeDesc,22)"
               placement="bottom"
               title="板块简介"
               width="200"
               trigger="click"
               :content=plateInfo.typeDesc>
               <el-button type="text" class="popButton" slot="reference">更多</el-button>
             </el-popover>
           </div>
           <span v-if="plateInfo.isFollow">
             <el-popconfirm
               confirmButtonText='确认'
               cancelButtonText='取消'
               icon="el-icon-question"
               iconColor="green"
               title="取消关注？"
               @onConfirm="disFollow"
             >
               <el-button slot="reference" class="disabledColor">已关注</el-button>
             </el-popconfirm>
           </span>
           <span v-else>
             <el-button slot="reference" @click="follow">关注</el-button>
           </span>
           <el-button slot="reference" @click="toPlate(plateInfo)">进入板块</el-button>
        </div>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {


      }
    },
    props:['plateInfo'],

    methods: {
      follow() {
        this.$message({
                  message: '关注成功',
                  type: 'success'
                });
        this.plateInfo.isFollow = true;
      },

      disFollow() {
        this.plateInfo.isFollow = false;
      },

      toPlate(plateInfo) {
        this.$router.push({name:'plateContent',params:{plateId:plateInfo.id,plateName:plateInfo.typeName}})
      }

    }
  }
</script>

<style>
  .palteCard{
    border-width: 1px;
  }
  .plateImage {
    width: 200px;
    height: 200px;
  }
  .palteDescContent {
    text-align: left;
    font-size: 13px;
    color: #999;
  }
  .popButton{
    padding: 0;
   }
   .desc {
    margin-top: 3px;

  }
</style>
