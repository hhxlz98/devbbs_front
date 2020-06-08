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
import { MessageBox } from 'element-ui';
import "./assets/css/index.css"

import CommonUtil from "./utils/index.js"
Vue.prototype.CommonUtil = CommonUtil

Vue.prototype.$filters = Vue.options.filters

Vue.config.productionTip = true
Vue.use(ElementUI);
Vue.use(Buefy);
Vue.use(VueAxios, axios);

/* eslint-disable no-new */

Vue.filter('stringLengthConversion',function(str,len){
  var result = "";
  var strlen = 0;
  if (str) {
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
  }
  if(strlen < len){
    return result
  }else{
    return `${result}...`;
  }
})

Vue.filter('tabFormatter', function(str){
  if(str == 'Ask')
    return '问答'
  else if(str == 'Share')
    return '分享'
   else
    return '未知'
})

Vue.filter('timeFormatterToLast',function(dateVal){
 if (!dateVal) return '未知'
 var time = new Date().getTime() - dateVal;
 if (time < 0) {
   return '---'
 }  else if ((time / 1000 < 30)) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前'
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前'
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前'
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前'
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '个月前'
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
})

Vue.filter('timeFormatterToRest',function(dateVal){
 if (isNaN(dateVal)) return '未知'
  if (dateVal <= 0){
    return '---'
  } else if (dateVal / 1000 < 60) {
    return parseInt((dateVal / 1000)) + '秒'
  } else if ((dateVal / 60000) < 60) {
    return parseInt((dateVal / 60000)) + '分钟'
  } else if ((dateVal / 3600000) < 24) {
    var hours = parseInt(dateVal / 3600000);
    var minutes = parseInt((dateVal - hours * 3600000) / 60000);
    return hours + '小时' + minutes + '分钟'
  } else {
    var days = parseInt(dateVal / 86400000);
    var hours = parseInt((dateVal - days * 86400000) / 3600000);
    return days + '天' + hours + '小时'
  }

})



Vue.filter('timeFormatterToString',function(dateVal){
  var date = new Date(dateVal)
  var YY = date.getFullYear() + '-'
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return YY + MM + DD + " " + hh + mm + ss;
})

Vue.filter('timeFormatterToStringForDay',function(dateVal){
  var date = new Date(dateVal)
  var YY = date.getFullYear() + '-'
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
  return YY + MM + DD;
})

Vue.filter('timeFormatterToStringForMinute', function(dateVal){
  var date = new Date(dateVal)
  var YY = date.getFullYear()
  var thisDate = new Date();
  var thisYY = thisDate.getFullYear()
  if (YY == thisYY) {
    YY = ''
  } else {
    YY = YY + '-'
  }
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  return YY + MM + DD + " " + hh + mm;
})

Vue.filter('numberFormatter',function(value){
  var digit = -1;
  var number = value;
  while (number >= 1) {
    digit++;
    number = number / 10;
  }
  if (digit < 3) {
    return value;
  } else if (digit >= 3 && digit < 6) {
    var sNum = value / 1000;
    var nNum = parseFloat(sNum);
    if(!isNaN(nNum)) {
    	return nNum.toFixed(1) + "k";
    }
  } else if (digit >= 6 && digit < 9) {
    var sNum = value / 10000;
    var nNum = parseFloat(sNum);
    if(!isNaN(nNum)) {
    	return nNum.toFixed(1) + "w";
    }
  }else {
      var sNum = value / 10000000;
      var nNum = parseFloat(sNum);
      if(!isNaN(nNum)) {
      	return nNum.toFixed(1) + "kw";
    }
  }
})

Vue.filter('sexTransfrom', function(value){
  if(value == '-') {
    return "秘密"
  } else if (value == 'man') {
    return '男'
  } else if (value == 'woman') {
    return '女'
  } else {
    return '未知'
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
