define(['../../js/public'],function(pub) { 
    /*
    thisdom:父节点（被编辑）
    infoTex：placeholder提示语
    width:输入框宽度eg. 100%  100px
    prompt:输入框后面附属文字eg. 3/20  分    
    */	
    var oldVal=null,eStatus='false';
	var _self    = { 
		totalNum:0,
		currentNum:0, 
		main:function(thisdom,infoTex,width,prompt,fn){
			$.get(pub.commonParams.staticTkpath+"/frontend/modules/inputedit/index.tpl",function(data){
				$(thisdom).unbind("click").bind("click",function(event){		
				     event.stopPropagation();			
					 _self.clickFun($(this),thisdom,data,infoTex,width,prompt,fn);					
				});
               
                // $(thisdom).find('.inputVal').bind("blur",function(){					
				// 	 _self.blurFun($(this),thisdom,data,infoTex,width,prompt);				
				// });  
	            // $(document).bind("click",function(e){ 
	            // 	var target = $(e.target); 
	            // 	 console.log(11);
	            // 	 if(target.closest(thisdom).length>0||eStatus=='false'){
	            // 	 	return false;
	            // 	 }
	            // 	 else{
	            // 	 	_self.blurFun($(this),thisdom,data,infoTex,width,prompt);
	            	 	
	            // 	 }	

	            // });       

				
			});
		},
		clickFun:function(o,thisdom,data,infoTex,width,prompt,fn){
			if(eStatus=="false"){
				    var href=null;
				     oldVal=$.trim(o.html());
				     eStatus="true"; 
			        $(thisdom).html(data).attr("eStatus","true").find('.inputVal').val(oldVal).attr("placeholder","请输入"+infoTex);
			        
			        $(thisdom).find('.inputVal').css("width",width).after(prompt);
			        _self.totalNum= $(thisdom).find('.totalNum').html();
			        _self.currentNum= oldVal.length;
			        $(thisdom).find('.currentNum').html(_self.currentNum);
                    $(thisdom).find('.inputVal').focus();
			        $(thisdom).find('.inputVal').unbind("keyup").bind('keyup', function(event) {
			        	/* Act on the event */
			        	event.stopPropagation();	
			        	 _self.keyupFun($(this));

			        }).unbind("blur").bind("blur",function(event){	
			          event.stopPropagation();					
					  _self.blurFun($(this),thisdom,data,infoTex,width,prompt,fn);				
				   });  

			}else{
				return false;
			}
		},
		blurFun:function(o,thisdom,data,infoTex,width,prompt,fn){

			if($(thisdom).find('.inputVal.error').length>0){
				promptMessageDialog({icon:"cha1", content:"请控制输入长度"});
				return false;
			}

			if(eStatus=="true"){ 
			     var val= $(thisdom).find('.inputVal').val();
			     eStatus="false";
			     if(val=='') {
			     	val= oldVal;
			     }
		         $(thisdom).find('.inputBor').remove();
		         $(thisdom).html(val);	 

		         if(fn){//回调函数
		         	if($.trim(val)!=$.trim(oldVal)){
		         		fn($(thisdom));
		         	}
		         }
			}else{
				return false;
			}
		},

		keyupFun:function(o){
		    var texLength=_self.currentNum=$.trim(o.val()).length;	

		    o.siblings('span').find('.currentNum').html(texLength);
		    if(texLength>_self.totalNum){
		    	o.addClass('error');
		    }else{
                o.removeClass('error');
		    }		  
		}


	}
	return _self;
});