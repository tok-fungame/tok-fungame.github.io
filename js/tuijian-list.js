var vum="";
gq.ready(function(){
	//获取token  
	var token=""
	gq.getToken(function(res){ 
		if(res.token!=null){  
		  token=res.token
		}     
		vv(token)
   })  
   gq.addEventListener("reload",function(){  
		    gq.getToken(function(res){ 
				if(res.token!=null){
					 vum.token=res.token  
				}else{
					vum.token=""
			  }  
			  Vue.http.headers.common['token'] = vum.token 
			 /* vum.limitStart=0; 
			  vum.onePage(0);
			  vum.mescroll.resetUpScroll();*/
		  });  
	 }) 
})  
function vv(token){ 
  Vue.http.headers.common['token'] = token
  vum=new Vue({
    el: '#app',
    data: { 
		list:[] , 
		count:"",
		state:"", 
		ismatch:false, 
		homename:"", 
		guestname:"", 
		homeid:"", 
		guestid:"" ,
		nomore:true,
		loading:true,
		mescroll:"",
		more:true,
	    limitStart:0,
		token:token,  
		ptype:0,
		sid:''  
  }, 
 created:function(){
	   this.onePage()  
    }, 
  mounted:function() { 
         this.initMescroll()
   },  
  methods: { 
	onePage:function(){
		var urlparam = location.search.replace('?','');
		if(urlparam!=""){
			this.sid = urlparam.split('&')[0].split('=')[1];
		}   
		this.$http.get(url+'rec/match?matchId='+ this.sid+"&playType="+this.ptype+"&limitStart="+this.limitStart+"&limitNum=20").then(function(response){ 
				 var res=response.body; 
				  this.list=[]  
				 if(res.code=="200"){ 
				  if(res.data.model.length==0 && res.data.news.length==0){
					   this.nomore=true
				   }else{
					  this.nomore=false 
				  } 
				   if(res.data.news.length<20){   
					   this.more=false  
					 }else{
						this.more=true 
					 }   
					 this.list = res.data 
					  this.loading=false 
					  this.$refs.wrapper.style.height=document.body.clientHeight+"px"
				 }else{ 
				    this.more=true
				    this.nomore=true
					this.loading=false   
					  this.$refs.wrapper.style.height=document.body.clientHeight+"px"                                                                                                   
			    }
				
			}, function(response){ 
                  this.loading=false  
				  this.more=true
				  this.nomore=true
				 
			})
	},   
	 jumpTo:function(val){
		 this.ptype=val 
		 this.limitStart=0
		 this.loading=true  
		 this.onePage()
	  }, 
	initMescroll :function(){
			 this.mescroll = new MeScroll("mescroll", {
					down: {
						auto: false, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
						callback: this.downCallback //下拉刷新的回调
					},
					up: {
						auto: false, //是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
						isBounce: true, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
						callback: this.upCallback, //上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); } 
						htmlNodata: '<p class="upwarp-nodata">———  中奖更简单  ———</p>'
					}
				});
			},
		 downCallback:function(){ 
			   var that=this; 
			  this.limitStart=0;
			  this.$http.get(url+'rec/match?matchId='+ this.sid+"&playType="+this.ptype+"&limitStart="+this.limitStart+"&limitNum=20").then(function(response){ 
				 var res=response.body; 
				  this.list=[]  
				 if(res.code=="200"){ 
				  if(res.data.model.length==0 && res.data.news.length==0){
					   this.nomore=true
				   }else{
					  this.nomore=false 
				  } 
				   if(res.data.news.length<20){   
					   this.more=false  
					 }else{
						this.more=true 
					 }  
					 this.mescroll.endSuccess();
					 this.list = res.data  
				 }else{ 
					 this.mescroll.endErr(); 
				    this.more=true
				    this.nomore=true 
			    }
				
			}, function(response){  
				  this.mescroll.endErr();  
				  this.more=true
				  this.nomore=true 
			})  
			},
		 upCallback:function(){ 
			   var that=this;
			  if(this.more){ 
				   this.limitStart=this.limitStart+20 
				   this.$http.get(url+'rec/match?matchId='+ this.sid+"&playType="+this.ptype+"&limitStart="+this.limitStart+"&limitNum=20").then(function(response){ 
					 var res=response.body; 
					 if(res.code=="200"){  
					   if(res.data.news.length<20){   
						   this.more=false  
						 }else{
							this.more=true 
						 } 
						this.mescroll.endBySize(this.list.news.length);
						this.list.news=this.list.news.concat(res.data.news);   
					 }else{  
						this.mescroll.endErr();
					}
					
				}, function(response){ 
					  this.mescroll.endErr();
					  this.more=true 
				})
			  }else{
				  this.mescroll.endErr();
			  }
			},    
	 opennative:function(type,id,name,event){  
			 var datas={ 
					 n:type,
					 v:{}
				   }   
				  if(type=="userinfo") {
					  datas.v.uid=id
					  datas.v.nickname=name
				      gq.open(datas)
				 }else if(type=="tjinfo"){ 
					  datas.v.id=id
					  gq.open(datas) 
				   }else{ 
					  gq.open(datas) 
				   }
			
		},
	openpaydx:function(see,scheduleId){ 
	    if(this.token==""){
		    gq.toLogin();
	      }else{
		  var datas={ 
					 title:"开通服务",
					 url: "",
					 nav_hidden:false
			  } 
			if(!see){  
					datas.url=linkurl+"vip-pay.html?kind=3&id="+scheduleId+"&type=3"
				 }else{ 
				    datas.title='八维指数'; 
					datas.url=linkurl+"dxmode-detail.html?id="+scheduleId 
			  }
			 gq.openH5(datas)
		 }
	}, 
   openpay:function(see,type,scheduleId){
	   var h5url="",title=""
	    if(this.token==""){
		   gq.toLogin();
	      }else{ 
			 var datas={  
					 title:"开通服务",
					 url: '',
					 nav_hidden:false
			 }    
		     if(see){
				 datas.url=linkurl+"vip-pay.html?kind=3&&type="+type
			 }else{
				 datas.url=linkurl+"vip-pay.html?kind=3&id="+scheduleId+"&type="+type
			 }
		    gq.openH5(datas)
		 }
	}, 
	}
 })   
 }