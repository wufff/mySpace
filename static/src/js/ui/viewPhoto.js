
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-11-08 15:11:16
 * @version $Id$
 */
 define(["jquery","path"], function($,path) {
 	return {
 		viewimg: function(dom) {
 			$.fn.viewPhoto = function() {
 				$(this).click(function(e) {
 					var c = $(e.target);
 					// c.is("img") && c.parent().is("a") && (a(c.parent()), e.preventDefault())
 					c.parent().is("a") && (a(c.parent()), e.preventDefault());
 				})
 			};
 			$(dom).viewPhoto();
 			$(document).off("click.closeview").on("click.closeview", ".imgview-close,#js-imgview-mask", function(e) {
 				e.preventDefault(),
 					$("#js-imgview-mask,#js-imgview").remove();
 			});
 		}
 	}

 	function a(a) {
 		var c = $(a).attr("href"),
 			h = ($('<div id="js-imgview-mask" class="imgview-mask"></div>').appendTo($("body")).fadeIn(), $('<div id="js-imgview" class="show-img"><img id="bigimage" class="imgplacHolder" src="'+ path.static +'/src/img/rjsAjaxloading.gif"><a href="#" class="imgview-close" ></a></div>').appendTo($("body"))),
 			v = new Image;
	 		v.onload = function() {
	 			var a, v = $(window).height() - 80,
	 				j = $(window).width() - 80,
	 				g = this.height,
	 				w = this.width;
	 			(g > v || w > j) && (a = Math.min(v / g, j / w), g = Math.round(g * a), w = Math.round(w * a)), h.animate({
	 				marginTop: -g / 2,
	 				marginLeft: -w / 2,
	 				width: w,
	 				height: g
	 			}, 200, function() {
	 				h.find("img").attr({
	 					width: w,
	 					height: g,
	 					src: c
	 				})
	 			})
	 		}, v.src = c
 	}
 })


// .imgview-mask {
//  position:fixed;
//  height:100%;
//  width:100%;
//  z-index:999998;
//  left:0;
//  top:0;
//  background:#000;
//  opacity:.75;
//  filter:alpha(opacity=75);
//  text-align:center;
//  display:none
// }
// .show-img a {
//  position:absolute;
//  width:40px;
//  height:40px;
//  right:-40px;
//  top:-40px;
//  background: url("../img/index-close.png")  -10px -10px  no-repeat;
// }

// .show-img a:hover {
//  background-position:-10px -78px
// }
// .show-img {
//  position:fixed;
//  width:200px;
//  height:100px;
//  left:50%;
//  top:50%;
//  margin:-50px 0 0 -100px;
//  background:#000;
//  z-index:999999;
//  text-align:center
// }
// .imgbox {
//  text-align:center
// }