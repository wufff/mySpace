require.config({
	baseUrl: "/mySpace/static/src/js",
	urlArgs: "v=" + new Date().getTime(),
	paths: {
			"jquery": "./lib/jquery/jquery",
			"bootstrap":"./lib/bootstrap/bootstrap.min.3.3.7",
			"bootstrap-hover-dropdown":"./lib/bootstrap/extend/bootstrap-hover-dropdown.min",
			"expression": "./ui/expression",
			"album": "./ui/album",
			"dialog": "./ui/dialog",
			"path":"./tools/path",
			"page": "./tools/pags",
			"inputE":"/ui/inputedit/index"
	},
	shim: {
         "bootstrap":["jquery"],
         "bootstrap-hover-dropdown":["bootstrap"],
         // 把全局变量导出
         "modells":{
         	exports:"modells"
         }
	}
});
