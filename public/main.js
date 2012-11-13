$(document).ready(function () {
	$("#root").fadeIn(500);

	var $militaryCount = $("#military-status"),
	    $civilianCount = $("#civilian-status"),
	    $history       = $("#history"),
	    $eventArea     = $("#event-text");

	$('a').click(function (event) {
		event.preventDefault();
		var choice  = $(this),
		    fromId  = choice.attr("data-from"),
		    toId    = choice.attr("data-to"),
		    action  = choice.attr("data-event"),
		    milLoss = choice.attr("data-mil-loss"),
		    civLoss = choice.attr("data-civ-loss");

		var $from = $("#" + fromId),
		    $to   = $("#" + toId);

		var currentCivilian = $civilianCount.text(),
		    currentMilitary = $militaryCount.text();

		choice.parent().remove();
		$militaryCount.text(currentMilitary - milLoss);
		$civilianCount.text(currentCivilian - civLoss);
		$eventArea.text(">> " + action);
		if (toId) {
			$from.fadeOut(0);
			$to.fadeIn(800);
			$("<li/>", {text: choice.text()}).appendTo($history);
		}
	});
});