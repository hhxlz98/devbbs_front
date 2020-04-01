// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import axios from "axios";
import VueAxios from "vue-axios";

import "./assets/css/index.css"

import commonFunction from "./utils/index.js"
Vue.prototype.commonFunction = commonFunction

Vue.config.productionTip = true
Vue.use(ElementUI);
Vue.use(Buefy);
Vue.use(VueAxios, axios);



/* eslint-disable no-new */

Vue.filter('stringLengthConversion',function(str,len){
  var result = "";
  var strlen = 0;
  for(var i = 0;i < str.length; i++){
      if(str.charCodeAt(i) > 255){
        strlen += 2; //如果是汉字，则字符串长度加2
      } else {
        strlen++;
      }
      result += str.substr(i,1);
      if(strlen >= len){
          break;
      }
  }
  if(strlen < len){
    return result
  }else{
    return `${result}...`;
  }
})

new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
