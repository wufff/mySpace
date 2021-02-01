require(["jquery","lay","tinymce",'paths'],function($,layer,tinymce,path){
    tinymce.init({
        selector: '#editor',
        height: 300,
        plugins: "code",
        toolbar: "mathjax | code",
        language:'zh_CN',
        menubar: false,  //顶部菜单
        statusbar: false, //底部显示标签的地方
        external_plugins: { 'mathjax': path.static +'js/lib/tinymce/plugins/mathjax/plugin.js' },
        mathjax: { lib: path.static +'js/lib/math/tex-mml-chtml.js', symbols: { start: '\\(', end: '\\)' } },
        // setup: function (editor) {
        //     ext_toolbar(editor);
        // }
        setup: function (editor) {
            // editor.ui.registry.addButton('加法减法', {
            //     text: '加法减法',
            //     onAction: function () {
            //         alert('Button clicked!');
            //     }
            // });
        }
    });
});


function  ext_toolbar(editor) {
    editor.ui.registry.addMenuItem('加法减法', {
        text: '加法减法',
        onAction: function () {
            alert(123);
        }
    });

}
//
// tinymce.init({
//     branding: false,
//     selector: ".editor",
//     external_plugins: { 'mathjax': MathPlugin },
//     mathjax: { l在ib: MathLib, symbols: { start: '\\(', end: '\\)' } },
//
//
//     width: '100%',
//     height: 300,
//     plugins: " charmap code table   ",
//     toolbar: "bold italic underline strikethrough forecolor   table |   插入公式 手写公式 LaTex符号 上传图片 |  charmap   code | 三角函数 微分表 积分表 平面几何  立体几何  方程表  矩阵 概率   指数对数  ",
//     menubar: false,
//
//
//
//     menubar: '小学公式 初中公式 高中公式 微分 积分 概率论 线性代数 三角函数 平面几何 立体几何',
//     menu: {
//         小学公式: { title: '小学公式', items: '加法减法 乘法除法  括号运算 几何公式' },
//         初中公式: { title: '初中公式', items: '乘方 开方 二次方程根' },
//         高中公式: { title: '高中公式', items: '指数对数 等差求和 标准差 ' },
//         微分: { title: '微分', items: '极限 导数 偏分方程 ' },
//         积分: { title: '积分', items: '不定积分  定积分 二重积分' },
//         概率论: { title: '概率论', items: '贝叶斯定理 正态分布  泊松分布' },
//         线性代数: { title: '线性代数', items: '三阶行列式 矩阵 余子式' },
//
//         三角函数: { title: '三角函数', items: '正弦余弦 正切余切 正割余割' },
//
//         平面几何: { title: '平面几何', items: '抛物线 圆 椭圆 双曲线' },
//         立体几何: { title: '立体几何', items: '球的体积' },
//     },
//
//
//
//     setup: function (editor) {
//         ext_toolbar(editor);
//
//     }
//
// });
