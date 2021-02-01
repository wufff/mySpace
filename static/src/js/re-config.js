require.config({
	baseUrl: "/myEditor/static/src/js",
	paths: {
		    "paths":"./path",
			"jquery": "./lib/jquery/jquery1.21",
			"lay":"./lib/layer/layer",
			"tinymce":"./lib/tinymce/tinymce.min"
	},
	shim: {
          "layui":{
          	exports:"layui"
          },
		  "tinymce":{
			exports:"tinymce"
		  }
	}
});
