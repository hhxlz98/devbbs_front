<template>
  <div class="mainPage">
    <div class="container">
    <TopNav />

    <div class="publish_main_container">
      <div class="top_breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{name:'plateContent', params:{plateId:$route.params.plateId,plateName:plateName}}">板块：{{plateName}}</el-breadcrumb-item>
          <el-breadcrumb-item>发表帖子</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="publish_header">发表帖子</div>
      <div class="publish_body">
        <span>标题：</span>
        <el-input v-model="title" ref="title" size="small" placeholder="请输入标题" clearable></el-input>
        <div  v-if='$route.params.type == "Ask"' class="reward_setting">
          <span>悬赏设置：</span>
          <span style="float: right;">你的剩余积分：<span class="point_number">{{ points }}</span> </span>
          <div>
            <div>
              <span class="heard_word">最佳答案奖励：</span>
              <el-input placeholder="积分值" size="mini" v-model="bestPoint" style="width: 140px;">
                  <template slot="append">积分</template>
              </el-input>
              <span class="desc_word">最低悬赏20积分，发布后将自动扣除。</span>
              <span class="heard_word">悬赏时间：</span>
               <el-select v-model="value" size="mini" styleplaceholder="请选择" style="width: 80px; text-align: center;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              <span class="desc_word">时间结束后，悬赏结束。</span>
            </div>

            <div style="margin-top: 4px;">
              <span class="heard_word">热心助人奖励：</span>
              <el-input placeholder="积分值" size="mini" v-model="helpfulPoint" style="width: 140px;">
                  <template slot="append">积分</template>
              </el-input>
              <span class="heard_word">奖励份数：</span>
              <el-input placeholder="人数" size="mini" v-model="number" style="width: 50px;">
              </el-input>
              <span class="desc_word">总花费 <span class="point_number">{{totalPoint}}</span> 积分，悬赏结束后不会退回。</span>
            </div>



          </div>
        </div>
        <div>
        <span>正文：</span>
          <Editor id="editor" v-model="content"  tabindex = "0" :isClear="isClear"></Editor>
        </div>
        <el-button
        size="mini"
        icon="el-icon-s-promotion"
        @click="submitPost"
        class="submint_btn" round>提交</el-button>
      </div>
    </div>

    <Footer />
    </div>
  </div>
</template>

<script>
  import {addNewPost} from '@/api'
  import { getPublishPostInfo } from '@/api'

  import TopNav from "../components/TopNav.vue"
  import Footer from "../components/Footer.vue"
  import Editor from '@/components/Editor.vue'

  export default {
    data() {
      return {
        plateName: '',
        number: 10,
        bestPoint: 20,
        helpfulPoint: 2,
        beforeUrl: '',
        options: [{
                  value: '7',
                  label: '7天'
                }, {
                  value: '14',
                  label: '14天'
                }, {
                  value: '30',
                  label: '30天'
                }],
                value: '14',


      title:'',
      content: '',
      isClear: false,
      points: '',
      }
    },
    mounted() {
      if (this.$store.state.isLogin) {
        this.requestPublishInfo()
      } else {
      this.CommonUtil.userLoginInfo();
      }

    },
    methods: {
      change(val) {
        console.log(this.content)
      },
      submitPost() {
        console.log(this.value)
        if(this.title == '') {
          this.$alert('请输入标题', '提交错误', {
            confirmButtonText: '确认',
            callback: action => {
              this.$refs.title.focus()
            }
          })
        } else if(this.content == '') {
          this.$alert('请输入正文', '提交错误', {
            confirmButtonText: '确认',
            callback: action => {
              document.getElementById("editor").focus();
            }
          })
        } else {
          addNewPost(this.$store.state.user.userId,
                     this.$route.params.plateId,
                     this.title, this.content,
                     this.$route.params.type, this.bestPoint,
                     this.helpfulPoint, this.number, this.value).then(response => {
            const data = response.data;

            if(data.code == "402") {
              var info = "发表成功";
              this.$router.push({
                path:'/transition',
                query: {
                  info: info,
                  postId: data.info.postId,
                  title: data.info.title
                }
              })
            }
          })
        }
      },
      requestPublishInfo() {
        getPublishPostInfo(this.$store.state.user.userId, this.$route.params.plateId).then(response => {
          const data = response.data;
          console.log(data);
          if (data.code == "414") {
            this.plateName = data.info.plateName;
            this.points = data.info.points;
          }
        })
      }
    },
    computed: {
      totalPoint: function () {
        return Number(this.bestPoint) + this.number * this.helpfulPoint;
      },
      userLogin () {
        return this.$store.state.isLogin
      }
    },
    watch: {
      userLogin() {
        if (this.$store.state.isLogin) {
          this.requestPublishInfo()
        }
      }
    },
    components: {
      TopNav,
      Footer,
      Editor,
    }

  }
</script>

<style scoped lang="scss">
  .publish_main_container {
    background-color: white;
    width: 90%;
    margin:0 auto;
    padding: 4px 20px 4px 20px;

  }
  .publish_header {
    padding-left: 6px;
    line-height: 22px;
    background-color: #cccccc;
    height: 22px;
    font-size: 12px;
    margin-top: 10px;
  }
  .publish_body {
    border: 1px solid $border-color;
    padding: 2px 8px 4px 8px;
  }

  .desc_word {
    font-size: 12px;
    color: $only-read-color;
  }

  .heard_word {
    margin-left: 4px;
    font-size: 14px;
  }

  .point_number {
    color: #55aaff;

  }

  .reward_setting {
    border: 1px solid $border-color;
    background-color: #eeeeee;
    margin: 6px 0 6px 0;
    padding: 2px 6px 2px 6px;

  }

  .submint_btn {
    background: -webkit-linear-gradient(
    #990000, #bd5c5c, #bd5c5c, #990000);
    color: white;
    font-weight: bold;
    display:block;
    margin:0 auto;
    margin-top: 2px;
  }

</style>
