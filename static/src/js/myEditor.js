require(["jquery","lay","tinymce",'paths'],function($,layer,tinymce,path){
    tinymce.init({
        selector: '#editor',
        height: 300,
        plugins: "code",
        toolbar: "undo redo | bold italic | mathjax  code ",
        language:'zh_CN',
        menubar: false,  //顶部菜单
        statusbar: false, //底部显示标签的地方
        external_plugins: { 'mathjax': path.static +'js/lib/tinymce/plugins/mathjax/plugin.js' },
        mathjax: { lib: path.static +'js/lib/math/tex-mml-chtml.js', symbols: { start: '\\(', end: '\\)' } },
        setup: function (editor) {
            // editor.ui.registry.addButton('加法减法', {
            //     text: '加法减法',
            //     onAction: function () {
            //         alert('Button clicked!');
            //     }
            // });
        }
    });

    function  ext_toolbar(editor) {
        editor.ui.registry.addMenuItem('加法减法', {
            text: '加法减法',
            onAction: function () {
                alert(123);
            }
        });

    }
});




