/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-10-25 09:38:20
 * @version $Id$
 */

define(["jquery", "path"], function($, publicPatch) {
	$.extend({
		unselectContents: function() {
			if (window.getSelection) {
				window.getSelection().removeAllRanges();
			} else if (document.selection) {
				document.selection.empty();
			}
		}
	});
	$.fn.extend({
		selectContents: function() {
			$(this).each(function(i) {
				var node = this;
				var selection, range, doc, win;
				if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection()) && typeof selection.removeAllRanges != 'undefined') {
					range = doc.createRange();
					range.selectNode(node);
					if (i == 0) {
						selection.removeAllRanges();
					}
					selection.addRange(range);
				} else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())) {
					range.moveToElementText(node);
					range.select();
				}
			});
		},
		//兼容IE寻找光标点
		setCaret: function() {
			if (!$.support.msie) {
				return;
			}
			var initSetCaret = function() {
				var textObj = $(this).get(0);
				textObj.caretPos = document.selection.createRange().duplicate();
			};
			$(this).click(initSetCaret).select(initSetCaret).keyup(initSetCaret);
		},
		
	});

	var my = {
		//将表情文字转换成表情图片
		// 渲染的时候用
		replaceSmile: function(str) {
			var smileContent = ['微笑', '大笑', '调皮', '惊讶', '耍酷', '发火', '害羞', '汗水', '大哭', '自满', '鄙视', '困', '夸奖', '晕倒', '疑问', '媒婆', '狂吐', '青蛙', '发愁', '亲吻', '挑衅', '爱心', '心碎', '玫瑰', '礼物', '难过', '奸笑', '可爱', '得意', '呲牙', '暴汗', '楚楚可怜', '睡觉', '哭', '生气', '震惊', '口水', '彩虹', '夜空', '太阳', '钱钱', '灯泡', '咖啡', '蛋糕', '音乐', '爱', '胜利', '赞', '踩', 'OK'];
			for (var i = 0; i < smileContent.length; i++) {
				str = str.replace(new RegExp("{:" + smileContent[i] + ":}", "gm"), "[em_" + smileContent[i] + "_" + (i + 1) + "]");
				str = str.replace(new RegExp("[\[]" + smileContent[i] + "]", "gm"), "[em_" + smileContent[i] + "_" + (i + 1) + "]");
			}
			str = str.replace(/\[em_(.*?)_([0-9]*)\]/g, '<img src="' + publicPatch.imgPath + '/face/i_f_$2.gif" title="$1" border="0" style="float:none;margin:0;" />');
			return str;
		},

		//将表情图片转换成表情文字
		replaceForSmile: function(str) {
			var smileContent = ['微笑', '大笑', '调皮', '惊讶', '耍酷', '发火', '害羞', '汗水', '大哭', '自满', '鄙视', '困', '夸奖', '晕倒', '疑问', '媒婆', '狂吐', '青蛙', '发愁', '亲吻', '挑衅', '爱心', '心碎', '玫瑰', '礼物', '难过', '奸笑', '可爱', '得意', '呲牙', '暴汗', '楚楚可怜', '睡觉', '哭', '生气', '震惊', '口水', '彩虹', '夜空', '太阳', '钱钱', '灯泡', '咖啡', '蛋糕', '音乐', '爱', '胜利', '赞', '踩', 'OK'];
			for (var i = 0; i < smileContent.length; i++) {
				str = str.replace(new RegExp('<img src="' + publicPatch.imgPath + '/face/i_f_' + (i + 1) + '.gif" title="' + smileContent[i] + '" border="0" style="float:none;margin:0;">', "gm"), "[" + smileContent[i] + "]");
			}
			return str;
		},

		//表情插件
		showFace: function(button,input) {
			var id = 'facebox';
			var path = publicPatch.imgPath;
			var SmileyInfor = ['微笑', '大笑', '调皮', '惊讶', '耍酷', '发火', '害羞', '汗水', '大哭', '自满', '鄙视', '困', '夸奖', '晕倒', '疑问', '媒婆', '狂吐', '青蛙', '发愁', '亲吻', '挑衅', '爱心', '心碎', '玫瑰', '礼物', '难过', '奸笑', '可爱', '得意', '呲牙', '暴汗', '楚楚可怜', '睡觉', '哭', '生气', '震惊', '口水', '彩虹', '夜空', '太阳', '钱钱', '灯泡', '咖啡', '蛋糕', '音乐', '爱', '胜利', '赞', '踩', 'OK'];
			$(button).unbind().bind("mousedown", function() {
				var strFace, labFace;
				if ($('#facebox').length <= 0) {
					if ($("#sliderMask").length > 0) {
						strFace = '<div id="facebox" class="dodoFace left">' + '<table border="0" cellspacing="1" cellpadding="0" bgcolor="#e5e5e5" style="margin:0;"><tr>';
					} else {
						strFace = '<div id="facebox" class="dodoFace">' + '<table border="0" cellspacing="1" cellpadding="0" bgcolor="#e5e5e5" style="margin:0;"><tr>';
					}
					for (var i = 1; i <= SmileyInfor.length; i++) {
						labFace = '[' + SmileyInfor[i - 1] + ']';
						strFace += '<td bgcolor="#FFFFFF"><img title="' + SmileyInfor[i - 1] + '" src="' + path + '/face/i_f_' + i + '.gif" /></td>';
						if (i % 10 == 0) {
							strFace += '</tr>';
						}
					}
					strFace += '</table></div>';
				} else {
					$('#facebox').remove();
				}

				$("body").append(strFace);
				$(".dodoFace img").bind({
					click: function(e) {
						var num = $(".dodoFace img").index($(this)),
							smiNum = SmileyInfor[num].length + 2,
							oldnum = $(this).parents(".message-guestPost").find(".TipstextCount label");
						$(input).setCaret();
						var inputbox = $(input).get(0);
						console.log(inputbox)
						my.insertAtCaret(inputbox,"[" + SmileyInfor[num] + "]");
						$("#facebox").remove();
						e.stopPropagation();
					}
				});
				$(this).parent().find(".dodoFace").find("td").bind({
					mouseover: function() {
						$(this).attr("bgColor", "#F0F0F0");
					},
					mouseout: function() {
						$(this).attr("bgColor", "#FFFFFF");
					}
				});
				var offset = $(this).position(),
					top = offset.top + $(this).outerHeight();
					console.log(offset.top);
					console.log($(this).outerHeight())
				$('#facebox').css({
					'top': top,
					'left': offset.left
				}).show();
			});
		},

        //在光标处插入表情
		insertAtCaret: function(input,textFeildValue) {
			// var input = $(this).get(0);
			   console.log(input);
			if (document.all && input.createTextRange && input.caretPos) {
				var caretPos = input.caretPos;
				caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == '' ? textFeildValue + '' : textFeildValue;
			} else if (input.setSelectionRange) {
				var rangeStart = input.selectionStart;
				var rangeEnd = input.selectionEnd;
				var tempStr1 = input.value.substring(0, rangeStart);
				var tempStr2 = input.value.substring(rangeEnd);
				input.value = tempStr1 + textFeildValue + tempStr2;
				input.focus();
				var len = textFeildValue.length;
				input.setSelectionRange(rangeStart + len, rangeStart + len);
				input.blur();
			} else {
				input.value += textFeildValue;
				console.log(input);
			}
		}




	}//my
	return my;
})