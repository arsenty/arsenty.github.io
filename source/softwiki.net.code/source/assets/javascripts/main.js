'use strict';

$(document).ready(function() {

	// MatchHeight.js
	$(function() {
		$('.app-screens').find('.thumbnail').matchHeight();
		$('.cat-item').find('.thumbnail').matchHeight();
		// $('.match-height').matchHeight();
	});

	// Rating Semanitc-UI.com //
	$('.ui.rating')
	  .rating()
	;

	// Dropdowns Semanitc-UI.com //
	$('.dropdown')
	  .dropdown()
	;

	// Bootstrap Tooltips //
	$('[data-toggle="tooltip"]').tooltip();

	// Bootstrap Popover //
	$('[data-toggle="popover"]').popover({
		delay: 500,
		template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div>\
			<div class="popover-footer">\
			<div class="app-share btn-group btn-group-justified" role="group">\
				<div class="app-share__item btn btn-link" style="background-color:#39579A;color:white;">\
					<span class="fa fa-facebook fa-fw"></span>Share\
				</div>\
				<div class="app-share__item btn btn-link" style="background-color:#00A9EF;color:white;">\
					<span class="fa fa-twitter fa-fw"></span>Tweet\
				</div>\
				<div class="app-share__item btn btn-link" style="background-color:#CD0913;color:white;">\
					<span class="fa fa-share fa-fw"></span>Email\
				</div>\
			</div></div></div>'
	})

});
