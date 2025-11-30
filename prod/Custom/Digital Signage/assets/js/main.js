$(function () {
	$("html").removeClass("no-js").addClass("js");

	var is_editor = $("html").hasClass("hs-inline-edit");

	//image slider
	$('.image-slides').slick({
		autoplay: true,
		autoplaySpeed: 4500,
		arrows: false,
		fade: true,
		speed: 500,
		cssEase: 'linear'
	});

	//redirect script
	$(".page-transition").each(function() {
		var item = $(this);
		var timeout = $(item).attr("data-timeout");
		var location = $(item).attr("data-location");

		var fade_timeout = (timeout - 0.75) * 1000;
		var redirect_timeout = timeout * 1000;

		//fade transition back in
		$.doTimeout( fade_timeout, function(){
			$(item).removeClass("out");
		});

		//redirect page
		$.doTimeout( redirect_timeout, function(){
			if( !is_editor) {
				document.location.href = location;
			}
		});
	});

	//airtable api
	$("#airtable_api").each(function() {
		var grid = $(this);
		var api_base = $(grid).attr("data-base");
		var api_table = $(grid).attr("data-table");

		var launch_time = $(grid).attr("data-launch-time");
		var current_time = $(grid).attr("data-now");

		if(api_base !== undefined && api_table !== undefined ) {
			var recordsUrl;
			var records;

			if( is_editor ) {
				recordsUrl = "https://hub-api.mccarroll.io/textile/airtable.php?base="+ api_base + "&table=" + api_table + "&fetch=airtable&addRow=0";
			} else {
				//check for timestamp
				if(current_time < launch_time) {
					recordsUrl = "https://hub-api.mccarroll.io/textile/airtable.php?base="+ api_base + "&table=" + api_table + "&fetch=database";
				} else {
					recordsUrl = "https://hub-api.mccarroll.io/textile/airtable.php?base="+ api_base + "&table=" + api_table + "&fetch=airtable&addRow=1";
				}
			}

			var schedule = (function () {
				var schedule = null;
				$.ajax({
					'async': false,
					'global': false,
					'url': recordsUrl,
					'dataType': "json",
					'success': function (data) {
						schedule = data;
					}
				});
				return schedule;
			})();
			records = schedule.records;


			$.each(records,function(i,v) {
				var fields = v.fields;
				var n = 1;
				var items = parseInt( fields["Items"] );
				var hr = false;

				$(grid).find(".day-content[data-day='"+i+"']").each(function() {
					for(var i=0; i < items; i++){
						var str = "";
						var item_h1 = fields["Item "+n+"_H1"];
						var item_h2 = fields["Item "+n+"_H2"];
						var item_h2_2 = fields["Item "+n+"_H2-2"];
						var item_h3 = fields["Item "+n+"_H3"];

						if(item_h1 !== undefined) {
							str = str + "<h1>" + item_h1 + "</h1>";
							hr = true;
						}
						if(item_h2 !== undefined) {
							if(hr == true) {
								str = str + "<hr>";
							}
							str = str + "<h2>" + item_h2 + "</h2>";
							hr = false;
						}
						if(item_h2_2 !== undefined) {
							if(hr == true) {
								str = str + "<hr>";
							}
							str = str + "<h2>" + item_h2_2 + "</h2>";
							hr = false;
						}
						if(item_h3 !== undefined) {
							if(hr == true) {
								str = str + "<hr>";
							}
							str = str + "<h3>" + item_h3 + "</h3>";
							hr = false;
						}

						$(this).append('<div class="schedule-item">'+str+'</div>');
						n = n + 1;
					}
				});
			});
		}
	});
});

$(window).load(function () {
	$(".page-transition").addClass("out");
});