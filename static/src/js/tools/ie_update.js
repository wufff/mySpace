
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-11-07 09:42:21
 * @version $Id$
 */
 // alert("10以下");
 // window.location.href ="https://www.baidu.com";



    document.body.innerHTML = "";
    var  div = document.createElement("div");
    var html = "";
	html += '<div id="updata_header" style="background:#222d72;">'
	html += '<div class="container" style="height:80px;padding-top:17px;">'
	html +=  '<div class="title" style="color:#fff;">'
	html +=    '<h3 style="margin:0">湖北好课堂</h3>'
	html +=        ' <p>网络教研平台</p>'
	html +=     '</div>'
	html += '</div>'
	html += '</div>'
    html += '<div class="container" style="padding-top:30px;">'
    html += '<p style="font-size:20px; color:#666">您的IE浏览器本版本过低 !</p>';
    html += '<p style="font-size:18px; color:#666">本站包含 视频 等多媒体内容 ! 为确保您正常观看推荐使用 <a href="https://www.google.cn/chrome/" style="background:url(http://wufff.static.dev.dodoedu.com/ncjxdPage/static/src/img/logo_bloor.png) no-repeat;padding-left:75px;display:inline-block;height:70px;line-height:70px;color:#f5584c">谷歌浏览器</a> 或 ';
    html += '<a href="http://www.firefox.com.cn/" style="background:url(http://wufff.static.dev.dodoedu.com/ncjxdPage/static/src/img/logo_bloor.png) no-repeat;padding-left:75px;display:inline-block;height:70px;background-position: 0 -72px;line-height:70px;color:#f5584c">火狐浏览器 </a> 。</p>';
    html += '<p  style="font-size:18px; color:#666">如要使用IE浏览器，请将IE浏览器升级到10，或10以上。</p>';
    html += '</div>'
    div.innerHTML = html;
    document.body.appendChild(div);