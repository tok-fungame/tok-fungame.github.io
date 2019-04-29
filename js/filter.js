// JavaScript Document
function addZero(val){
 if(val < 10){
  return "0" +val;
 }else{
  return val;
 }
};
Vue.filter("formatTime",function(value,type){
	if(value==undefined) return
	value=value.replace(/-/g,'/')
var dataTime="";
var data = new Date(value);   
 var year   =  data.getFullYear();  
 var month  =  addZero(data.getMonth() + 1);  
 var day    =  addZero(data.getDate()); 
 var hour   =  addZero(data.getHours());
var minute =  addZero(data.getMinutes());
var second =  addZero(data.getSeconds());
if(type == "YMD"){
dataTime =  year + "-"+ month + "-" + day;
}else if(type == "MD"){
dataTime = month + "-" + day;
}else if(type == "YMDHMS"){
dataTime = year + "-"+month + "-" + day + " " +hour+ ":"+minute+":" +second;
}else if(type == "MDHM"){
dataTime = month + "-" + day + " " +hour+ ":"+minute;
}else if(type == "MDHMS"){
dataTime = month + "-" + day + " " +hour+ ":"+minute+":" + second;
}else if(type == "YMDHM"){
dataTime = year + "-"+month + "-" + day + " " +hour+ ":"+minute;
}else if(type == "HMS"){
dataTime = hour+":" + minute+":" + second;
}else if(type == "YM"){
dataTime = year + "-" + month; 
}else if(type == "HM"){
  dataTime =  hour+":" + minute
}
return dataTime;//将格式化后的字符串输出到前端显示
});

Vue.filter("timesTamp",function(value,type){
	if(value==undefined) return
var dataTime="";
var data = new Date(value);   
 var year   =  data.getFullYear();  
 var month  =  addZero(data.getMonth() + 1);  
 var day    =  addZero(data.getDate()); 
 var hour   =  addZero(data.getHours());
var minute =  addZero(data.getMinutes());
var second =  addZero(data.getSeconds());
if(type == "YMD"){
dataTime =  year + "-"+ month + "-" + day;
}else if(type == "MD"){
dataTime = month + "-" + day;
}else if(type == "YMDHMS"){
dataTime = year + "-"+month + "-" + day + " " +hour+ ":"+minute+":" +second;
}else if(type == "MDHM"){
dataTime = month + "-" + day + " " +hour+ ":"+minute;
}else if(type == "YMDHM"){
dataTime = year + "-"+month + "-" + day + " " +hour+ ":"+minute;
}else if(type == "HMS"){
dataTime = hour+":" + minute+":" + second;
}else if(type == "YM"){
dataTime = year + "-" + month; 
}else if(type == "HM"){
  dataTime =  hour+":" + minute
}
return dataTime;//将格式化后的字符串输出到前端显示
});

