var vum="",token="",userId="";
gq.ready(function(){
	//获取token 
	gq.getToken(function(res){ 
		if(res.token!=null){
			token=res.token  
		}else{
			token=""
		} 
		gq.info(function(res){
			userId=res.userId   
			vv(token,userId)
		})      
	})  
	gq.addEventListener("reload",function(){  
		gq.getToken(function(res){ 
			if(res.token!=null){
				vum.token=res.token  
			}else{
				vum.token=""
			} 
			Vue.http.headers.common['token'] = vum.token
			gq.info(function(res){
				userId=res.userId 
				vum.userId=userId
			})   
			 // vum.limitStart=0;
			 // vum.loadPage(vum.limitStart)  
			});  
	}) 
})   
function vv(token,userId){ 
	Vue.http.headers.common['token'] = token
	vum=new Vue({
		el: '#app',
		data: {
			ids:[],
			list:[],
			bannerList:[],
			hotList:[],
			saleList:[],
			redList:[],
			modeList:[],
			limitStart:0,
			ishot:false,
			isred:false,
			issale:false,
			more:true,
			isShow:false, 
			bannerSwiper:"", 
			redSwiper:"", 
			hotSwiper:"", 
			saleSwiper:"",   
			mescroll:'',
			loading:true,
			token:token,
			tab:0,
			index:0,/*1热销,0热门*/
			userId:userId
		},  
		created:function(){ 
			this.modelShow() 
			this.positionIndex()
			this.banner()
			this.hotexpert()
			this.saleexpert()
			this.redexpert()
			this.loadPage()
			this.updateGuestIds()
		},
		mounted:function() {  
			this.SwiperTo()  
			var me=this
			this.initMescroll() 
		},  
		methods: { 
			updateGuestIds:function() {
				var that = this;
				WebViewJavascriptBridge.callHandler("guestId", "", function(n) {
					that.ids = JSON.parse(n).ids;
				})
			},
			modelShow:function(){
				this.$http.get(url+'recommend/model/show').then(function(response) { 
					var res=response.body;
					this.modeList=[];
					if(res.code=="200"){   
						for(v in res.data){
							if(res.data[v]==1){
								classname="spf";
								type=1
							}else if(res.data[v]==2){
								classname="ya";
								type=2
							}else if(res.data[v]==3){
								classname="dx";
								type=3
							}else if(res.data[v]==4){
								classname="spf";
								type=4
							}else if(res.data[v]==5){
								classname="ya";
								type=5
							}else {
								classname="spf";
								type=6
							} 
							this.modeList.push({classname:classname,type:type})	
						}
					}
				}, function(response) {
					
				}) 
			},
			positionIndex:function(){
				this.$http.get(url+'hotsalerhot/position').then(function(response) { 
					var res=response.body;
					if(res.code=="200"){   
						if(res.data=='1,2'){
							this.index=1
							this.tab=1
						}else{
							this.index=0
							this.tab=0
						}	 
					} 
				}, function(response) {
					
				}) 
			}, 
			bannerChange:function(linkType,url2,title,tabType,extension1,extension2,content){   
				gq.UMAnalytics("tjdtjdt")  
				if(linkType==1){ 
					this.openh5News(url2,title)
				}else if(linkType==2){
					this.focusNews(url2,tabType)
				}else if(linkType==3){ 
					gq.openBrowser(url2)
				}else if(linkType==4){
					this.opennative('tjinfo',url2,'','')
				}else if(linkType==5){
					this.opennative('userinfo',extension1,extension2,'')
				}else if(linkType==6){ 
					var datas={   
						title:title,
						url:linkurl+'focus-info.html?title='+encodeURIComponent(title)+"&content="+encodeURIComponent(content)    
					}  
					gq.openH5(datas)  
				}else if(linkType==8){
					this.openMode(1)
				}else if(linkType==9){
					this.openMode(2)
				}else if(linkType==7){
					this.openMode(3)
				}else if(linkType==12){
					this.openMode(4)
				}else if(linkType==13){
					this.openMode(5)
				}else if(linkType==16){
					this.openMode(6)
				}else if(linkType==18){ 
					url2=url2.replace(/\s/g,"") 
					var datas={   
						title:"滚球独家",
						url:linkurl+'fastnews-show.html?id='+url2 
					}  
					gq.openH5(datas)   
				}else if(linkType==23){ 
					url2=url2.replace(/\s/g,"") 
					var datas={   
						title:"主题帖",
						url:linkurl+'board-show.html?id='+url2 
					}  
					gq.openH5(datas)   
				}else {
					return
				}  
				
			},
			openh5News:function(val,title){  
				if(val.indexOf("className")>-1){  
					var ns=val.split("=")[1];
					var urls=val.split("?")[0];
					var datas={ 
						n:ns,
						v:{
							url:urls 
						}
					}  
					gq.open(datas)    
				}else{
					var nav=false
					if(val.indexOf("happy")>-1){
						title=""
						nav=true
					}
					var datas={ 
						title:title,
						url:val,
						nav_hidden: nav
					}   
					gq.openH5(datas)
				}  
			},
			openh5:function(val,name){  
				var datas={ 
					title:name, 
					url:val 
				}   
				gq.openH5(datas);  
				
			},
			openhot:function(val,name,eventID){  
				gq.UMAnalytics(eventID)
				var datas={ 
					title:'', 
					url:linkurl+val,
					nav_hidden: true 
				}   
				gq.openH5(datas);  
				
			}, 
			openbill:function(val,eventID){  
				gq.UMAnalytics(eventID)
				var datas={ 
					title:'', 
					url:linkurl+val,
					nav_hidden: true 
				}   
				gq.openH5(datas);  
				
			}, 
			opennative:function(type,id,name,eventID){  
				if(eventID!=""){
					gq.UMAnalytics(eventID)
				}
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
			opentap:function(type,k,eventID){  
				gq.UMAnalytics(eventID)  
				if(type=="tj") {
					var datas={ 
						n:type,
						v:{
							playType:k
						}
					}
				} else{
					var datas={ 
						n:type,
						v:{}
					}
				} 
				gq.open(datas);  
			},
			openfollow:function(type){  
				if(this.token==""){
					g1.toLogin()
				}else{
					var datas={ 
						n:type,
						v:{
							userId:this.userId,
							selectedIndex:0
						}
					} 
					gq.open(datas);
				}    
			},
			openMode:function(val){   
				var h5url="",title=""  
				if(val==1){
					h5url="spfmode.html";
					title="临场胜平负"   
				}else if(val==4){
					h5url="cpspfmode.html"; 
					title="初始胜平负"     
				}else if(val==2){
					h5url="yamode.html";  
					title="临场亚指"      
				}else if(val==5){
					h5url="cpyamode.html"; 
					title="初始亚指"      
				}else if(val==3){
					h5url="dxmode.html";   
					title="八维指数"     
				}else{
					h5url="blmode.html";   
					title="高赔爆冷"     
				}
				var datas={ 
					title:"",
					url:linkurl+h5url,
					nav_hidden:true 
				}   
				gq.openH5(datas) 
			},
			focusNews:function(id,tabType){ 
				var datas={ 
					n:"match_detail",
					v:{
						sid:id.toString(),
						CurrentIndex:tabType,
						Tran:"" 
					}
				}    
				gq.open(datas);  
				
			},
			banner:function(){
				this.$http.get('https://tok-fungame.github.io/focuspicture.json').then(function(response) { 
					var res=response.data;
					if(res.code=="200"){ 
						this.bannerList=res.data; 
					}
				}, function(response) {
					
				}) 
			},
			hotexpert:function(){
				this.$http.get(url+'queryhotexpert?limitStart=0&limitNum=48').then(function(response) { 
					var res=response.data;
					if(res.code=="200"){ 
						var json=res.data
						if(json.length>0){ 
							this.hotList= this.splitArray(8,json);  
						}else{
							this.ishot=true
						} 
					}
				}, function(response) {
					this.ishot=true
				})   
			},
			redexpert:function(){
				this.$http.get(url+'rec/reders?limitStart=0&limitNum=32').then(function(response) { 
					var res=response.data;
					if(res.code=="200"){ 
						var json=res.data
						if(json.length>0){
							this.redList= this.splitArray(8,json);   
						}else{
							this.isred=true
						} 
					}
				}, function(response) {
					this.isred=true
				})   
			},
			saleexpert:function(){
				this.$http.get(url+'rec/hotsalers?limitStart=0&limitNum=48').then(function(response) { 
					var res=response.body;
					if(res.code=="200"){ 
						var json=res.data
						if(json.length>0){  
							this.saleList= this.splitArray(8,json);  
						}else{
							this.issale=true
						} 
					}
				}, function(response) {
					this.issale=true
				})   
			}, 
			splitArray:function(N,Q){
				var R = [],F;
				for (F = 0;F < Q.length;) R.push(Q.slice(F,F += N))
					return R
			}, 
			tabChange:function(tab){ 
				this.tab=tab
			},
			SwiperTo:function(){ 
				var that=this; 
				setTimeout(function () {  
					that.bannerSwiper = new Swiper('#banner',{ 
						loop : false,
						observer:true, 
						observeParents:true, 
						autoplay:{
							delay: 3000,
							disableOnInteraction: false,
						},	 
						pagination: {
							el:'.bannerPagination',
							clickable :true,
						}   
					})   
				},100)
				setTimeout(function () {  
					that.hotSwiper = new Swiper('#hot',{
						direction: 'horizontal', 
						pagination: {
							el:'.hotPagination',
							clickable :true,
						}  
					}) 
					that.redSwiper = new Swiper('#red',{
						direction: 'horizontal', 
						pagination: {
							el:'.redPagination',
							clickable :true,
						}  
					})
					that.saleSwiper = new Swiper('#sale',{
						direction: 'horizontal', 
						pagination: {
							el:'.salePagination',
							clickable :true,
						}  
					})	
				},1000)  
			}, 
			loadPage:function() { 
				this.$http.get(url+'rec/index?limitStart='+this.limitStart+'&limitNum=20').then(function(response) { 
					var res=response.body;
					if(res.code=="200"){ 
						if(res.data.length>0){
							if(res.data.length<20){   
								this.more=false  
							}else{
								this.more=true 
							} 
						}else{
							this.isShow =true; 
							this.more=false  
						}  
						this.list=res.data
					}else{
						this.isShow =true; 
						this.more=false   
					} 
					this.loading=false  
					this.$refs.wrapper.style.height=document.body.clientHeight+"px"
				}, function(response) {
					this.loading=false
					this.more=false   
				})
			},
			fabuTj:function(){
				
			},
			initMescroll :function(){
				this.mescroll = new MeScroll("mescroll", {
					down: {
						auto: false,  
						callback: this.downCallback  
					},
					up: {
						auto: false,  
						isBounce: false,  
						callback: this.upCallback,  
						toTop:false,
						htmlNodata: '<p class="upwarp-nodata">———  中奖更简单  ———</p>'
					}
				});
			},
			downCallback:function(){ 
				var that=this;
				that.bannerSwiper.destroy(); 
				that.hotSwiper.destroy();
				that.saleSwiper.destroy();
				that.redSwiper.destroy(); 
				that.modelShow() 
				that.positionIndex()  
				that.banner()
				that.hotexpert()
				that.saleexpert()
				that.redexpert()    
				that.SwiperTo()   
				that.limitStart=0 
				that.$http.get(url+'rec/index?limitStart=0&limitNum=20').then(function(response) { 
					var res=response.data;
					if(res.code=="200"){ 
						if(res.data.length>0){ 
							if(res.data.length<20){ 
								that.more=false  
							}else{
								that.more=true  
							}
						}else{
							that.more=false  
							that.isShow =true;  
						} 
						that.mescroll.endSuccess();
						that.list=res.data   
					}else{
						that.mescroll.endErr(); 
						that.isShow =true;  
						that.more=false  
					}  
					
				}, function(response) { 
					that.mescroll1.endErr();
					that.more=false  
					that.isShow =true;  
				})  
				WebViewJavascriptBridge.callHandler("guestId", "", function(n) {
					that.ids = JSON.parse(n).ids;
				})
			},
			upCallback:function(){
				var that=this;
				if(that.more){ 
					that.limitStart=that.limitStart+20
					that.$http.get(url+'rec/index?limitStart='+that.limitStart+"&limitNum=20").then(function(response) { 
						var res=response.body;
						if(res.code=="200"){  
							if(res.data.length<20){
								that.more=false
							}else{
								that.more=true
							}
							that.mescroll.endBySize(that.list.length);
							that.list=that.list.concat(res.data);  
						} else{
							that.mescroll.endErr();
						} 
					}, function(response) {
						that.mescroll.endErr();
					})  
				}else{
					that.mescroll.endErr();
				}
				
			}
		} 
	})

}