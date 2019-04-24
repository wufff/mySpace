require(["jquery","lay"],function($,layer){
    $("#edite").click(function(){
    	layer.open({
         type: 1,
         title:null,
         content: $('#aaa'),
         area:["300px","300px"]
       })
    })
})
