
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-10-30 11:28:07
 * @version 1.0
 */
 
define(["jquery"],function($){
    var my = {
        initUi:function(dom,num) {
            var widthWrap =  $(dom).width();
            var itemWidth = widthWrap/num;
            var itemlength = $(dom).find('.imgWrap').length;
            var sliderWidth = itemlength*itemWidth;
            var moveDist    = 0;
			var	moveLength  = 2;
			var	sliderPrev  = "上一张";
			var	splock      = "没有上一张";
			var	sliderNext  = "下一张";
			var	snlock      = "没有下一张";
			var	sliderLeft  = "上一组";
			var	slLock      = "没有上一组";
			var	sliderRight = "下一组";			
			var	srLock      = "没有下一组";
             //变量结束


            $(dom).find('.imgWrap').css({width:itemWidth});
             $(dom).find('.silder').css({width:sliderWidth});         
            $(dom).find(".loading").hide();
            $(dom).find(".silder").show();  
            // 布局结束

            $("body").off("click",".leftBar").on("click",".leftBar",function(){ 
				if($(this).attr("locked") == 0){
					moveDist = moveDist-itemWidth*moveLength;
					if(moveDist <= 0){
						//左移动到头了
						moveDist = 0;
						$(this).attr({"locked":"1","title":slLock}).find("i").addClass("locked");
					}
					$(".silder").stop().animate({"marginLeft":-moveDist});
					$(".rightBar").attr({"locked":"0","title":sliderRight}).find("i").removeClass("locked");
				}
			});
            //左滑结束
               
            $("body").off("click",".rightBar").on("click",".rightBar",function(){
				//locked不等于0锁定点击
				if($(this).attr("locked") == 0){
					moveDist = moveDist+itemWidth*moveLength;
					if(moveDist >= itemlength*itemWidth - widthWrap){
						//右移动到底了
						moveDist = itemlength*itemWidth - widthWrap;				
						$(this).attr({"locked":"1","title":srLock}).find("i").addClass("locked");
					}
					$(".silder").stop().animate({"marginLeft":-moveDist});
					$(".leftBar").attr({"locked":"0","title":sliderLeft}).find("i").removeClass("locked");
				}
			}); 
            //右滑动结束




           $(".lookImg .imgWrap img").click(function(){
           	   if($(this).hasClass('active')){
           	   	  return;
           	   }
           	   else {
           	   	  $(".lookImg .imgWrap img").removeClass('active');
           	   	  $(this).addClass('active');
           	   	  var src = $(this).attr("link");
           	   	  $(".bigImgWrap").css({'background-image':'url('+ src +')'}) 
           	   }
           })   
            // 点击图片放大图结束 
    
        }

    }




   return my;
})
