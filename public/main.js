$(document).ready(function () {
	"use strict";

	var $choices       = $("#choices"),
	    $civilianCount = $("#civilian-status"),
	    $eventArea     = $("#event-text"),
	    $history       = $("#history"),
	    $militaryCount = $("#military-status"),
	    $mothership    = $("#mothership-status"),
	    $restart       = $("#restart"),
	    totalMilitary  = $civilianCount.text(),
	    totalCivilian  = $militaryCount.text();

	function gameOver() {
		$mothership.text("Destroyed");
		$(".question").hide();
		$(".choices").hide();
		$restart.fadeIn(1000);
	}

	$("#root").fadeIn(500);

	$('a.choice').click(function (event) {
		event.preventDefault();
		var choice  = $(this),
		    fromId  = choice.attr("data-from"),
		    toId    = choice.attr("data-to"),
		    action  = choice.attr("data-event"),
		    milLoss = choice.attr("data-mil-loss"),
		    civLoss = choice.attr("data-civ-loss"),
		    boom    = choice.attr("data-mothership-boom"),

		    $from = $("#" + fromId),
		    $to   = $("#" + toId),

		    currentCivilian = $civilianCount.text(),
		    currentMilitary = $militaryCount.text();

		choice.parent().remove();

		totalMilitary = currentMilitary - milLoss;
		if (totalMilitary < 0) {
			totalMilitary = 0;
		}

		totalCivilian = currentCivilian - civLoss;
		if (totalCivilian < 0) {
			totalCivilian = 0;
		}

		if (boom === "true") {
			gameOver();
		}

		$militaryCount.text(totalMilitary);
		$civilianCount.text(totalCivilian);
		$eventArea.text(">> " + action);

		if (toId) {
			$from.fadeOut(0);
			$to.fadeIn(800);
			$("<li/>", {text: choice.text()}).appendTo($history);
		}
	});
});