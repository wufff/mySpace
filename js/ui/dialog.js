
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-10-30 16:06:29
 * @version $Id$
 */
 
define(["jquery"],function($){




  function promptMessageDialog(settings) {
    this.settings = {
        icon: "finish",
        content: "操作成功！",
        time: 1000
    };
    $.extend(this.settings, settings || {});
    var iconSty = this.settings.icon == "success" || this.settings.icon == "finish" ? "finish" : this.settings.icon;
    var dialogContent = '<div class="customTipsSuccessfulOperation"><i class="icon_' + iconSty + '"></i>' + this.settings.content + '</div>';

    $("body").eq(0).append(dialogContent);

    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var bodyScrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        bodyScrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    var documentHeight = document.documentElement.clientHeight + document.documentElement.scrollHeight;
    var documentWidth = document.documentElement.clientWidth + document.documentElement.scrollWidth;
    var dialogHeight = $(".customTipsSuccessfulOperation")[0].clientHeight;
    var dialogWidth = $(".customTipsSuccessfulOperation")[0].clientWidth;
    var editFraTop = windowHeight / 2 - dialogHeight / 2 + bodyScrollTop >= 0 ? windowHeight / 2 - dialogHeight / 2 + bodyScrollTop : 0;
    var editFraLfet = windowWidth / 2 - dialogWidth / 2 >= 0 ? windowHeight / 2 - dialogHeight / 2 + bodyScrollTop : 0;
    $(".customTipsSuccessfulOperation").css({
        "top": editFraTop,
        "left": windowWidth / 2 - dialogWidth / 2,
        "position": "absolute",
        "z-index": "950000"
    });
    if (this.settings.time > 0) {
        setTimeout(function() {
            $(".customTipsSuccessfulOperation").remove();
        }, this.settings.time);
    }
}
})