Vue.filter("dateTamp",function(value){
	if(value==undefined) return
	value=value.replace(/-/g,'/')
	var time1=""
	var time= parseInt(new Date().getTime()/1000)-parseInt(new Date(value).getTime()/1000)
	 if(time > 3600*24){  
		 var data = new Date(value); 
		 var year   =  data.getFullYear();  
		 var month  =  addZero(data.getMonth() + 1);  
		 var day    =  addZero(data.getDate()); 
		 var hour   =  addZero(data.getHours());
		 var minute =  addZero(data.getMinutes());
		 var second =  addZero(data.getSeconds()); 
		 time1= month + "-" + day + " " +hour+ ":"+minute;   
	  }else if(time > 3600){ 
		time1=parseInt(time/3600)+"小时前" 
	  } else if(time > 60){
		time1=parseInt(time/60)+"分钟前" 
	  }else{
		time1="刚刚"
	  }   
	 return time1;		
});
 Vue.filter('sbsname', function (value,type) { 
       if(value==undefined) return
         var newval=value;
        if(value.length>type){
			newval=value.substr(0,type)+'...' 
		}
       return   newval
	});
 Vue.filter('retext', function (value,type) { 
         if(value!=undefined){ 
         var newval=value; 
       return newval.replace(/元/g,type)	 
	   }
	});
	Vue.filter('modeText', function (value) { 
         var newval="" 
		if(value==1){
			newval="临场胜平负" 
		 } else if(value==4){
			newval="初始胜平负"
		 } else if(value==2){
			newval="临场亚指"
		 } else if(value==5){
			newval="初始亚指"
		 } else if(value==3){
			newval="八维指数"
		 }  else if(value==6){
			newval="高赔爆冷"
		 } 
       return newval
	});
	
	
 Vue.filter('modeFilter', function (value) { 
         var newval="" 
		if(value==2){
			newval=7
		 } else if(value==3){
			newval=30
		 } else if(value==4){
			newval=90
		 } 
       return newval
	});
	
 Vue.filter('filterTQ', function (value) { 
          if(value==undefined) return
		  var newval="";
          if(value==1){
			newval="天晴"
		 }else if(value==2){
			newval="大致天晴"
		 }else if(value==3){
			newval="间中有云"
		 }else if(value==4){
			newval="多云"
		 }else if(value==5){
			newval="微雨"
		 }else if(value==6){
			newval="大雨"
		 }else if(value==7){
			newval="雪"
		 }else if(value==8){
			newval="雷暴"
		 }else if(value==9){
			newval="地区性雷暴"
		 }else if(value==10){
			newval="有雾"
		 }else if(value==11){
			newval="中雨"
		 }else if(value==12){
			newval="阴天"
		 }else if(value==13){
			newval="雷陣雨"
		 }else{
			newval="天晴"
		 }
		 return  newval  
	});
	
 Vue.filter('hideInt', function (value,type) { 
        if(value==undefined) return
		 if(type==1){
			//手机号
			var newval = value.substr(0, 3) + '****' + value.substr(7);
		 }else if(type==2) {
			 //身份证
			var newval = value.substr(0, 10) + '****' + value.substr(value.length-3);
		 }
        return newval
	   
	});

 Vue.filter('banklogo', function (value,type) { 
        if(value==undefined) return
		  var newval=1
		if(value=="工商银行" || value.indexOf("工商")>-1){
			newval=1
		 }else if(value=="建设银行" || value.indexOf("建设")>-1){
			newval=2
		 }else if(value=="招商银行" || value.indexOf("招商")>-1){
			newval=3
		 }else if(value=="农业银行" || value.indexOf("农业")>-1){
			newval=4
		 }else if(value=="交通银行" || value.indexOf("交通")>-1){
			newval=5
		 }else if(value.indexOf("广发")>-1 || value.indexOf("广东发展")>-1){
			newval=6
		 }else if(value.indexOf("中国银行")>-1){
			newval=7
		 }else if(value.indexOf("民生银行")>-1){
			newval=8
		 }else if(value.indexOf("华夏银行")>-1){
			newval=9
		 }else if(value.indexOf("北京银行")>-1){
			newval=10
		 }else if(value.indexOf("平安银行")>-1){
			newval=11
		 }else if(value.indexOf("浦东发展")>-1 || value.indexOf("浦发")>-1){
			newval=12
		 }else if(value.indexOf("上海银行")>-1){
			newval=13
		 }else if(value=="兴业银行" || value.indexOf("兴业")>-1){
			newval=14
		 }else if(value=="中国光大" || value.indexOf("光大")>-1){
			newval=15
		 }else if(value.indexOf("邮政")>-1 || value.indexOf("邮储")>-1){
			newval=16
		 }else if(value=="中信银行" || value.indexOf("中信")>-1){
			newval=17
		 }
		 if(type==1){
          return "brank/icon-"+newval+".png"
		 }else{
          return "brank/icon-sma"+newval+".png"
		 }
	   
	});
 Vue.filter('splitInt', function (value) {  
	 if(/\S{5}/.test(value)){
		 value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
	    return value
	  } 
 })
 
 Vue.filter('filterYagoal', function (value,type) {  
     var s='';
	 if(type==1){
		 if(value.indexOf('-')>-1){
			 s=value
		 }else{
			 s='+'+value
		 }
	 }else{
		  if(value.indexOf('-')>-1){
			 s=value.replace('-', '+')
		 }else{
			 s='-'+value
		 }
	  } 
    return s
 })
 