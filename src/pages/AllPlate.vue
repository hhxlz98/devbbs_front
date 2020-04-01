<template>
  <div class="mainPage">
    <div class="container">
      <TopNav />

      <div class="box topMargin">
        <p class="headTitle">全部板块</p>
          <el-row :gutter="20">
            <el-col v-for="(plate,index) in allPlateList" :key="plate.id" :span="4" class="topMargin">
              <Plate   :plate-info="plate"></Plate>
            </el-col>
          </el-row>
      </div>
      
      <Footer />
    </div>
  </div>

</template>

<script>
  import TopNav from "../components/TopNav.vue"
  import Footer from "../components/Footer.vue"
  import Plate from "../components/Plate.vue"
  export default {
    data() {
      return {
        allPlateList:[
          {
           id: 1,
           typeName:"Javascript",
           typeDesc:"一种前端语言一种前端语言一种前端语言一种前端语言一种前端语言",
           isFollow: true,
          },
          {
           id: 2,
           typeName:"Javascript",
           typeDesc:"一种前端语言",
           isFollow: true,
          },
          {
           id: 3,
           typeName:"Javascript",
           typeDesc:"一种前端语言",
           isFollow: true,
          },
          {
           id: 4,
           typeName:"Javascript",
           typeDesc:"一种前端语言",
           isFollow: true,
          },
          {
           id: 5,
           typeName:"Javascript",
           typeDesc:"一种前端语言",
           isFollow: true,
          },
          {
           id: 6,
           typeName:"Javascript",
           typeDesc:"一种前端语言",
           isFollow: true,
          },
          {
           id: 7,
           typeName:"Javascript",
           typeDesc:"一种前端语言",
           isFollow: true,
          },
          {
           id: 8,
           typeName:"Javascript",
           typeDesc:"一种前端语言",
           isFollow: true,
          },
        ]
      }
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
