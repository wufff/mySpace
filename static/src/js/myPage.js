/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-10-26 10:47:50
 * @version $Id$
 */
require(["jquery","page","path"],function($,pages,patch){
    //分页
    	function logList(obj) {
            function setLogListHTML(objR) {
                if (objR.type == "success") {
                    var _html = '<ul>';
                    for (var i=0;i<objR.data.data.length;i++) {
                    	if(i%5 == 4){
                    		_html += '<li><a href="javascript:void(0);" photo_id="'+objR.data.data[i].photo_id+'" name="showImg" style="margin-right:0;">';
                    	}else{
                    		_html += '<li><a href="javascript:void(0);" photo_id="'+objR.data.data[i].photo_id+'" name="showImg">';
                    	}                    	
        				_html += '	<div class="mask">';
        				_html += '		<img src="'+objR.data.data[i].photo_path+'" alt="'+objR.data.data[i].photo_name+'" data-id="'+objR.data.data[i].photo_activity_id+'">';
        				_html += '		<span><i class="iconfont icon-like_fill"></i> '+objR.data.data[i].photo_like_count+' &nbsp;&nbsp; <i class="iconfont icon-pinglun"></i> '+objR.data.data[i].photo_comment_count+'</span>';
        				_html += '	</div>';
        				if(objR.data.data[i].photo_name.length > 10){
                        	_html += '<p title="'+objR.data.data[i].photo_name+'">'+objR.data.data[i].photo_name.substring(0,10)+'...</p>';
                        }else{
                        	_html += '<p title="'+objR.data.data[i].photo_name+'">'+objR.data.data[i].photo_name+'</p>';
                        }
        				_html += '</a></li>';
                    }
                    _html += '</ul>';
                    $("#log_list").html(_html);
                }
            }
            var requestMenberpage = new pages.jsPage(obj.data.count, "pageNum", "10", requestUrl, requestData, setLogListHTML);                            
                pages.pageMethod.call(requestMenberpage);
        }
        var requestData = "activity_id=2&page_num=10&p=1";
        var requestUrl = "http://wufff.rjs.dev.dodoedu.com/CallAjaxActivity/ajaxPhotoList";
        pages.postAjax(requestUrl, requestData, logList, null,null);	

})

