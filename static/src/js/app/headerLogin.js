
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-02-22 15:01:00
 * @version $Id$
 */
 
define(["layui","api","path","tools"],function(layui,api,path,tool){
     var $ = jQuery = layui.jquery; 
     var layer = layui.layer;
     var form = layui.form;
     var dialog;
     
     

     form.on('select(filter)', function(data){
        tool.filter(data.elem,data.value);
    });   





//登录按钮
  $("#loginBt").click(function(){
     var mobile =  $("#mobile").val();
     var code = $("#code").val();
     if(!mobile) {
        layer.msg("请输入手机号");
        return false;
     }
     if (!code) {
        layer.msg("请输入验证码");
        return false;
     }
     var url = path.api+"/adminApi/checkCaptcha";
     var ajaxData = { 
         mobile:mobile,
         valid_code:code,
         opt:105
     }
     //先验证验证码在登录
    api.ajaxPost(url,ajaxData,function(obj){
         var loginurl = path.api+"/adminApi/login";
         api.ajaxPost(loginurl,ajaxData,function(obj){
              console.log(obj);
              window.location.reload();
        })
    })
  });

// //拦截a
// $("a").click(function(){
//    if($(this).hasClass('noLogin')){
//       return true;
//    }else{
//       var length = $("#header_loginBt").length; 
//       //console.log(length);
//        if (length > 0) {
//           login();
//           return false;
//        }
//    }
// })

//倒计时







 



})
