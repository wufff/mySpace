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
})
