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
            <b-navbar-item href="/allPlate">
                全部版块
            </b-navbar-item>
            <b-navbar-item href="/myPlate" v-if="$store.state.isLogin">
                我的版块
            </b-navbar-item>
            <b-navbar-dropdown label="更多">
                <b-navbar-item href="#">
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
                         @icon-click="searchIconClick">
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
                                            <b-button type="is-info" outlined>登录</b-button>
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

                                              <b-checkbox>记住我</b-checkbox>
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
            <div>
              <i class="far fa-address-card">{{$store.state.user.userName}}</i>
            </div>
            <div @click="logout">
              <i class="fas fa-sign-out-alt">登出</i>
              </div>
          </div>
        </template>
    </b-navbar>
</template>


 <script>

 export default {
   data() {
     return {
       email: "",
       password: "",
       searchString:"",
     };
   },
   methods: {
     register() {
       this.$router.push("/register");
     },
     login() {
       console.log(this.email, this.password);
       console.log(this.$store.state.isLogin);
     },
     logout() {

     },
     searchIconClick(){
       console.log(this.searchString);
     },

   }
 }
 </script>

 <style>
   leftPadding {
     margin-left: 4rem;
   }
 </style>
