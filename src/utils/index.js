import { MessageBox } from 'element-ui';
import { Notification } from 'element-ui';


const baseUrl = "http://localhost:9091"


function stringLengthLongerThan(str, len){
  var strlen = 0;
  for(var i = 0;i < str.length; i++){
      if(str.charCodeAt(i) > 255){
        strlen += 2; //如果是汉字，则字符串长度加2
      } else {
        strlen++;
      }
  }
  if(strlen > len)
    return true;
  else
    return false;
}

function userLoginInfo() {
  Notification({
      title: '请登录',
      message: '登录后可进行更多操作~',
      type: 'error',
      duration: 0
    });
}

export default {
  baseUrl,
  stringLengthLongerThan,
  userLoginInfo,
}
