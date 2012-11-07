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
	template_set        = "<div class='set' id='<%= questionID %>'><div class='query'><%= query %></div><%= choices %></div>";
	template_choice_set = "<ol class='choice-list'><%= choices %></ol>";
	template_question   = "<div class='question'><%= query %></div>";
	template_choice     = "<li class='answer'><a href='#<%= destination %>' class='choicetext'><%= choice %></a><div class='eventtext'><%= eventtext %></div></li>";

	$.getJSON("story/homeworld.json", function (story) {
		
		// Loop through questions
		var i;
		for (i = 0; i < story.Questions.length; i += 1) {
			var compiled = "";
			var question = story.Questions[i];
			var j;

			// Loop through choices
			if (question.Choices instanceof Array) {
				var set_string = "";
				for (j = 0; j < question.Choices.length; j += 1) {
					var set = question.Choices[j];

					set_string += _.template(template_choice, {
						choice: set.Name,
						destination: set.Destination,
						eventtext: set.Event
					});
				}

				compiled = _.template(template_choice_set, {
					choices: set_string
				});
			}

			template = _.template(template_set, {
				questionID: question.Id,
				query: question.Query,
				choices: compiled,
			});

			$(template).appendTo('body');
		}
	});
});