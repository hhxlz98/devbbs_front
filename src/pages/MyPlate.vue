<template>
  <div class="mainPage">
    <div class="container">
      <TopNav />

      <div class="box topMargin">
        <p class="headTitle">我的关注</p>

          <el-row :gutter="20" v-if="myPlateList.length > 0">
            <el-col v-for="(plate,index) in myPlateList" :key="plate.id" :span="4" class="topMargin">
              <Plate   :plate-info="plate"></Plate>
            </el-col>
          </el-row>

          <p v-else class="no_myplate">暂无关注板块！快去关注吧</p>

      </div>

      <div v-if="managePlateList.length > 0" class="box">
        <p class="headTitle">我的管理</p>

          <el-row :gutter="20">
            <el-col v-for="(plate,index) in managePlateList" :key="plate.id" :span="4" class="topMargin">
              <Plate   :plate-info="plate"></Plate>
            </el-col>
          </el-row>

      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
  import { getMyPlateList } from '@/api'
  import TopNav from "../components/TopNav.vue"
  import Footer from "../components/Footer.vue"
  import Plate from "../components/Plate.vue"
  export default {
    data() {
      return {
        myPlateList:[],

        managePlateList:[],
      }
    },
    methods: {

    },
    mounted() {
      var type = 0;
      getMyPlateList(this.$store.state.user.userId, type).then(
      response => {
        const data = response.data;

        if(data.code == "201") {
          this.myPlateList = data.info;
          console.log(this.myPlateList)
        }
      });
      type = 1;
      getMyPlateList(this.$store.state.user.userId, type).then(
      response => {
        const data = response.data;
      
        if(data.code == "201") {
          this.managePlateList = data.info;
          console.log(this.managePlateList)
        }
      });
    },
    components: {
        Plate,
        TopNav,
        Footer,
    }
  }
</script>

<style scoped lang="scss">
  .topMargin {
    margin-top: 1rem;
  }
  .no_myplate {
    margin: 6px 0 0 6px;
    color: $only-read-color;
    font-size: 16px;
  }
</style>
