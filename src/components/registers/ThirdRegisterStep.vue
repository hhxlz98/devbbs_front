<template>
  <div class="center">
    <section class="topMargin">
      <div class="content">
        <h3>用户须知</h3>
        <p>
          用户协议：<br />
          请承诺遵守本站相关规定，违反规定账户将予以临时禁言和封禁等处罚！</br>
          <ol>
            <li>请遵守网站所在服务器的相关法律法规，禁止发布违规信息。</li>
            <li>......</li>
          </ol>
          
        </p>
      </div>
      <b-button rounded type="is-info"
      @click="submit">同意并提交注册</b-button>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    methods: {
      submit() {

      }
    }
  }
</script>

<style>
  .center {
    margin: auto;
    width: 500px;
    height: 500px;
    text-align: center;
  }
  .topMargin {
    padding-top: 2rem;
  }
</style>
