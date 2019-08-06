require.config({
	// baseUrl: "http://wufff.estudyimages.dev.dodoedu.com/static/src/js",
	baseUrl: "http://estudyimages.dev.dodoedu.com/static/src/js",
	urlArgs: "v=" + new Date().getTime(),
	paths: {
			"jquery": "./lib/jquery/jquery1.21",
			"lay":"./lib/layer/layer",
			"expression": "./ui/expression",
			"album": "./ui/album",
			"path":"./tools/path",
			"page": "./tools/pages",
			"ZeroClipboard":"./lib/ueditor/third-party/zeroclipboard/ZeroClipboard.min",
			"layui":"./lib/layui/layui.all",
			"api":"./tools/api",
			"tools":"./tools/tools"

	},
	shim: {
		  "ZeroClipboard":{
         	exports:"ZeroClipboard"
          },
          "layui":{
          	exports:"layui"
          }
	}
});
