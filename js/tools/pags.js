define(['jquery','path'], function($,pub) {
	var _newobj = "",
		_self   = {
		//ajax调用公共方法
		getAjax: function(requestUrl,requestData,SuccessCallback){	
			if($("body").attr("requestData") == requestData){
				SuccessCallback(_newobj, null);
			}else{
				$.get(requestUrl,requestData,function(data){
					_newobj = data;					
					$("body").attr({"httpType":"getAjax","requestData":requestData});
					if(SuccessCallback != undefined){
						SuccessCallback(data, null);
					}
				},"json");
			}
		},
		postAjax: function(requestUrl,requestData,SuccessCallback){
			if($("body").attr("requestData") == requestData){				
				SuccessCallback(_newobj, null);
			}else{
				$.post(requestUrl,requestData,function(data){
					_newobj = data;	
					console.log(_newobj);				
					$("body").attr({"httpType":"postAjax","requestData":requestData});	
					if(SuccessCallback != undefined){
						SuccessCallback(data, null);
					}					
				},"json");
			}
		},
		//跳转至哪一页
		gotopage: function(target, isBack) {
			this.cpage = target; //把页面计数定位到第几页
			this.page();
			this.reloadpageAjax(target, isBack);
		},
		//添加页码点击事件
		ready2go: function(isBack) {
			var obj = this;
			$("#"+obj.page_obj_id).off("click","a").on("click","a", function() {
				$("#"+obj.page_obj_id).prev().html('<div style="padding:40px 0 0 0;text-align:center;"><img src="'+pub.localhostImg+'/loading/rjsAjaxloading.gif"></div>');
				obj.target_p = parseInt($(this).attr("pageIndex"));
				_self.gotopage.call(obj, obj.target_p, isBack);
			});
		},
		//方法驱动
		pageMethod: function() {
			var obj = this;
			obj.resetTotal();
			obj.reloadpageAjax(obj.currentPageNum, false);
			obj.page(); //生成页码 
			_self.ready2go.call(obj, false);
		},
		//跨域ajax分页
		callbackPageMethod: function() {
			var obj = this;
			obj.resetTotal();
			obj.reloadpageAjax(obj.currentPageNum, true);
			obj.page(); //生成页码 
			_self.ready2go.call(obj, true);
		},
		//初始化各个属性
		jsPage: function(listLength, page_obj_id, pagesize, requesturl, requestdata, responsevent, currentpagenum, successpar) {
			// list_id 结果集UL的id
			// list_class 要显示的类别
			// page_id 存放页码的id
			// pagesize 每页显示多少条
			this.page_obj_id = page_obj_id;
			this.page_obj = $("#"+page_obj_id); //存放页码的div
			this.results = parseInt(listLength); // 总记录数等于所有记录

			this.totalpage; // 总页数
			this.pagesize = parseInt(pagesize); //每页记录数
			this.cpage = currentpagenum; //当前页,默认显示第一页
			this.count;
			this.target_p;
			this.curcount;
			this.outstr = ""; // 输出页码html
			this.goNext = 5; //每次生成多少页码
			this.requestUrl = requesturl; //ajax请求地址
			this.requestData = requestdata; //ajax请求参数
			this.responseEvent = responsevent; //请求成功调用的方法
			this.successPar = successpar ? successpar : null; //请求成功调用方法的参数
			this.currentPageNum;
			if (currentpagenum) {
				this.currentPageNum = currentpagenum;
				this.cpage = parseInt(currentpagenum);
			} else {
				this.currentPageNum = 1;
				this.cpage = 1;
			}
			//加载当前目标也内容
			this.reloadpage = function(p) {
				this.li.hide();
				for (var i = this.pagesize * p - this.pagesize; i < this.pagesize * p; i++) {
					this.li.eq(i).show(); //eq指定第几个li显示
				}
			};
			//ajax加载当前目标页内容
			this.reloadpageAjax = function(p,isBack) {			
				//截取参数地址
				function GetQueryString(name){
				     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
				     var r = requestData.substr(1).match(reg);
				     if(r!=null)return  unescape(r[2]); return null;
				}
				if (isBack) {
					var requestData = this.requestData ? this.requestData : new Object();
				} else {					
					var requestData = this.requestData;					
					if(GetQueryString("p") == null){
						requestData = requestData + "&p=" + p;
					}else{
						requestData = requestData.replace('p='+GetQueryString("p"),'p='+p);
					}														
				}	
				if($("body").attr("httpType") == "getAjax"){
					_self.getAjax(this.requestUrl, requestData, this.responseEvent);
				}
				if($("body").attr("httpType") == "postAjax"){
					_self.postAjax(this.requestUrl, requestData, this.responseEvent);
				}
			};
			//计算总页数
			this.resetTotal = function() {
				if (this.results == 0) {
					this.totalpage = 0;
					this.cpage = 0;
				} else if (this.results <= this.pagesize) {
					this.totalpage = 1;
				} else if (parseInt(this.results / this.pagesize) == 1) {
					this.totalpage = 2;
				} else if (parseInt(this.results / this.pagesize) > 1 && this.results % this.pagesize == 0) {
					this.totalpage = this.results / this.pagesize;
				} else {
					this.totalpage = parseInt(this.results / this.pagesize) + 1;
				}
			};
			//加载页面跳转控件
			this.page = function() {
				if (this.totalpage <= this.goNext) {
					for (this.count = 1; this.count <= this.totalpage; this.count++) {
						if (this.count != this.cpage) {
							this.outstr = this.outstr + "<a href='javascript:void(0)' pageIndex='" + this.count + "' >" + this.count + "</a>";
						} else {
							this.outstr = this.outstr + "<span class='current'>" + this.count + "</span>";
						}
					}
				}
				if (this.totalpage > this.goNext) {
					if (parseInt((this.cpage - 1) / this.goNext) == 0) {
						for (this.count = 1; this.count <= this.goNext; this.count++) {
							if (this.count != this.cpage) {
								this.outstr = this.outstr + "<a href='javascript:void(0)' pageIndex='" + this.count + "' >" + this.count + "</a>";
							} else {
								this.outstr = this.outstr + "<span class='current'>" + this.count + "</span>";
							}
						}
						this.outstr = this.outstr + "<a href='javascript:void(0)' pageIndex='" + this.count + "' >&raquo;</a>";
					} else if (parseInt((this.cpage - 1) / this.goNext) == parseInt(this.totalpage / this.goNext)) {
						this.outstr = this.outstr + "<a href='javascript:void(0)' pageIndex='" + (parseInt((this.cpage - 1) / this.goNext) * this.goNext) + "' >&laquo;<\/a>";
						for (this.count = parseInt(this.totalpage / this.goNext) * this.goNext + 1; this.count <= this.totalpage; this.count++) {
							if (this.count != this.cpage) {
								this.outstr = this.outstr + "<a href='javascript:void(0)' pageIndex='" + this.count + "' >" + this.count + "</a>";
							} else {
								this.outstr = this.outstr + "<span class='current'>" + this.count + "</span>";
							}
						}
					} else {
						var lastP;
						this.outstr = this.outstr + "<a href='javascript:void(0)' pageIndex='" + (parseInt((this.cpage - 1) / this.goNext) * this.goNext) + "' >&laquo;<\/a>";
						for (this.count = parseInt((this.cpage - 1) / this.goNext) * this.goNext + 1; this.count <= parseInt((this.cpage - 1) / this.goNext) * this.goNext + this.goNext; this.count++) {
							if (this.count != this.cpage) {
								this.outstr = this.outstr + "<a href='javascript:void(0)' pageIndex='" + this.count + "' >" + this.count + "</a>";
							} else {
								this.outstr = this.outstr + "<span class='current'>" + this.count + "</span>";
							}
							if (this.count == this.totalpage) {
								lastP = "";
							} else {
								lastP = "<a href='javascript:void(0)' pageIndex='" + (this.count + 1) + "' >&raquo;</a>";
							}
						}
						this.outstr = this.outstr + lastP;
					}
				}
				if (this.totalpage > 1) {
					this.Prestr = "<a href='javascript:void(0)' pageIndex='" + parseInt(this.cpage - 1) + "'>上一页</a>";
					this.startstr = "<a href='javascript:void(0)' pageIndex='" + 1 + "'>首页</a>";
					this.nextstr = "<a href='javascript:void(0)' pageIndex='" + parseInt(this.cpage + 1) + "'>下一页</a>";
					this.endstr = "<a href='javascript:void(0)' pageIndex='" + this.totalpage + "'>尾页</a> <em class='pagenum'>总数："+listLength+"</em>";
					if (this.cpage != 1) {
						if (this.cpage >= this.totalpage) {
							document.getElementById(this.page_obj_id).innerHTML = "<div>" + this.startstr + this.Prestr + this.outstr + "<\/div>";
						} else {
							document.getElementById(this.page_obj_id).innerHTML = "<div>" + this.startstr + this.Prestr + this.outstr + this.nextstr + this.endstr + "<\/div>";
						}
					} else {
						document.getElementById(this.page_obj_id).innerHTML = "<div>" + this.outstr + this.nextstr + this.endstr + "<\/div>";
					}
				} else {
					document.getElementById(this.page_obj_id).innerHTML = "";
				}
				this.outstr = "";
			};
		}
	};
	return _self;
});