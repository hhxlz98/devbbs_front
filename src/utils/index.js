function aaa(){
  console.log("1111")
}

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

export default {
  stringLengthLongerThan,
}
