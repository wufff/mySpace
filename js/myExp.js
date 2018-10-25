require(["re-config"],function(){
require(["jquery","expression"],function($,face){
	  // 调用选项
      face.showFace(".showFace",".commentText");
      // 渲染到页面
      var str = "你好[微笑]你好[耍酷]";
      var html = "<p>"+face.replaceSmile(str)+"<p>"
      $(".faceText").html(html); 	
    
  

















})
})
