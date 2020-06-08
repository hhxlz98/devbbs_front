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
  <el-card :body-style="{ padding: '1px' }" shadow="hover" class="plateCard">
        <el-avatar class="plateImage" shape="square" fit="fill" :src="this.CommonUtil.baseUrl + plateInfo.imgUrl"></el-avatar>
        <div style="padding: 2px;">
          <span>{{ plateInfo.plateName }}</span>
          <div class="desc clearfix">
           <span class="palteDescContent">{{ plateInfo.plateIntro | stringLengthConversion(22) }}</span>
           <el-popover
               v-if="this.CommonUtil.stringLengthLongerThan(plateInfo.plateIntro,22)"
               placement="bottom"
               title="板块简介"
               width="200"
               trigger="click"
               style="float: right;"
               :content=plateInfo.plateIntro>
               <el-button type="text" class="popButton" slot="reference">更多</el-button>
             </el-popover>
           </div>
           <footer class="plate_footer">
             <span v-if="plateInfo.isFollow">
               <el-popconfirm
                 confirmButtonText='确认'
                 cancelButtonText='取消'
                 icon="el-icon-question"
                 iconColor="red"
                 title="取消关注？"
                 @onConfirm="disFollow"
               >
                 <el-button slot="reference" class="disabledColor" size="medium">已关注</el-button>
               </el-popconfirm>
             </span>
             <span v-else>
               <el-button slot="reference" @click="follow" size="medium">关注</el-button>
             </span>
               <el-button slot="reference" @click="toPlate(plateInfo)" size="medium">进入版块</el-button>
           </footer>
        </div>
  </el-card>
</template>

<script>
  import {addPlateRelate} from '@/api'
  import {deletePlateRelate} from '@/api'
  export default {
    data() {
      return {


      }
    },
    props:['plateInfo'],

    methods: {
      follow() {
        if(!this.$store.state.isLogin) {
          this.CommonUtil.userLoginInfo();
        } else {
          var type = 0;
          addPlateRelate(this.$store.state.user.userId, this.plateInfo.plateId,type)
          .then(response => {
            const data = response.data;

            if(data.code == "302") {
              this.$message({
                        message: '关注成功',
                        type: 'success'
                      });
              this.plateInfo.isFollow = true;
            }
          })
        }
      },

      disFollow() {
        if(!this.$store.state.isLogin) {
          this.CommonUtil.userLoginInfo();
        } else {
          var type = 0;
          deletePlateRelate(this.$store.state.user.userId, this.plateInfo.plateId, type)
          .then(response => {
            const data = response.data;

            if(data.code == "303") {
              this.$message({
                        message: '取消关注成功',
                        type: 'success'
                      });
              this.plateInfo.isFollow = false;
            }
          })

        }
      },

      toPlate(plateInfo) {
        console.log("click palte");
        this.$router.push({name:'plateContent',params:{plateId:plateInfo.plateId,plateName:plateInfo.plateName}})
      }

    }
  }
</script>

<style>
  .plateCard{
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
  .plate_footer{
    text-align: center;
  }
</style>
