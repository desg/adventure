require.config({
	baseUrl: './',
	paths: {
		"jquery": "http://code.jquery.com/jquery-1.8.2.min",
		"underscore": "http://underscorejs.org/underscore-min",
		"d3": "http://d3js.org/d3.v2.min"
	},
	waitSeconds: 15
});

require(["jquery", "underscore", "d3"], function () {
	console.log($, _, d3);
});