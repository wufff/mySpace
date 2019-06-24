form.verify({ //todo
  num100: function(value, item){ //value：表单的值、item：表单的DOM对象
    if(!new RegExp("^([1-9]|[1-9]\\d|100)$").test(value)){
      return '请输入1-100正整数';
    }
  },
  num: function(value, item){ //value：表单的值、item：表单的DOM对象
    if(!new RegExp("^[0-9]*[1-9][0-9]*$").test(value)){
      return '请输正整数';
    }
  }
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  ,pass: [
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
  ] 
});     


 // var reg=/^([1-9]\d*|[0]{1,1})$/ 包含0的1到9

// var reg=/^0?$|^([1-9][0-9]*)?$/  正整数包含0