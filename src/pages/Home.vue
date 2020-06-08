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
import News from "../components/home/News.vue"
import Tiles from "../components/home/Tiles.vue"

export default {
  components: {
    TopNav,
    Footer,
    News,
    Tiles,
  },
  created() {
    let self = this;
    let code1 = 0;
    let code2 = 0;
    document.onkeydown = function (e) {
      let evn = e || event;
      let key = evn.keyCode || evn.which || evn.charCode;
      if (key === 112 ) {
        code1 = 1;
        console.log("f1");
      }
      if (key === 17) {
        code2 = 1;
        console.log("ctrl");
      }
      if (code1 === 1 && code2 === 1) {
        self.$router.push("/backLogin");
        code1 = 0;
        code2 = 0;
      }
    }
  }
};
</script>

<style>

</style>
