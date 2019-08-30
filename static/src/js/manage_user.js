require(["jquery","layui"],function($,layui){
	var layer = layui.layer;
	var table = layui.table;
    console.log(table)
    $("#edite").click(function(){
    	layer.open({
         type: 1,
         title:"提示",
         content: $('#aaa'),
         area:["300px","300px"]
       })
    })


    $("#dialog").click(function(){
        layer.open({
             type:1,
             title:"编辑窗口",
             content:$("#control"),
             area:["420px","300px"],
             btn:["确定","取消"],
             yes:function(res){
                alert(123);
             }
        })
    })


})
