// JavaScript Document   
gq.ready(function(){
	//获取token 
	  
   gq.info(function(res){  
         var equipment=0,top="margin-top:0px",top1="margin-top:44px",hbg="";
		 var userId=res.userId; 
		 var platform=res.platform
		 if(platform==1){
			 equipment=1
			 top="margin-top:20px"
			 top1="margin-top:64px"
			 hbg="background: #DB2D21"
		 }else{
			 equipment=2
			 }
		 var urlparam = location.search.replace('?',''),index=0;
		 if(urlparam!=""){
		 		index = urlparam.split('=')[1];
		 } 
		  vv(userId,equipment,index,top,top1,hbg)   
		  gq.currentPage(linkurl+"message.html?index="+index) 
		})   
 })  
 //vv(106,1,0,"margin-top:0px","margin-top:44px","")
function vv(userId,equipment,index,top,top1,hbg){
 var vum=new Vue({
  el: '#app',
  data: {
	list1:[], 
	list2:[], 
	list3:[], 
	mySwiper: "",
	isShow1:true,
	isShow2:true,
	isShow3:true,
	index:index,
	top:top,
	top1:top1,
	hbg:hbg,
	pagenum1:1,
	pagenum2:1,
	pagenum3:1, 
	more1:true,
	more2:true,
	more3:true,
	equipment:equipment
  },
 created:function(){
	   this.messagePage()   
	   this.noticePage()    
	   this.letterPage()  
    },
  mounted:function() {   
    this.SwiperTo()  
	this.mySwiper.slideTo(this.index, 1000, false) 
    this.initMescroll(); 
    this.loadHeight(); 
  },  
	methods: {
		backclick:function() {  
	       gq.back(0);  
		},
		 messagePage:function() {  
			this.$http.get(url+'user/message_panel/recommend/'+userId+'?pagenum='+this.pagenum1+'&pagesize=10').then(function(response){ 
				 var res=response.body; 
				  if(res.code=="200"){ 
						if(res.data.length>0){ 
					         this.isShow1=false  
							 if(res.data.length<10){   
							     this.more1=false  
							 }else{
								this.more1=true  
							 } 
						 }else{
							  if(this.pagenum1==1){ 
								  this.isShow1=true 
							  }
							  this.more1=false 
						 } 
					 this.list1=res.data
				   }else{
				        this.isShow1=true   
						this.more1=false  
				 }  
			   }, function(response){
				     this.isShow1=true  
					 this.more1=false 
			})  
		},  
		noticePage:function() {  
			this.$http.get(url+'user/message_panel/notice?equipment='+this.equipment+'&userid='+userId+'&pagenum='+this.pagenum2+'&pagesize=10').then(function(response){ 
				 var res=response.body; 
				  if(res.code=="200"){  
						if(res.data.length>0){
					         this.isShow2=false  
							 if(res.data.length<10){   
							     this.more2=false  
							 }else{
								this.more2=true  
							 } 
						 }else{
							  if(this.pagenum2==1){ 
								  this.isShow2=true 
							  }  
							     this.more2=false  
						 } 
					 this.list2=res.data
				   }else{
				         this.isShow2=true   
						 this.more2=false  
				 }   
			   }, function(response){
				     this.isShow2=true    
					 this.more2=false  
			}) 
		}, 
		letterPage:function() {  
			this.$http.get(url+'user/message_panel/private/'+userId+'?pagenum='+this.pagenum3+'&pagesize=10').then(function(response){ 
				var res=response.body; 
				   if(res.code=="200"){  
						if(res.data.length>0){
					         this.isShow3=false  
							 if(res.data.length<10){ 
							   this.more3=false  
							 }else{
								this.more3=true  
							 } 
						 }else{
							  if(this.pagenum3==1){ 
								  this.isShow3=true 
							  }
							 this.more3=false  
						 } 
						 this.list3=res.data
					   }else{
					      this.isShow3=true
						 this.more3=false  
					 }   
			   }, function(response){
				      this.isShow3=true 
					  this.more3 = false; 
			})  
		}, 
		initMescroll :function(){
			  var that=this; 
			 this.mescroll1 = new MeScroll("mescroll1", {
					down: {
						auto: false,  
						callback:function(){
							  that.pagenum1=1;
							  that.$http.get(url+'user/message_panel/recommend/'+userId+'?pagenum='+that.pagenum1+'&pagesize=10').then(function(response){ 
									 var res=response.body; 
									  if(res.code=="200"){ 
											if(res.data.length>0){ 
												 that.isShow1=false  
												 if(res.data.length<10){   
													 that.more1=false  
												 }else{
													that.more1=true  
												 } 
											 }else{ 
												  that.isShow1=true  
												  that.more1=false 
											 } 
								          that.mescroll1.endSuccess();
										 that.list1=res.data
									   }else{
								            that.mescroll1.endErr(); 
											that.isShow1=true   
											that.more1=false  
									 }  
								   }, function(response){
								         that.mescroll1.endErr(); 
										 that.isShow1=true  
										 that.more1=false 
								})  
							}
					},
					up: {
						auto: false,  
						isBounce: false,  
						callback:function(){ 
							 if(that.more1){ 
								  that.pagenum1=that.pagenum1+1
								  that.$http.get(url+'user/message_panel/recommend/'+userId+'?pagenum='+that.pagenum1+'&pagesize=10').then(function(response) { 
									 var res=response.body;
									  if(res.code=="200"){  
										 if(res.data.length<10){
											 that.more1=false
										  }else{
											 that.more1=true
										  }
										   that.mescroll1.endBySize(that.list1.length);
										   that.list1=that.list1.concat(res.data);  
									 } else{
										  that.mescroll1.endErr();
									 } 
								}, function(response) {
									  that.mescroll1.endErr();
								})  
							  }else{
								  that.mescroll1.endErr();
							  }
						 },  
						toTop:{ //配置回到顶部按钮
							src : "mescroll/mescroll-totop.png",   
						},
						htmlNodata: '<p class="upwarp-nodata">———  中奖更简单  ———</p>'
					}
				}); 
			 this.mescroll2 = new MeScroll("mescroll2", {
					down: {
						auto: false,  
						callback:function(){
							  that.pagenum2=1;
							  that.$http.get(url+'user/message_panel/notice?equipment='+that.equipment+'&userid='+userId+'&pagenum='+that.pagenum2+'&pagesize=10').then(function(response){ 
									 var res=response.body; 
									  if(res.code=="200"){ 
											if(res.data.length>0){ 
												 that.isShow2=false  
												 if(res.data.length<10){   
													 that.more2=false  
												 }else{
													that.more2=true  
												 } 
											 }else{ 
												  that.isShow2=true  
												  that.more2=false 
											 } 
								          that.mescroll2.endSuccess();
										 that.list2=res.data
									   }else{
								            that.mescroll2.endErr(); 
											that.isShow2=true   
											that.more2=false  
									 }  
								   }, function(response){
								         that.mescroll2.endErr(); 
										 that.isShow2=true  
										 that.more2=false 
								})  
							}
					},
					up: {
						auto: false,  
						isBounce: false,  
						callback:function(){ 
							 if(that.more2){ 
								  that.pagenum2=that.pagenum2+1
								  that.$http.get(url+'user/message_panel/notice?equipment='+that.equipment+'&userid='+userId+'&pagenum='+that.pagenum2+'&pagesize=10').then(function(response) { 
									 var res=response.body;
									  if(res.code=="200"){  
										 if(res.data.length<10){
											 that.more2=false
										  }else{
											 that.more2=true
										  }
										   that.mescroll2.endBySize(that.list2.length);
										   that.list2=that.list2.concat(res.data);  
									 } else{
										  that.mescroll2.endErr();
									 } 
								}, function(response) {
									  that.mescroll2.endErr();
								})  
							  }else{
								  that.mescroll2.endErr();
							  }
						 },  
						toTop:{ //配置回到顶部按钮
							src : "mescroll/mescroll-totop.png",   
						},
						htmlNodata: '<p class="upwarp-nodata">———  中奖更简单  ———</p>'
					}
				}); 
				 this.mescroll3= new MeScroll("mescroll3", {
					down: {
						auto: false,  
						callback:function(){
							  that.pagenum3=1;
							  that.$http.get(url+'user/message_panel/private/'+userId+'?pagenum='+that.pagenum3+'&pagesize=10').then(function(response){ 
									 var res=response.body; 
									  if(res.code=="200"){ 
											if(res.data.length>0){ 
												 that.isShow3=false  
												 if(res.data.length<10){   
													 that.more3=false  
												 }else{
													that.more3=true  
												 } 
											 }else{ 
												  that.isShow3=true  
												  that.more3=false 
											 } 
								          that.mescroll3.endSuccess();
										 that.list3=res.data
									   }else{
								            that.mescroll3.endErr(); 
											that.isShow3=true   
											that.more3=false  
									 }  
								   }, function(response){
								         that.mescroll3.endErr(); 
										 that.isShow3=true  
										 that.more3=false 
								})  
							}
					},
					up: {
						auto: false,  
						isBounce: false,  
						callback:function(){ 
							 if(that.more3){ 
								  that.pagenum3=that.pagenum3+1
								  that.$http.get(url+'user/message_panel/private/'+userId+'?pagenum='+that.pagenum3+'&pagesize=10').then(function(response) { 
									 var res=response.body;
									  if(res.code=="200"){  
										 if(res.data.length<10){
											 that.more3=false
										  }else{
											 that.more3=true
										  }
										   that.mescroll3.endBySize(that.list3.length);
										   that.list3=that.list3.concat(res.data);  
									 } else{
										  that.mescroll3.endErr();
									 } 
								}, function(response) {
									  that.mescroll3.endErr();
								})  
							  }else{
								  that.mescroll3.endErr();
							  }
						 },  
						toTop:{ //配置回到顶部按钮
							src : "mescroll/mescroll-totop.png",   
						},
						htmlNodata: '<p class="upwarp-nodata">———  中奖更简单  ———</p>'
					}
				}); 
			}, 
	 loadHeight:function(){
			 var clientH=document.body.clientHeight; 
			 document.querySelector('.swiper-wrapper').style.height=clientH+"px"
			document.querySelector('.swiper-container').style.height=clientH+"px" 
				
		 },
	  SwiperTo:function(){  
	    var me=this; 
	    this.mySwiper = new Swiper('.swiper-container',{
             direction: 'horizontal', 
			 pagination:".navmsg",
			 paginationClickable:true,
			 paginationBulletRender:function(a,b){
				switch(a){
					case 0:
					   name="推荐";
					   break;
					case 1:
					   name="通知";
					   break;
					case 2:
					   name="私信";
					   break;
					default:
					   name=""
					 }
				return '<span class="'+b+'">'+name+'</span>'
				},
				onSlideChangeEnd: function(swiper){ 
				   var j = swiper.activeIndex+1, clientH=document.body.clientHeight-44; 
					me.index=swiper.activeIndex;
					if(document.querySelector('.msg'+j)==null){
						var content_height=clientH
					 }else{
					    var content_height=document.querySelector('.msg'+j).offsetHeight
					 }
					if(content_height<clientH){
						content_height=clientH
					 }
					 document.querySelector('.swiper-wrapper').style.height=content_height+"px"
					document.querySelector('.swiper-container').style.height=content_height+"px"  
				     gq.currentPage(linkurl+"message.html?index="+swiper.activeIndex) 
				}
        }); 
		
	 }, 
	 openclick :function(index,type,newsId,messageId,tit){ 
	     if(type==1){  
	            this.readMessage(index,userId,newsId,messageId) 
		 }else{   
		      this.list2[index].isRead=true
			  var data={
					title:tit,
					url: linkurl+"notice-info.html?id="+messageId
				 }
				 gq.ready(function(){  
						gq.openH5(data); 
				 })  
		} 
	 },  
	 openclick1 :function(index,type,newsId,messageId,pushUserId,userName){  
		 this.readLetter(index,userId,type,newsId,messageId,pushUserId,userName)   
	 },
	 readMessage:function(index,userId,newsId,messageId) {  
			this.$http.post(url+'user/message_panel/recommend?userId='+userId+'&messageId='+messageId).then(function(response){ 
				 var res=response.body;
				  if(res.code=="200"){ 
				     this.list1[index].isReaded=true
				      var data={
						   n:"tjinfo",
						   v:{
							   id:newsId
							 }
						}  
							gq.open(data);  
					}  
			   }, function(response){
			      return
			})  
		} ,  
	 readLetter:function(index,userId,type,newsId,messageId,pushUserId,userName) {  
			this.$http.post(url+'user/message_panel/private?id='+userId+'&messageId='+messageId).then(function(response){ 
				 var res=response.body;
				  if(res.code=="200"){ 
				     this.list3[index].isRead=true
				    if(type>0 && type<4){
						var data=""
						  if(type==3){
							 data={ 
								 n:"userinfo",
								 v:{
									 uid:pushUserId,
									 nickname:userName
								  }
								}    
						    }else{ 
							  data={
								   n:"tjinfo",
								   v:{
									   id:newsId
									 }
								   }
						 }  
						 gq.open(data); 
					 }else{
						  var data={
						    title:res.data.title,
					        url: linkurl+"message-info.html?id="+messageId
						 }
						 if(type==4){
							 data.title="升级通知"
						 }else if(type==5){
							 data.title="反馈回复"
						 }else if(type==6 || type==7){
							 data.title="提现通知"
						}else if(type==8){
							 data.title="派奖"
						 }else if(type==9){
							 data.title="审核拒绝"
						 }else if(type==10){
							 data.title="审核通过"
						 }else if(type==11){
							 data.title="红包派奖"
						 } else{
							 data.title="官方私信"
						 } 
						 gq.openH5(data);  
						
					 }
				     
					}  
			   }, function(response){
			      return
			})  
		},
		_initScroll:function(){ 
			  //初始化scroll区域 
			  if(!this.scroll){ 
				   this.scroll = new BScroll(this.$refs.wrapper, { 
						   click: true 
						}); 
					this.scroll.on('scroll', function(position){ //事件的回调函数
					   if(position.y > 30) {
						  vum.refreshtext = '释放立即刷新';
					   } 
				   })
			   // 滑动结束
				  this.scroll.on('touchEnd', function (position) {
					  if (position.y > 30) {   
						if(vum.reshchange){  
						   vum.reshchange=false;
						 setTimeout(function () { 
						        vum.pagenum1=1; 
						        vum.pagenum2=1;  
						        vum.pagenum3=1;  
							   vum.messagePage()   
							   vum.noticePage()    
							   vum.letterPage()  
							   vum.refreshtext = '下拉刷新';  
							   vum.reshchange=true;
							   gq.toast("刷新成功"); 
						  }, 600);   
					  }  
					}else if(position.y < (this.maxScrollY - 30)) { 
						if(vum.index==0 &&  vum.bottomhook1!="没有更多"){
					          gq.toast("加载中..."); 
						      vum.bottomhook1 = '加载中...';
							  if(vum.more1){
							     vum.bottomhook1 =  '查看更多'; 
								 setTimeout(function () {  
						             vum.pagenum1=vum.pagenum1+1; 
							         vum.messagePage()    
								  },400) 
								setTimeout(function () { 
										gq.toast("加载完成")  
									},600)
							  }else{
								 vum.bottomhook1 =  '没有更多';  
							   } 
						}else if(vum.index==1&&  vum.bottomhook2!="没有更多"){
					          gq.toast("加载中..."); 
							  vum.bottomhook2 = '加载中...';
							  if(vum.more2){
							     vum.bottomhook2 =  '查看更多'; 
								 setTimeout(function () {  
						             vum.pagenum2=vum.pagenum2+1; 
							         vum.noticePage()       
								  },400) 
								setTimeout(function () { 
										gq.toast("加载完成")  
									},600)
							  }else{
								 vum.bottomhook2 =  '没有更多';  
							   }
						}else if(vum.index==2&&  vum.bottomhook3!="没有更多"){
					          gq.toast("加载中..."); 
							  vum.bottomhook3 = '加载中...';
							  if(vum.more3){
							     vum.bottomhook3 =  '查看更多'; 
								 setTimeout(function () {  
						             vum.pagenum3=vum.pagenum3+1; 
							         vum.letterPage()     
								  },400)
								setTimeout(function () { 
										gq.toast("加载完成")  
									},600)
							  }else{
								 vum.bottomhook3 =  '没有更多';  
							   }
						}
						
					} 
				  })
			   }else{ 
					 this.scroll.refresh()  
				}
		} 
	} 
})
 
}
