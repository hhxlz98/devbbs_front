<template>
    <b-navbar type=is-light :spaced=true>
        <template slot="brand" >
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="../assets/logo.png"
                    alt="A platfrom for softerware developer"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="/plate/all">
                全部版块
            </b-navbar-item>
            <b-navbar-item href="/plate/my" v-if="$store.state.isLogin">
                我的版块
            </b-navbar-item>
            <b-navbar-dropdown label="更多">
                <b-navbar-item @click="testToken">
                    关于本站
                </b-navbar-item>
                <b-navbar-item href="#">
                    联系我们
                </b-navbar-item>
            </b-navbar-dropdown>

            <b-field>
                <b-input v-model="searchString"
                         placeholder="输入搜索内容..."
                         type="search"
                         icon="magnify"
                         icon-clickable
                         @icon-click="clickSearchBtn">
                </b-input>
            </b-field>
        </template>

        <template slot="end">
          <div v-if="!$store.state.isLogin">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary" @click="register">
                        <strong>注册</strong>
                    </a>
                            <div class="navbar-menu">
                                <div class="navbar-end">
                                    <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
                                        <a
                                            class="navbar-item"
                                            slot="trigger"
                                            role="button">
                                            <b-button id="loginButton" type="is-info" outlined>登录</b-button>
                                        </a>

                                        <b-dropdown-item aria-role="menu-item" :focusable="false" custom paddingless>
                                          <div class="modal-card" style="width:300px;">
                                            <section class="modal-card-body">
                                              <b-field label="Email">
                                                <b-input type="email" v-model="email" placeholder="请输入邮箱" required></b-input>
                                              </b-field>

                                              <b-field label="密码">
                                                <b-input
                                                  type="password"
                                                  password-reveal
                                                  placeholder="请输入密码"
                                                  required
                                                  v-model="password"
                                                ></b-input>
                                              </b-field>

                                              <b-checkbox v-model="$store.state.isRemembered">记住我</b-checkbox>
                                            </section>
                                            <footer class="modal-card-foot">
                                              <b-button type="is-primary" @click="login" expanded>登录</b-button>
                                            </footer>
                                          </div>
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </div>
                </div>
            </b-navbar-item>
          </div>
          <div v-else>
            <div class="navbar-menu">
                        <div class="navbar-end">
                            <b-dropdown
                                
                                v-model="navigation"
                                position="is-bottom"
                                append-to-body
                                aria-role="menu">
                                <a
                                    class="navbar-item"
                                    slot="trigger"
                                    role="button">
                                    <img :src="imgUrl" style="border-radius:50%; margin-right: 2px;">
                                    <span>{{$store.state.user.userName}}</span>
                                    <b-icon icon="menu-down"></b-icon>
                                </a>

                                <b-dropdown-item custom aria-role="menuitem">
                                    <span style="font-size: 14px; color: #778087;">{{$store.state.user.userEmail}}</span>
                                </b-dropdown-item>
                                <hr class="dropdown-divider">
                                <b-dropdown-item has-link aria-role="menuitem">
                                  <router-link :to="{name:'userInfo', params:{userId:this.$store.state.user.userId,userName:this.$store.state.user.userName}}" target="_blank">
                                    <b-icon icon="account"></b-icon>
                                    <span>个人信息</span>
                                  </router-link>
                                </b-dropdown-item>
                                <b-dropdown-item has-link aria-role="menuitem">
                                  <router-link :to="{name:'forumTask', params:{userId:this.$store.state.user.userId,userName:this.$store.state.user.userName}}" target="_blank">
                                    <b-icon icon="home"></b-icon>
                                    <span>社区任务</span>
                                  </router-link>
                                </b-dropdown-item>
                                <b-dropdown-item has-link aria-role="menuitem">
                                  <router-link :to="{name:'myMessage', params:{userId:this.$store.state.user.userId,userName:this.$store.state.user.userName}}" target="_blank">
                                    <b-icon pack="fa" icon="envelope"></b-icon>
                                    <span>我的信息</span>
                                  </router-link>
                                </b-dropdown-item>
                                <hr class="dropdown-divider" aria-role="menuitem">
                                <b-dropdown-item has-link :to="{name:'userInfo', params:{userId:this.$store.state.user.userId,userName:this.$store.state.user.userName}}" target="_blank">
                                  <router-link :to="{name:'userInfo', params:{userId:this.$store.state.user.userId,userName:this.$store.state.user.userName}}" target="_blank">
                                    <b-icon icon="settings"></b-icon>
                                    <span>修改密码</span>
                                  </router-link>
                                </b-dropdown-item>
                                <b-dropdown-item @click="logout" aria-role="menuitem">
                                    <b-icon icon="logout"></b-icon>
                                    <span>注销登录</span>
                                </b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
          </div>
        </template>
    </b-navbar>
</template>


 <script>
import { userLogin } from '@/api'
import { testToken } from '@/api'
 export default {
   inject:['reload'],
   data() {
     return {
       email: "",
       password: "",
       searchString:"",
       navigation: '',
       fit: 'cover',
     };
   },
   computed: {
     imgUrl: function () {
       return this.CommonUtil.baseUrl + this.$store.state.user.imgUrl
     }
   },
   methods: {
     register() {
       this.$router.push("/register");
     },
     login() {
       console.log(this.email, this.password);
       userLogin(this.email, this.password)
        .then(response => {
          console.log(response);
          const data = response.data;
          if (data.code == '103') {
            this.$alert("密码错误","登录失败",{
              confirmButtonText: "确认",
              callback: action => {
                this.password = '';
                this.$store.state.isRemembered = false;
                document.getElementById("loginButton").click();

              }
            })

          } else if (data.code == '104' ) {
            this.$alert("账号不存在","登录失败",{
              confirmButtonText: "确认",
              callback: action => {
                this.password = '';
                this.email = '';
                this.$store.state.isRemembered = false;
                document.getElementById("loginButton").click();
              }
            })

          } else if (data.code == '102'){
            this.$store.dispatch("longinUser", data.info);
            this.reload();
            this.$message({
              message: '登录成功',
              type: 'success'
            });
          }
        })

     },
     logout() {
        this.$store.dispatch("logoutUser")
        this.reload();
        this.$message({
          message: '已注销',
          type: 'success'
        });
     },
     clickSearchBtn(){
       let routeUrl = this.$router.resolve({
            name:'searchPost',
            params:{key: this.searchString,
                    type: 1}
          });
       window.open(routeUrl.href, '_blank');
     },
     testToken() {
       testToken("I am test")

     }

   }
 }
 </script>

 <style>

 </style>
