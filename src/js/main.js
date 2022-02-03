
(function ($) {
	
	"use strict";
	
	var fullHeight = function() {
		
		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});
		
	};
	fullHeight();
	
	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
	});
	
})(jQuery);


//  Card code


(function () {
	$(".size").on('click', function () {
		$(this).toggleClass('focus').siblings().removeClass('focus');
	})
}
)()