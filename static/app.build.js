({
   appDir:"./src",
   baseUrl:"./js",
   dir:"./build",
   mainConfigFile:"./src/js/re-config.js",
   optimizeCss:"standard",
   removeCombined:false,
   optimize: "uglify2",
   uglify2: {
       mangle: false,  //false 不混淆变量名
       mangleProps:{
           screw_ie8: false, //ie8支持
           keep_quoted:true, //保持引号，不进行混淆
           reserved:['angular','import','finally','catch']
       },
       compress: {screw_ie8: false}, //ie8支持
       output: {screw_ie8: false}  //ie8支持
   },
   modules:[{
      name:"index"
   },{
   	name:"lookImgPage"
   },{
   	name:"myExp"
   }]
})


