<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
   <div class="navbar-brand">
     <a class="navbar-item" href="/">
       <img src="../assets/logo.png" width="100" height="28" />
     </a>

     <a
       class="navbar-burger burger"
       role="button"
       aria-label="menu"
       aria-expanded="false"
       data-target="topNavbar">
       <span aria-hidden="true"></span>
       <span aria-hidden="true"></span>
     </a>

    </div>

    <div id="topNavBar" class="navbar-menu">

        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="输入搜索内容" />
            </p>
            <p class="control">
              <button class="button">搜索</button>
            </p>
          </div>
        </div>
          <a class="navbar-item">全部板块</a>
          <a class="navbar-item" v-if="$store.state.isLogin">我的板块</a>

    </div>

    <div class="navbar-end" v-if="!$store.state.isLogin">
        <div class="navbar-item">
          <div class="buttons">
            <b-button type="is-info" outlined @click="register">注册</b-button>
            <div class="navbar-menu">
              <div class="navbar-end">
                <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
                  <a class="navbar-item" slot="trigger" role="button">
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
                        <b-button type="is-primary" @click="login" expanded>登陆</b-button>
                      </footer>
                    </div>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div v-else>
      <div>
        <i class="far fa-address-card">{{$store.state.user.userName}}</i>
      </div>
      <div @click="logout">
        <i class="fas fa-sign-out-alt">登出</i>
        </div>
    </div>







   </nav>

 </template>

 <script>

 export default {
   data() {
     return {
       email: "",
       password: "",
     };
   },
   methods: {
     register() {
       this.$router.push("/register")
     },
     login() {
       console.log(this.email, this.password);
       console.log(this.$store.state.isLogin);
     },
     logout() {

     }

   }
 }
 </script>
