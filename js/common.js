/*var url='https://mobile.gunqiu.com:82/interface/v3.6/';
var qturl='https://mobile.gunqiu.com:82/';
var urlchange='https://mobile.gunqiu.com:82/'; */
var url='https://mobile.gunqiu.com/interface/v3.6/';
var qturl='https://mobile.gunqiu.com/';
var urlchange='https://mobile.gunqiu.com/'; 
var zdurl='wss://mobile.gunqiu.com/ws/';
var linkurl='/'; 
var urlcup="https://mobile.gunqiu.com/interface/wcup/";
var jikaicai_h5_url="https://lite.9yu.tv/lottery?source=gunqiu"; 
var jc_h5_url="https://api.zqjc.gunqiu.com/beta_h5/#/?type=1";  
var qudao=[""]
var packageName=["com.gunqiu.sport"]
var chaturl="https://mobile.gunqiu.com/appH5/chat/#/?roomId="

window.onload=function () {  
  document.addEventListener('touchstart',function (event) {  
    if(event.touches.length>1){  
      event.preventDefault();  
    }  
  })  
  var lastTouchEnd=0;  
  document.addEventListener('touchend',function (event) {  
    var now=(new Date()).getTime();  
    if(now-lastTouchEnd<=300){  
      event.preventDefault();  
    }  
    lastTouchEnd=now;  
  },false)  
}   
function touchScorll(touch){
	// 禁止
	if(touch){
		$("body").addClass("hidescorll")
   document.body.addEventListener('touchmove', _preventDefault);
 }else{
		 // 恢复
		 $("body").removeClass("hidescorll")
     document.body.removeEventListener('touchmove', _preventDefault);
   }  
 }	
 function _preventDefault(e) { e.preventDefault(); } 
 function getUrlParam(k) {
  var regExp = new RegExp('([?]|&)' + k + '=([^&]*)(&|$)');
  var result = window.location.href.match(regExp);
  if (result) {
    return decodeURIComponent(result[2]);
  } else {
    return '';
  }
}
function focusAdd(leaderId,type) {  
 $.ajax({
  url: url+"focus/add?leaderId="+leaderId+"&followerId="+localStorage.getItem("id"),
  async:false, 
  type:"POST", 
  success: function(s){   
   if(s.code==200){  
     var toastdata={
      "text":"关注成功",
      "time":1000
    }   
    gq.ready(function(){  
     gq.toast(toastdata);  
   });  
  }else{	
    var toastdata={
      "text":s.msg,
      "time":1000
    }   
    gq.ready(function(){  
     gq.toast(toastdata);  
   });  
  } 
}, 
error: function(){   
 var toastdata={
  "text":"网络连接异常",
  "time":1000
}   
gq.ready(function(){  
 gq.toast(toastdata);  
});  
}
}) 
} 
function focusRemove(leaderId) {  
 $.ajax({
  url: url+"focus/remove?leaderId="+leaderId+"&followerId="+localStorage.getItem("id"),
  async:false, 
  type:"POST",
  success: function(s){   
   if(s.code==200){  
    var toastdata={
      "text":"取消成功",
      "time":1000
    }   
    gq.ready(function(){  
     gq.toast(toastdata);  
   });
    
  }else{	
   var toastdata={
    "text":s.msg,
    "time":1000
  }   
  gq.ready(function(){  
   gq.toast(toastdata);  
 }); 
} 
}, 
error: function(){   
  var toastdata={
    "text":"网络连接异常",
    "time":1000
  }   
  gq.ready(function(){  
   gq.toast(toastdata);  
 }); 
  
}
}) 
} 
function tips(textVal){
 var A = null;
 var B = null; 
 clearTimeout(A);
 clearTimeout(B);
 /*用js方式生成手机端提示*/
 if($(".tips").length){
  $(".tips").remove();
}
$("body").append("<div class='tips'>"+textVal+"</div>");
$(".tips").fadeIn(500);
A = setTimeout(function(){
  $(".tips").fadeOut(500);
},1000);
B = setTimeout(function(){
  $(".tips").remove();
},2000);   
}
window.onload=function () {   
  document.addEventListener('touchstart',function (event) {  
    if(event.touches.length>1){  
      event.preventDefault();  
    }  
  })  
  var lastTouchEnd=0;  
  document.addEventListener('touchend',function (event) {  
    var now=(new Date()).getTime();  
    if(now-lastTouchEnd<=300){  
      event.preventDefault();  
    }  
    lastTouchEnd=now;  
  },false)  
}  

