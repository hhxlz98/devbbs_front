<template>
  <div class="mainPage">
    <div class="container">
      <TopNav />

      <div class="box topMargin" v-if="allPlateList.length>0">
        <p class="headTitle">全部板块</p>
          <el-row :gutter="20">
            <el-col v-for="(plate,index) in allPlateList" :key="plate.plate_id" :span="4" class="topMargin">
              <Plate  :plate-info="plate"></Plate>
            </el-col>
          </el-row>
      </div>

      <Footer />
    </div>
  </div>

</template>

<script>
  import { getAllPlateList } from '@/api'
  import TopNav from "../components/TopNav.vue"
  import Footer from "../components/Footer.vue"
  import Plate from "../components/Plate.vue"
  export default {
    data() {
      return {
        allPlateList:[],
      }
    },
    methods: {

    },
    mounted() {

      getAllPlateList(this.$store.state.user.userId).then(
      response => {
        const data = response.data;

        if(data.code == "201") {
          this.allPlateList = data.info;
          console.log(this.allPlateList)
        }
      })

    },
    components: {
      Plate,
      TopNav,
      Footer,
    }
  }

</script>

<style>
  .topMargin{
    margin-top: 1rem;
  }
</style>
