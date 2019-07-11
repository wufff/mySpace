define(['path','layui'], function(path,layui) {
	var layer = layui.layer;
	var $ = jQuery = layui.jquery;
	var _newobj = "",
		_self   = {
		//ajax调用公共方法
		loading:null,
		firstLoad:true,
		getAjax: function(requestUrl, requestData, SuccessCallback) {
			if ($("body").attr("requestData") == 0) {
				SuccessCallback(_newobj, null);
				$("body").attr({
					"requestData": 1
				});
			} else {
				  
				if (path.is_local) {
					requestData += "&jump=1";
				}
				$.get(requestUrl, requestData, function(data) {
					if (data.type == "login") {
						layer.msg("请先登录！", {
							anim: -1
						});
						setTimeout(function() {
							// window.location.href = "/";
						}, 300)
						return;
					}
					_newobj = data;
					$("body").attr({"httpType": "getAjax"});
					if (data.type == "error") {
					$("body").attr({"requestData": 0});
				    }
					SuccessCallback(data, null);
				}, "json");
			}
		},
		postAjax: function(requestUrl,requestData,SuccessCallback){
			if($("body").attr("requestData") == requestData){			
				SuccessCallback(_newobj, null);
			}else{
			 if(path.is_local) {
				requestData += "&jump=1";
			   }
				$.post(requestUrl,requestData,function(data){
					if(data.type == "login"){
						 layer.msg("请先登录！",{anim:-1});
						 setTimeout(function(){
						 	window.location.href ="/";
						 },300)
						 return;
					}
					_newobj = data;	
					//console.log(_newobj);				
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
				// if($(".tableLoading").length > 0){
				// 	$(".tableLoading").html('<div>表格数据加载中...</div>');
				// }
			    if($("#tbody").length > 0){
			    	$("#tbody").html("");
			    }
				if($(".layui-row")){
					$(".layui-row").html('<div style="padding:40px 0 0 0;text-align:center;"><img src="'+path.img+'/rjsAjaxloading.gif"></div>');
				}
				// $("#"+obj.page_obj_id).prev().html('<div style="padding:40px 0 0 0;text-align:center;"><img src="'+path.img+'/rjsAjaxloading.gif"></div>');
				obj.target_p = parseInt($(this).attr("pageIndex"));
				_self.gotopage.call(obj, obj.target_p, isBack);
			});

           $("#"+obj.page_obj_id).off("click","#goBageBt").on("click","#goBageBt", function() {
				// $("#"+obj.page_obj_id).prev().html('<div style="padding:40px 0 0 0;text-align:center;"><img src="'+path.img+'/rjsAjaxloading.gif"></div>');
                var vaule =  $("#"+obj.page_obj_id).find("#goBageText").val();          
				obj.target_p = parseInt(vaule);
				// console.log(obj.target_p);
				if(vaule < 1 || vaule > obj.totalpage){
					 return;
				}else{
					if($(".tableLoading").length > 0){
						$(".tableLoading").html('<div>表格数据加载中...</div>');
						}
					    if($("#tbody").length > 0){
					    	$("#tbody").html("");
					    }
						if($(".layui-row")){
							$(".layui-row").html('<div style="padding:40px 0 0 0;text-align:center;"><img src="'+path.img+'/rjsAjaxloading.gif"></div>');
						}
					_self.gotopage.call(obj, obj.target_p, isBack);  
				}
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
					if(GetQueryString("page") == null){
						requestData = requestData + "&page=" + p;
					}else{
						requestData = requestData.replace('page='+GetQueryString("page"),'page='+p);
					}														
				}	
				if($("body").attr("httpType") == "getAjax"){
					 
					if(_self.firstLoad == true){ //首次是否运行;
						 _self.loading = layer.load(5);
						 _self.getAjax(this.requestUrl, requestData, this.responseEvent);
					}else{
						_self.firstLoad = true;
					}
					
				}
				if($("body").attr("httpType") == "postAjax"){
					if(_self.firstLoad == true) {
					  _self.loading = layer.load(5);
					  _self.postAjax(this.requestUrl, requestData, this.responseEvent);
					}else{
					  _self.firstLoad = true; 
					}
					
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
					this.gofast = "<span class='goPageCell'>跳转到第<input type='text' name='' id='goBageText'>页<button id='goBageBt'>确定</button></span>";
				    this.gofast = "";
					this.pageDom = this.gofast +"<em class='pagenum'>总共："+ this.totalpage +"页 "+listLength+"条</em>";
					this.endstr = "<a href='javascript:void(0)' pageIndex='" + this.totalpage + "'>尾页</a>"+this.pageDom;
					if (this.cpage != 1) {
						if (this.cpage >= this.totalpage) {
							document.getElementById(this.page_obj_id).innerHTML = "<div>" + this.startstr + this.Prestr + this.outstr + this.pageDom +"<\/div>";
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



	function queryString (str1,paramName){
            //获取url中"?"符后的字串
            var theRequest = new Object();
            var  strs = str1.split("&");
            for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
            return theRequest[paramName];
   }
});


//分页样式
// .comm-page {
//   text-align: center;
//   clear: both;
// }
// .comm-page div {
//   width: auto;
//   overflow: hidden;
//   text-align: right;
// }
// .comm-page b {
//   position: relative;
//   top: 2px;
// }
// .comm-page a {
//   color: #666;
//   display: inline-block;
//   padding: 6px 12px;
//   margin: 5px 3px;
//   border: 1px solid #d4d4d4;
//   background: #fff;
//   vertical-align: middle;
//   border-radius: 5px;
// }
// .comm-page a:hover {
//   text-decoration: none;
//   background: #e6f4ff;
//   border: 1px solid #e6f4ff;
// }
// .comm-page .current,
// .comm-page .pagenum {
//   display: inline-block;
//   padding: 6px 12px;
//   border: 1px solid #e6f4ff;
//   background: #e6f4ff;
//   vertical-align: middle;
//   border-radius: 5px;
// }
// .comm-page .pagenum {
//   color: #666;
//   background: #d4d4d4;
//   border: 1px solid #ccc;
//   font-style: normal;
//   font-weight: normal;
// }
// .comm-page .goPageCell {
//   margin:0  15px;
// }
// .comm-page .goPageCell {
//   color: #666;
// }
// .comm-page .goPageCell #goBageText {
//   width: 36px;
//   text-align: center;
//   margin: 0 10px;
// }
// .comm-page .goPageCell #goBageBt {
//    margin-left: 10px;
//    padding: 3px 6px;
//    border:1px solid #d4d4d4;
//    background-color: #fff;
// }
// .comm-page .goPageCell #goBageBt:hover {
//    background-color:  #e6f4ff;
// }