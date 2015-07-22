$(document).ready(function() {

	$("#full").fullpage({
		verticalCentered: true,
		slidesNavigation: false,
		css3: true,
		easing: "swing",
		touchSensitivity: 1
	});
	$.fn.fullpage.reBuild();

});
