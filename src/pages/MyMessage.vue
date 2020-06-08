<template>

  <div class="mainPage">
    <div class="container">
      <TopNav />
      <div class="message_container">
        <div class="left_messageContainer">
          <img src="../assets/message.png"/>
          <p class="message_title"><i class="fa fa-quote-left" aria-hidden="true"></i>&nbsp;我的信息&nbsp;<i class="fa fa-quote-right" aria-hidden="true"></i></p>
        </div>
        <div class="right_messageContainer">
           <el-tabs tab-position="left" type="border-card" style="height: 400px;">
              <el-tab-pane>
                <span slot="label"><i class="fa fa fa-envelope"></i>
                 &nbsp;收件箱</span>
                 <Inbox></Inbox>
                 </el-tab-pane>
              <el-tab-pane><span slot="label"><i class="fa fa fa-envelope-open"></i>
                 &nbsp;发件箱</span>
                 <SentMail></SentMail>
                 </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="fa fa-trash"></i>
                 &nbsp;垃圾箱</span>
                 <Trash></Trash></el-tab-pane>
            </el-tabs>

        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
  import TopNav from "../components/TopNav.vue"
  import Footer from "../components/Footer.vue"
  import Inbox from "../components/message/Inbox.vue"
  import SentMail from "../components/message/SentMail.vue"
  import Trash from '../components/message/Trash.vue'

  export default {
    data() {
      return {
      }
    },
    components:{
      TopNav,
      Footer,
      Inbox,
      SentMail,
      Trash
    }
  }
</script>

<style>
  .message_container {
    margin: 0px 55px 0px 55px;
    border: 1px solid $border-color;
    background-color: white;
    display: table;
    width: 90%;
  }
  .left_messageContainer {
    display: table-cell;
    width: 23%;
    /* background-color: #00ffff; */
    vertical-align: top;
  }
  .right_messageContainer {
    display: table-cell;
    float: right;
    width: 100%;
    padding: 4px 16px 6px;
    /* background-color: #000000; */
  }
  .message_img {
    width: 250px;
    height: 250px;
    text-align: center;
  }
  .message_title{
    text-align: center;
    font-size: 21px;
    font-weight: bold;
    padding-bottom: 4px;
    font-family: "SimHei";
  }
  .item {


  }
</style>
