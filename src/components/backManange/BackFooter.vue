<template>
  <div class="back_footer">
    <p class="footer-msg">
      Created by <strong style="color: #55ffff;">赖嘉豪</strong>@
      <a href="https://www.scut.edu.cn/">SCUT</a>.
      </br>2020 © 华南理工大学 版权所有
    </p>
  </div>
</template>

<script>
</script>

<style>
  .back_footer {
    position: fixed;
    height: 45px;
    bottom: 0;
    left: 0;
    padding: 4px 0;
    width: 100%;
    background-color: #2d2e2e;
  }
  .footer-msg {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    font-size: 14px;
    color: #666;
  }

  .footer .footer-msg a {
    color: #428bca;
    text-decoration: none;
  }

  .footer .footer-msg a:hover,
  .footer .footer-msg a:focus,
  .footer .footer-msg a:active {
     color: #2a6496;
     text-decoration: underline;
     outline: 0;
   }
</style>
