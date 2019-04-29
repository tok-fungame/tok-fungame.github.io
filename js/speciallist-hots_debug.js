var vum = "";
//  gq.ready(function(){
//获取token 
var token = ""
  , userId = ""
// 	gq.getToken(function(res){ 
// 		if(res.token!=null){  
// 		  token=res.token
// 			gq.info(function(res){  
// 			    userId=res.userId; 
// 				platform=res.platform  
platform = 0;
vv(token, userId, platform)
// 			})
// 		}   
//    })  
gq.addEventListener("reload", function() {
    gq.getToken(function(res) {
        if (res.token != null) {
            vum.token = res.token
            gq.info(function(res) {
                vum.userId = res.userId;
            })
        } else {
            vum.token = ""
        }
        Vue.http.headers.common['token'] = vum.token
        vum.limitStart = 0
        vum.limitStart1 = 0
    });
})
// })  
function vv(token, userId, platform) {
    Vue.http.headers.common['token'] = token
    vum = new Vue({
        el: '#app',
        data: {
            saleList: [],
            redList: [],
            mySwiper: "",
            loading: true,
            index: 0,
            limitStart: 0,
            limitStart1: 0,
            mescroll1: '',
            mescroll2: '',
            more1: true,
            more2: true,
            token: token,
            userId: userId,
            platform: platform
        },
        created: function() {
            var urlparam = location.search.replace('?', '');
            var type = urlparam.split('type=')[1];
            type = 1
            this.index = type
            this.salePage()
            this.redPage()
        },
        mounted: function() {
            var s = 0
            this.SwiperTo()
            this.mySwiper.slideTo(this.index, 1000, false)
            this.initMescroll()
            if (this.platform == 1) {
                s = 20
            }
            var clientH = document.body.clientHeight - 76 - s;
            document.querySelector('.swiper-wrapper').style.height = clientH + "px"
            document.querySelector('.swiper-container').style.height = clientH + "px"
        },
        methods: {
            salePage: function() {
                this.$http.get(url + 'rec/hotsalers/list?limitStart=' + this.limitStart + '&limitNum=20').then(function(response) {
                    var res = response.body;
                    if (res.code == "200") {
                        if (res.data.length > 0) {
                            if (res.data.length < 20) {
                                this.more1 = false
                            }
                            this.saleList = res.data
                        } else {
                            this.more1 = false
                        }
                    } else {
                        this.more1 = false
                    }
                    this.loading = false
                }, function(response) {
                    this.loading = false
                    this.more1 = false
                })
            },
            redPage: function() {
                this.$http.get(url + 'hotexpert/list?limitStart=' + this.limitStart1 + '&limitNum=20').then(function(response) {
                    var res = response.body;
                    if (res.code == "200") {
                        if (res.data.length > 0) {
                            if (res.data.length < 20) {
                                this.more2 = false
                            }
                            this.redList = res.data
                        } else {
                            this.more2 = false
                        }
                    } else {
                        this.more1 = false
                    }
                    this.loading = false
                }, function(response) {
                    this.loading = false
                    this.more2 = false
                })
            },
            initMescroll: function() {
                var that = this;
                this.mescroll1 = new MeScroll("mescroll1",{
                    down: {
                        auto: false,
                        callback: function() {
                            that.limitStart = 0;
                            that.$http.get(url + 'rec/hotsalers/list?limitStart=' + that.limitStart + '&limitNum=20').then(function(response) {
                                var res = response.body;
                                if (res.code == "200") {
                                    that.more1 = true
                                    if (res.data.length > 0) {
                                        if (res.data.length < 20) {
                                            that.more1 = false
                                        }
                                    } else {
                                        that.more1 = false
                                    }
                                    that.mescroll1.endSuccess();
                                    that.saleList = res.data
                                } else {
                                    that.mescroll1.endErr();
                                    that.more1 = false
                                }
                            }, function(response) {
                                that.mescroll1.endErr();
                                that.more1 = false
                            })
                        }
                    },
                    up: {
                        auto: false,
                        isBounce: false,
                        callback: function() {
                            if (that.more1) {
                                that.limitStart = that.limitStart + 20
                                that.$http.get(url + 'rec/hotsalers/list?limitStart=' + that.limitStart + '&limitNum=20').then(function(response) {
                                    var res = response.body;
                                    if (res.code == "200") {
                                        if (res.data.length < 20) {
                                            that.more1 = false
                                        } else {
                                            that.more1 = true
                                        }
                                        that.mescroll1.endBySize(that.saleList.length);
                                        that.saleList = that.saleList.concat(res.data);
                                    } else {
                                        that.mescroll1.endErr();
                                    }
                                }, function(response) {
                                    that.mescroll1.endErr();
                                })
                            } else {
                                that.mescroll1.endErr();
                            }
                        },
                        toTop: {
                            //配置回到顶部按钮
                            src: "mescroll/mescroll-totop.png",
                        },
                        htmlNodata: '<p class="upwarp-nodata">———  中奖更简单  ———</p>'
                    }
                });
                this.mescroll2 = new MeScroll("mescroll2",{
                    down: {
                        auto: false,
                        callback: function() {
                            that.limitStart1 = 0
                            that.$http.get(url + 'hotexpert/list?limitStart=' + that.limitStart1 + '&limitNum=20').then(function(response) {
                                var res = response.body;
                                if (res.code == "200") {
                                    that.more2 = true
                                    if (res.data.length > 0) {
                                        if (res.data.length < 20) {
                                            that.more2 = false
                                        }
                                    } else {
                                        that.more2 = false
                                    }
                                    that.mescroll2.endSuccess();
                                    that.redList = res.data
                                } else {
                                    that.mescroll2.endErr();
                                    that.more2 = false
                                }
                            }, function(response) {
                                that.mescroll2.endErr();
                                that.more2 = false
                            })
                        }
                    },
                    up: {
                        auto: false,
                        isBounce: false,
                        callback: function() {
                            if (that.more2) {
                                that.limitStart1 = that.limitStart1 + 20
                                that.$http.get(url + 'hotexpert/list?limitStart=' + that.limitStart1 + '&limitNum=20').then(function(response) {
                                    var res = response.body;
                                    if (res.code == "200") {
                                        if (res.data.length < 20) {
                                            that.more2 = false
                                        } else {
                                            that.more2 = true
                                        }
                                        that.mescroll2.endBySize(that.redList.length);
                                        that.redList = that.redList.concat(res.data);
                                    } else {
                                        that.mescroll2.endErr();
                                    }
                                }, function(response) {
                                    that.mescroll2.endErr();
                                })
                            } else {
                                that.mescroll2.endErr();
                            }
                        },
                        toTop: {
                            //配置回到顶部按钮
                            src: "mescroll/mescroll-totop.png",
                        },
                        htmlNodata: '<p class="upwarp-nodata">———  中奖更简单  ———</p>'
                    }
                });
            },
            changeNav: function(val) {
                this.index = val
                this.mySwiper.slideTo(val, 1000, false)
            },
            SwiperTo: function() {
                var me = this;
                this.mySwiper = new Swiper('.swiper-container',{
                    direction: 'horizontal',
                    on: {
                        slideChangeTransitionEnd: function() {
                            me.index = this.activeIndex;
                            //切换结束时，告诉我现在是第几个slide
                        },
                    }
                })
            },
            foucedClick: function(type, key, val, hasfouce) {
                if (this.token == "") {
                    gq.toLogin()
                } else {
                    if (hasfouce) {
                        this.focusRemove(type, key, val);
                    } else {
                        this.focusAdd(type, key, val)
                    }
                }
            },
            focusAdd: function(type, key, leaderId) {
                this.$http.post(url + "focus/add?leaderId=" + leaderId + "&followerId=" + this.userId).then(function(response) {
                    var res = response.data;
                    if (res.code == "200") {
                        gq.toast("关注成功");
                        if (type == 1) {
                            this.saleList[key].hasFocus = true
                        } else {
                            this.redList[key].hasFocus = true
                        }
                    } else {
                        gq.toast(res.msg);
                    }
                }, function(response) {
                    gq.toast(response.data.msg);
                })

            },
            focusRemove: function(type, key, leaderId) {
                this.$http.post(url + "focus/remove?leaderId=" + leaderId + "&followerId=" + this.userId).then(function(response) {
                    var res = response.data;
                    if (res.code == "200") {
                        gq.toast("取消成功");
                        if (type == 1) {
                            this.saleList[key].hasFocus = false
                        } else {
                            this.redList[key].hasFocus = false
                        }
                    } else {
                        gq.toast(res.msg);
                    }
                }, function(response) {
                    gq.toast(response.data.msg);
                })

            },
            opennative: function(val, name) {
                var datas = {
                    n: "userinfo",
                    v: {
                        uid: val,
                        nickname: name
                    }
                }
                gq.open(datas);
            }

        }

    })

}
