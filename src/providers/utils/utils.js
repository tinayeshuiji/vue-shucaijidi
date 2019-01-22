import Global from '../../data/global';
function formatPhoneNumber(number){//手机号码格式化
  return number.slice(0,3) + ' ' + number.slice(3,7) + ' '+ number.slice(7,11);
}
//获取token
function getToken() {
  let token = localStorage.getItem(Global.MALL_MEMBER_TOKEN_KEY);
  if (!token||token == null || token == "") {
    token = guid();
    localStorage.setItem(Global.MALL_MEMBER_TOKEN_KEY, token);
  }
  return token;
}
function guid() {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
//存储token
function storeToken(token) {
  localStorage.setItem(Global.MALL_MEMBER_TOKEN_KEY, token);
}
//移除token
function removeToken() {
  localStorage.removeItem(Global.MALL_MEMBER_TOKEN_KEY);
}

function compressImg(img) {//压缩图片，传入图片base64，返回压缩后的base64
  let promise = new Promise((resolve, reject) => {
    try{
      let imgCom = new Image()
      imgCom.src = img;
      imgCom.onload = function () {
        let imgCom2 = new Image()
        let canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = imgCom.height * 1080 / imgCom.width;
        canvas.getContext("2d").drawImage(imgCom,0,0,canvas.width,canvas.height);
        imgCom2.src = canvas.toDataURL("image/jpeg", 0.8);
        resolve(imgCom2.src)
      }
    }catch(err){
      reject(err)
    }
  });
  return promise;
}

export default {
  formatPhoneNumber,
  //获取token
  getToken,
  storeToken,
  removeToken,
  compressImg
}
