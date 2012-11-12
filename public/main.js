$(document).ready(function () {
	$("#root").fadeIn(500);
	$eventArea = $("#event-text");

	$('a').click(function (event) {
		event.preventDefault();

		var choice = $(this),
		    fromId = choice.attr("data-from"),
		    toId   = choice.attr("data-to"),
		    action = choice.attr("data-event");

		var $from = $("#" + fromId),
		    $to   = $("#" + toId);

		choice.parent().remove();
		$eventArea.text(">> " + action);

		if ($to.length) {
			$from.fadeOut(0);
			$to.fadeIn(600);
		}
	})
})