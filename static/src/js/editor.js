require(["jquery","lay","tinymce",'paths'],function($,layer,tinymce,path){
    tinymce.init({
        selector: '#editor',
        language:'zh_CN',
        height: 300,
        menubar: false,  //顶部菜单
        plugins: "image emoticons  code",
        statusbar: false,
        toolbar: " undo redo | bold italic | alignleft aligncenter | image emoticons code "
    });
});

