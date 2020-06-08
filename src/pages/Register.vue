<template>
  <div style="text-align: center;">
    <TopNav />
    <section>
      <b-steps size="is-small" style="padding: 8px 0 8px">
        <b-step-item label="基础信息" icon="account-key">
          <First />
        </b-step-item>
        <b-step-item label="增强信息" icon="account">
          <Second />
        </b-step-item>
        <b-step-item label="用户授权" icon="account-plus">
          <Third />
        </b-step-item>
        <template
                        slot="navigation"
                        slot-scope="{previous, next}">
                        <b-button
                            outlined
                            type="is-danger"
                            :disabled="previous.disabled"
                            @click.prevent="previous.action">
                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                            上一步
                        </b-button>
                        <b-button
                            outlined
                            type="is-success"
                            :disabled="next.disabled"
                            @click.prevent="next.action">
                            下一步
                            <i class="fa fa-arrow-right" aria-hidden="true"></i>
                        </b-button>
                    </template>
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
