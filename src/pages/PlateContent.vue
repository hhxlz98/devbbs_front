<template>
  <div class="mainPage">
    <div class="container">
    <TopNav />
    <div>
      <div class="mainContent"><PostingList /> </div>
      <div class="slider"><SideBar /></div>
    </div>

    <Footer />
    </div>
  </div>
</template>

<script>
  import TopNav from "../components/TopNav.vue"
  import Footer from "../components/Footer.vue"
  import PostingList from "../components/PostingList.vue"
  import SideBar from "../components/SideBarForPlate.vue"

  export default {
    data() {
      return {

      }
    },
    components:{
      TopNav,
      Footer,
      PostingList,
      SideBar
    }
  }
</script>

<style>
  .mainContent{
    width: 80%;
    display: inline-block;
  }
  .slider {
    width: 19%;
    float: right;
  }
</style>
