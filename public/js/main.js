require.config({
	baseUrl: './',
	waitSeconds: 15
});

require(["jquery"], function ($) {
	$.getJSON("story/homeworld.json", function(data) {
		
	});
});