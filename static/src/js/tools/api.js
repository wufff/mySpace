define(["layui","path"], function(layui,path) {
	var layer = layui.layer;
	var $ = jquery = layui.jquery;
	return {
		ajaxJSONP:function(url, data, callback) {
			$.ajax({
				type: "get",
				// async: false,
				url: url,
				data: data,
				dataType: "jsonp",
				jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
				success: function(json) {
					callback(json);
				},
				error: function(e) {
					alert("ajaxJSONP error");
				}
			});
		},


		ajaxPost:function(requestUrl,requestData,SuccessCallback,successPar){
			$.ajax({
				type: "POST",
				url: requestUrl,
				data: requestData,
				contentType: "application/x-www-form-urlencoded",
				dataType: "text",
				sync: false,
				success: function(data) {
					var obj = null;
					try {
						obj = eval('(' + data + ')');
					} catch (ex) {
						obj = data;
					}
					
					if (obj.type == "success"){
		                  SuccessCallback(obj,successPar);
		             }else{
		                   layer.msg(obj.message,{icon:5});
		            }
					
				},
				error: function(err) {
					console.log(err);
				},
				complete: function(XHR, TS) {
					XHR = null
				}
			});
		},
       ajaxGet:function(url,data,SuccessCallback,successPar){
       	   if(path.is_local) {
				data.jump = 1;
			}
       	    $.ajax({
            type: "get",
            url: url,
            data: data,
            cache: false,
            // async: false,
            dataType: "json",
            success: function (res)
            {
                if (res.type == "success"){
                	 SuccessCallback(res,successPar);
                }else{
                     layer.msg(res.message,{icon:5});
                }
                
            },
            error: function (res) {
            	var obj = { 
                    type:"ajax返回错误",
                    data:res
            	 }
                //console.log(obj);
                layer.msg("网络错误，请联系管理员",{time:800});
            }
        });
       }

	}
})
