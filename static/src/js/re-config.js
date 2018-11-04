require.config({
	baseUrl: "/mySpace/static/src/js",
	urlArgs: "v=" + new Date().getTime(),
	paths: {
			"jquery": "./lib/jquery/jquery",
			"expression": "./ui/expression",
			"album": "./ui/album",
			"dialog": "./ui/dialog",
			"path":"./tools/path",
			"page": "./tools/pags",
	},
	shim: {

	}
});
