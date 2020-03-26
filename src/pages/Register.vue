<template>
  <div>
    <TopNav />
    <section>
      <b-steps>
        <b-step-item label="第一步" icon="account-key">
          <First />
        </b-step-item>
        <b-step-item label="第二步" icon="account">
          <Second />
        </b-step-item>
        <b-step-item label="第三步" icon="account-plus">
          <Third />
        </b-step-item>
      </b-steps>
    </section>
    <Footer />
  </div>
</template>

<script>
import TopNav from "../components/TopNav.vue"
import Footer from "../components/Footer.vue"
import First from "../components/registers/FirstRegisterStep.vue"
import Second from "../components/registers/SecondRegisterStep.vue"
import Third from "../components/registers/ThirdRegisterStep.vue"
export default {
  components: {
    TopNav,
    First,
    Second,
    Third,
    Footer
  }
};
</script>

<style>
</style>
