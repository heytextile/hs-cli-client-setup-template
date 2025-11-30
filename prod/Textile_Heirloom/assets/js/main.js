function getUrlParameter(sParam) {
	var sPageURL = document.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
}
$(function () {
	$("html").removeClass("no-js").addClass("js");

	// Mitigate IE/Edge bug showing bullets on lists which are hidden when loading the page
	if (document.documentMode || /Edge/.test(navigator.userAgent)) {
		$('ul:hidden').each(function(){
			$(this).parent().append($(this).detach());
		});
	}

	//sticky header
	var overlay = false;
	var header_overlay = function() {
		var headerH = $("#siteHeader").outerHeight();
		var overlay = $(".hero-module").hasClass("hero-module__overlay");

		if(overlay) {
			var heroTheme = "light";
			var dktheme = $(".hero-module").hasClass("hero-module__theme--dark");
			if(dktheme) {
				heroTheme = "dark";
			}

			$("#siteHeader").attr("hero-overlay","1");
			$("#siteHeader").attr("hero-theme",heroTheme);

			$(".hero-module__inner").css("padding-top",headerH + 24);
		}
	};
	$(window).bind('resize',function(){
		header_overlay();
	}).resize();

	// http://css-tricks.com/snippets/jquery/smooth-scrolling/
	$('a[href*=#]:not([href=#]):not(.popup-modal)').click(function (e) {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var target = $(this.hash);
			e.preventDefault();
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
			}
		}
	});
});