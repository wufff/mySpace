require(["jquery","lay"],function($,layer){

    $("#edite").click(function(){
    	layer.open({
         type: 1,
         title:"提示",
         content: $('#aaa'),
         area:["300px","300px"]
       })
    })
    $("#msg").click(function () {
         layer.msg("看看书",{icon:1})
    })
});