function init(){    
  $.ajaxSetup({
   async : false,
   data :"t="+new Date().getTime()
 });
  String.prototype.temp = function (obj) {
    return this.replace(/\$\w+\$/gi, function (matchs) {
      var returns = obj[matchs.replace(/\$/g, "")];
      return (returns + "") == "undefined" ? "" : returns;
    }); 

  } 
  
}


Date.prototype.format = function(format) {
 var date = {
  "M+": this.getMonth() + 1,
  "d+": this.getDate(),
  "h+": this.getHours(),
  "m+": this.getMinutes(),
  "s+": this.getSeconds(),
  "q+": Math.floor((this.getMonth() + 3) / 3),
  "S+": this.getMilliseconds()
};
if (/(y+)/i.test(format)) {
  format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
}
for (var k in date) {
  if (new RegExp("(" + k + ")").test(format)) {
   format = format.replace(RegExp.$1, RegExp.$1.length == 1
    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
 }
}
return format;
}; 
function timeShow(times){ 
 var time= parseInt(new Date().getTime()/1000)-parseInt(times/1000) 
 if(time > 3600*24)
 {   
   times=new Date(times).format('MM-dd hh:mm');   
 }
 else if(time > 3600)
 { 
  times=parseInt(time/3600)+"小时前" 
}
else if(time > 60)
{
  times=parseInt(time/60)+"分钟前" 
}else{
  times="刚刚"
}  
return times;
}	
	//根据成的时间对象生成时间戳 
  function timestamp(time){
   time = time.replace(/-/g,'/'); 
   var date = new Date(time).getTime(); 
   return date;
 } 
 window.cookieStorage = (new (function(){  
  var maxage = 60*60*24*1000;  
  var path = '/';  
  
  var cookie = getCookie();  
  
  function getCookie(){  
    var cookie = {};  
    var all = document.cookie;  
    if(all === "")  
      return cookie;  
    var list = all.split("; ");  
    for(var i=0; i < list.length; i++){  
      var cookies = list[i];  
      var p = cookies.indexOf("=");  
      var name = cookies.substring(0,p);  
      var value = cookies.substring(p+1);  
      value = decodeURIComponent(value);  
      cookie[name] = value;  
    }  
    return cookie;  
  }  
  
  var keys = [];  
  for(var key in cookie)  
    keys.push(key);  
  
  this.length = keys.length;  
  
  this.key = function(n){  
    if(n<0 || n >= keys.length)  
      return null;  
    return keys[n];  
  };  
  
  this.setItem = function(key, value){  
    if(! (key in cookie)){  
      keys.push(key);  
      this.length++;  
    }  
    
    cookie[key] = value;  
    var cookies = key + "=" +encodeURIComponent(value);  
    if(maxage)  
      cookies += "; max-age=" + maxage;  
    if(path)  
      cookies += "; path=" + path;  
    
    document.cookie = cookies;  
  };  
  
  this.getItem = function(name){  
    return cookie[name] || null;  
  };  
  
  this.removeItem = function(key){  
    if(!(key in cookie))  
      return;  
    
    delete cookie[key];  
    
    for(var i=0; i<keys.length; i++){  
      if(keys[i] === key){  
        keys.splice(i, 1);  
        break;  
      }  
    }  
    this.length--;  
    
    document.cookie = key + "=; max-age=0";  
  };  
  
  this.clear = function(){  
    for(var i=0; i<keys.length; i++)  
      document.cookie = keys[i] + "; max-age=0";  
    cookie = {};  
    keys = [];  
    this.length = 0;  
  }; 
})());  
 window.myStorage = (new (function(){  
  
    var storage;    //声明一个变量，用于确定使用哪个本地存储函数  
    
    if(window.localStorage){  
        storage = localStorage;     //当localStorage存在，使用H5方式  
      }  
      else{  
        storage = cookieStorage;    //当localStorage不存在，使用兼容方式  
      }  
      
      this.setItem = function(key, value){  
        storage.setItem(key, value);  
      };  
      
      this.getItem = function(name){  
        return storage.getItem(name);  
      };  
      
      this.removeItem = function(key){  
        storage.removeItem(key);  
      };  
      
      this.clear = function(){  
        storage.clear();  
      };  
    })());  


 function setCookie(name, value, timeout) {
  var d = new Date();
  d.setDate(d.getDate() + timeout);
  document.cookie = name + '=' + encodeURI(value) + ';expires=' + d;
}
function getCookie(name) {
  var arr = document.cookie.split('; ');
  for ( var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('='); //['abc','cba']
        if (arr2[0] == name) {
          return arr2[1];
          console.log(arr2[1]);
        }
      }
      return '';
    }
    function read_cookie(name){
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    }
