require(["layui", "api", "path", "page", "downList", "headLogin_b"], function(layui, api, path, pages) {
  var layer = layui.layer;
  var $ = jQuery = layui.jquery;
  var table = layui.table;
  var form = layui.form;
  var diolag;
  var currctId;
  var status;
  var TagList2;
  var TagList
  var plValue = [];
  var submitTye;
  var edit_id;
  
  //监听下拉
  form.on('select(grade)', function(data) {
     console.log(data.value)
  })


//全选按钮
 form.on('checkbox(all)', function(data) {
    if (data.elem.checked) {
      $('input[name="item"]').prop("checked", true);
      form.render("checkbox");
    } else {
      $('input[name="item"]').prop("checked", false);
      form.render("checkbox");
    }
  }); 

//单选按钮
  form.on('checkbox(item)', function(data) {
    //console.log(data.elem); //得到checkbox原始DOM对象
    // //console.log(data.elem.checked); //是否被选中，true或者false
    // //console.log(data.value); //复选框value值，也可以通过data.elem.value得到
    var checkedLength = $('input[name="item"]:checked').length;
    var itemLengt = $('input[name="item"]').length;
    if (checkedLength == itemLengt) {
      $('input[name="all"]').prop("checked", true);
      form.render("checkbox");
    } else {
      $('input[name="all"]').prop("checked", false);
      form.render("checkbox");
    }
  });


 
 $("#addBtn").click(function() {
    submitTye = 0;
    initContorl(null)
    diolag = layer.open({
      type: 1,
      title: "添加评审专家",
      content: $('#contorl'),
      area: ["850px", "650px"],
      btn: ["确定", "取消"],
      yes: function(index) {
        $("#btButton").click();
      }
    })
  })


// 添加编辑提交

form.on('submit(form)', function(data) {
    var ajaxData = data.field;
    for (key in ajaxData) {
      var myReg = /subject/;
      if (myReg.test(key)) {
        delete ajaxData[key];
      }
    }
    var arry = [];
    $("input:checkbox[name^='subject']:checked").each(function(i) {
      arry[i] = $(this).val();
    });
    if (arry.length == 0) {
      layer.msg("请至少选择一个学科", {
        icon: 5
      });
      return false;
    }
    ajaxData.subject = arry.join("|");
    // console.log(ajaxData);
    if (submitTye == 0) {
      var url = path.api + '/adminApi/addExpert';
    } else if (submitTye == 1) {
      var url = path.api + '/adminApi/modifyExpert';
      ajaxData.user_id = edit_id;

    }
    api.ajaxGet(url, ajaxData, function(res) {
      layer.msg("操作成功!");
      layer.close(diolag);
      refresh()
    })
    return false;
  })


//表单提交
  table.on('tool(form)', function(obj) {
    var data = obj.data;
    var layEvent = obj.event;
    currctId = obj.data.u_uid;
  
    if (layEvent == "edit") {
      edit_id = data.u_uid;
        submitTye = 1; 
      var initData = {
        username: data.u_nickname,
        mobile: data.u_username
      }
      var subjectList = data.u_subject_list;
      //勾选初始值
      var subjectArry = [];
      $.each(subjectList, function(i, v) {
        var str = v.u_stage + "," + v.u_subject
        initData["subject[" + str + "]"] = true
      });
      initContorl(null)
      initContorl(initData)


      api.ajaxGet(url, ajaxData, function(res) {
          var list = res.data;

        
      })
    }
  })


  

  function refresh() {
    var page = $("#pageNum").find(".current").text();
    // console.log(page);
    if (page) {
      var has = initPage("", page);
      if(!has){
          initPage("", page-1);
      }
    } else {
      initPage("", 1)
    }
  }


  function initContorl(data) {
    if (data) {
      form.val("form", data);
      $("input[name=mobile]").attr("disabled", true);
      $(".checkbox").attr("disabled", false);
    } else {
      form.val("form", {
        "mobile": "",
        "username": ""
      })

      $("input[name=mobile]").attr("disabled", false)
      $(".checkbox").attr("checked", false);
      $(".checkbox").attr("disabled", false)
      form.render("checkbox");
    }
  }


  function initPage(keyword, goPage) {
    var url = path.api + "/adminApi/getExpertListData";
    var stage = $("#grade-o").val();
    var subject = $("#sub-o").val();
    var getData = "page=" + goPage + "&page_count=12";
    getData += "&stage=" + stage + "&subject=" + subject + "&keyword=" + keyword + "&v=" + new Date().getTime();
    var is_kong = true;
    pages.getAjax(url, getData, function(res) {
      if (res.type == "success") {
        $("body").attr({"requestData": 0});
        var total = res.data.total ? res.data.total : 1;
        var length = 12;
        page = new pages.jsPage(total, "pageNum", length, url, getData, buildTable, goPage, null);
        pages.pageMethod.call(page);
      } else {
        layer.msg(res.msg,{icon:5},{time:5000});
        console.log(res.message);
      }
    })

    function buildTable(res) {
      var data = res.data.list;
      if(data.length == 0){ is_kong = false}
      table.render({
        elem: '#table_form',
        data: data,
        limit: 1000,
        // totalRow:true,
        cols: [
          [
            // {field:'c_id', title: 'ID',width:50},
            {
              field: 'u_username',
              title: '用户名',
              width: 160
            }, {
              field: 'u_nickname',
              title: '姓名'

            }, {
              field: 'u_task_num',
              title: '评审任务',
              width: 100
            }, {
              field: 'post',
              title: '安排任务',
              width: 160,
              templet: function(d) {
                if (role == 3) {
                  return '-';
                } else {
                  return '<a lay-event="addTask">添加</a>'
                }

              }

            }, {
              field: 'u_task_progress',
              title: '完成进度',
              width: 100
            }, {
              field: 'u_subject_list',
              title: '学科',
              width: 260,
              templet: function(d) {
                // 0禁用  1有效
                var list = d.u_subject_list;
                var html = "";
                $.each(list, function(i, v) {
                  if (role == 3) {
                    html += '<div><span>' + v.u_stage_name + ' ' + v.u_subject_name + '</span></div>'
                  } else {
                    if (v.u_status == 1) {
                      html += '<div><span>' + v.u_stage_name + ' ' + v.u_subject_name + '</span>-<a lay-event="open" index="' + i + '" style="color:orange">禁用</a></div>'
                    } else {
                      html += '<div><span>' + v.u_stage_name + ' ' + v.u_subject_name + '</span>-<a lay-event="close" index="' + i + '">启用</a></div>'
                    }
                  }
                });

                return html;
              }
            }, {
              field: 'control',
              title: '操作',
              width: 80,
              templet: function(d) {
                if (role == 3) {
                  return '-';
                } else {
                  return '<a lay-event="edit">编辑</a>'
                }
              }
            }
          ]
        ],
      });
      if (res.data.list.length == 0) {
        is_kong = false;
      }
      layer.close(pages.loading);
    }
    return is_kong;
  }
})