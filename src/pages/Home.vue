<template>
  <div class="mainPage">
    <div class="container">
    <TopNav />
    <Tiles />
    <Footer />
    </div>
  </div>
</template>

<script>
import TopNav from "../components/TopNav.vue"
import Footer from "../components/Footer.vue"
import News from "../components/News.vue"
import Tiles from "../components/Tiles.vue"

export default {
  components: {
    TopNav,
    Footer,
    News,
    Tiles,
  }
};
</script>

<style>

</style>
