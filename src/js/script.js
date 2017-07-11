$(document).ready(function () {
	//Mobile menu
	$(".header__menu").addClass("header__menu--hidden");
	$(".header").removeClass("header--menu-opened");
	$(".header__button-burger").removeClass("header__button--hidden").on("click", function () {
		$(this).addClass("header__button--hidden");
		$(".header__button-close").removeClass("header__button--hidden");
		$(".header").addClass("header--menu-opened");
		$(".header__menu").removeClass("header__menu--hidden");
	});

	$(".header__button-close").addClass("header__button--hidden").on("click", function () {
		$(this).addClass("header__button--hidden");
		$(".header__button-burger").removeClass("header__button--hidden");
		$(".header").removeClass("header--menu-opened");
		$(".header__menu").addClass("header__menu--hidden");
	});


	//Header slideshow
	$(".header--index").vegas({
		delay: 10000,
		transition: 'fade',
		transitionDuration: '1000',
		timer: false,
		overlay: true,
		slides: [
			{src: "./img/bg-full-1.jpg"},
			{src: "./img/bg-full-2.jpg"},
			{src: "./img/bg-full-3.jpg"},
			{src: "./img/bg-full-4.jpg"}
		]
	});
	$("#header-previous").on('click', function () {
		$(".header--index").vegas('previous');
	});
	$("#header-next").on('click', function () {
		$(".header--index").vegas('next');
	});


	//Facts slideshow
	$(".about-us__item--image").vegas({
		delay: 5000,
		transition: 'fade',
		transitionDuration: '1000',
		timer: false,
		slides: [
			{src: "./img/work/slide-1.jpg"},
			{src: "./img/work/slide-2.jpg"},
			{src: "./img/work/slide-3.jpg"},
			{src: "./img/work/slide-4.jpg"},
			{src: "./img/work/slide-5.jpg"},
			{src: "./img/work/slide-6.jpg"},
			{src: "./img/work/slide-7.jpg"},
			{src: "./img/work/slide-8.jpg"},
			{src: "./img/work/slide-9.jpg"},
			{src: "./img/work/slide-10.jpg"},
			{src: "./img/work/slide-11.jpg"},
			{src: "./img/work/slide-12.jpg"},
			{src: "./img/work/slide-13.jpg"},
			{src: "./img/work/slide-14.jpg"},
			{src: "./img/work/slide-15.jpg"},
			{src: "./img/work/slide-16.jpg"},
			{src: "./img/work/slide-17.jpg"},
			{src: "./img/work/slide-18.jpg"},
			{src: "./img/work/slide-19.jpg"},
			{src: "./img/work/slide-20.jpg"},
			{src: "./img/work/slide-21.jpg"},
			{src: "./img/work/slide-22.jpg"},
			{src: "./img/work/docs-1.jpg", cover: false, color: 'white'},
			{src: "./img/work/docs-2.jpg", cover: false, color: 'white'},
			{src: "./img/work/docs-3.jpg", cover: false, color: 'white'}
		]
	});
	$("#about-us-previous").on('click', function () {
		$(".about-us__item--image").vegas('previous');
	});
	$("#about-us-next").on('click', function () {
		$(".about-us__item--image").vegas('next');
	});

	// Docs slideshow

	$('.about-us__item--docs').vegas({
		delay: 5000,
		transition: 'fade',
		transitionDuration: '1000',
		timer: false,
		slides: [
			{src: "./img/work/docs-1.jpg", cover: false, color: 'white'},
			{src: "./img/work/docs-2.jpg", cover: false, color: 'white'},
			{src: "./img/work/docs-3.jpg", cover: false, color: 'white'}
		]
	});
	$("#about-us-docs-previous").on('click', function () {
		$(".about-us__item--docs").vegas('previous');
	});
	$("#about-us-docs-next").on('click', function () {
		$(".about-us__item--docs").vegas('next');
	});


	$(".specialist__item--image").vegas({
		delay: 5000,
		transition: 'fade2',
		transitionDuration: '1000',
		timer: false,
		cover: false,
		shuffle: true,
		slides: [
			{src: "./img/trawl/slide-1.jpg"},
			{src: "./img/trawl/slide-2.jpg"},
			{src: "./img/trawl/slide-3.jpg"},
			{src: "./img/trawl/slide-4.jpg"},
			{src: "./img/trawl/slide-5.jpg"},
			{src: "./img/trawl/slide-6.jpg"},
			{src: "./img/trawl/slide-7.jpg"},
			{src: "./img/trawl/slide-8.jpg"}
		]
	});
	$("#specialist-previous").on('click', function () {
		$(".specialist__item--docs").vegas('previous');
	});
	$("#specialist-next").on('click', function () {
		$(".specialist__item--docs").vegas('next');
	});

	$(".specialist__item--docs").vegas({
		delay: 5000,
		transition: 'fade2',
		transitionDuration: '1000',
		timer: false,
		shuffle: true,
		slides: [
			{src: "./img/docs/slide-1.jpg", cover: false},
			{src: "./img/docs/slide-2.jpg", cover: false},
			{src: "./img/docs/slide-3.jpg", cover: false}
		]
	});
	$("#specialist-docs-prev").on('click', function () {
		$(".specialist__item--docs").vegas('previous');
	});
	$("#specialist-docs-next").on('click', function () {
		$(".specialist__item--docs").vegas('next');
	});


	//Extends jquery lib to add on scroll events
	$.fn.extend({
		// watching for element's appearance in browser viewport
		appear: function (options) {
			var opts = $.extend({}, defaults, options || {});
			var selector = this.selector || this;
			if (!check_binded) {
				var on_check = function () {
					if (check_lock) {
						return;
					}
					check_lock = true;

					setTimeout(process, opts.interval);
				};

				$(window).scroll(on_check).resize(on_check);
				check_binded = true;
			}

			if (opts.force_process) {
				setTimeout(process, opts.interval);
			}
			add_selector(selector);
			return $(selector);
		}
	});
	$.fn.extend({
		// watching for element's appearance in browser viewport
		appear: function (options) {
			var check_binded = false;
			var selectors = [];
			var check_lock = false;
			var $prior_appeared = [];
			var defaults = {
				interval: 250,
				force_process: false
			};
			var $window = $(window);

			function add_selector(selector) {
				selectors.push(selector);
				$prior_appeared.push();
			}

			function appeared(selector) {
				return $(selector).filter(function () {
					return $(this).is(':appeared');
				});
			}

			function process() {
				check_lock = false;
				for (var index = 0, selectorsLength = selectors.length; index < selectorsLength; index++) {
					var $appeared = appeared(selectors[index]);

					$appeared.trigger('appear', [$appeared]);

					if ($prior_appeared[index]) {
						var $disappeared = $prior_appeared[index].not($appeared);
						$disappeared.trigger('disappear', [$disappeared]);
					}
					$prior_appeared[index] = $appeared;
				}
			}

			$.expr[':'].appeared = function (element) {
				var $element = $(element);
				if (!$element.is(':visible')) {
					return false;
				}

				var window_left = $window.scrollLeft();
				var window_top = $window.scrollTop();
				var offset = $element.offset();
				var left = offset.left;
				var top = offset.top;

				if (top + $element.height() >= window_top &&
					top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
					left + $element.width() >= window_left &&
					left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
					return true;
				} else {
					return false;
				}
			};
			var opts = $.extend({}, defaults, options || {});
			var selector = this.selector || this;
			if (!check_binded) {
				var on_check = function () {
					if (check_lock) {
						return;
					}
					check_lock = true;

					setTimeout(process, opts.interval);
				};

				$(window).scroll(on_check).resize(on_check);
				check_binded = true;
			}

			if (opts.force_process) {
				setTimeout(process, opts.interval);
			}
			add_selector(selector);
			return $(selector);
		}
	});


	//Circle variable. Starts animation on visibility
	var el = $('.circle'),
		inited = false;
	el.appear({force_process: true});
	el.on('appear', function () {
		if (!inited) {
			el.circleProgress({});
			inited = true;
		}
	});

	//Circles 1-4
	$(el).circleProgress({
		startAngle: -Math.PI / 6 * 3,
		value: 0.36,
		fill: {gradient: ['#3571a3', '#3571a3']}
	}).on('circle-animation-progress', function (event, progress) {
		$(this).find('strong').html(parseInt(276 * progress) + '<br>' + '<i>тыс. тонн</i>');
	});
	$(".circle--second").circleProgress({
		value: 0.46
	}).on('circle-animation-progress', function (event, progress) {
		$(this).find('strong').html(parseInt(356 * progress) + '<br>' + '<i>тыс. тонн</i>');
	});
	$(".circle--third").circleProgress({
		value: 0.16
	}).on('circle-animation-progress', function (event, progress) {
		$(this).find('strong').html(parseInt(123 * progress) + '<br>' + '<i>тыс. тонн</i>');
	});
	$(".circle--fourth").circleProgress({
		value: 0.02
	}).on('circle-animation-progress', function (event, progress) {
		$(this).find('strong').html(parseInt(12 * progress) + '<br>' + '<i>тыс. тонн</i>');
	});


	//Circles about page
	$(".circle--big").circleProgress({
		startAngle: -Math.PI / 6 * 3,
		value: 1,
		size: 300,
		fill: {gradient: ['#3571a3', '#3571a3']}
	}).on('circle-animation-progress', function (event, progress) {
		$(this).find('strong').html(parseInt(432 * progress) + '<br>' + '<i>тыс. тонн</i>');
	});
	$(".circle--about").circleProgress({
		startAngle: -Math.PI / 6 * 3,
		value: 1,
		fill: {gradient: ['#3571a3', '#3571a3']}
	}).on('circle-animation-progress', function (event, progress) {
		$(this).find('strong').html(parseInt(432 * progress) + '<br>' + '<i>тыс. тонн</i>');
	});
	$(".circle--about-second").circleProgress({
		value: 0.29
	}).on('circle-animation-progress', function (event, progress) {
		$(this).find('strong').html(parseInt(500 * progress) + '<br>' + '<i>тыс. тонн</i>');
	});
	$(".circle--about-third").circleProgress({
		value: 0.05
	}).on('circle-animation-progress', function (event, progress) {
		$(this).find('strong').html(parseInt(85 * progress) + '<br>' + '<i>тыс. тонн</i>');
	});


	//Clients slider
	$('.clients__slider').slick({
		infinite: true,
		slidesToShow: 6,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}
		]
	});


	//Gallery
	$(document).ready(function () {
		$('.features-slide__item--images.gallery__one').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function (item) {
					return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
				}
			}
		});
	});


	//Modal form
	$(".modal-window__click").click(function () {
		$('.modal-window').fadeIn();
		$('.modal-window__wrapper').delay(200).fadeIn();
	});
	$(".modal-window__close-form").click(function () {
		$('.modal-window__wrapper').fadeOut();
		$('.modal-window').fadeOut();
	});
	$(".modal-window").click(function () {
		$('.modal-window__wrapper').fadeOut();
		$('.modal-window').fadeOut();
	});
	if ($(window).width() >= 768) {
		$('a').each(function () {
			if ($(this).attr('href') && $(this).attr('href').indexOf('tel:') > -1) $(this).removeAttr('href');
		});
	}


	//Number validation
	var countryCode = '+7';
	$("input[name='phone']").mask(countryCode + ' ' + '(999) 999-99-99');


	//Submit button script

	$('button[type="submit"]').click(function () {
		var $form = $(this).closest('form');
		$.post('./form.php', $form.serialize(), function (data) {
			if (data.res == 'success') yaCounter42155824.reachGoal('zayavka');
			$form.find('.message').html('<div class="alert alert-' + data.res + '">' + data.msg + '</div>');
		}, 'json');
		$form.trigger('reset');
		return false;
	});


	//Slow scrolling

	$('a[href*="#"]').on('click', function () {
		$('html,body').animate({scrollTop: $(this.hash).offset() ? $(this.hash).offset().top : 0}, 700);
	});



	//Active header item

	const $allMain = $('main');
	const $allHeaderElems = $('.header__menu-item');

	for(var i = 0; i < $allHeaderElems.length; i++) {
		var path = $allHeaderElems[i].children[0].pathname;

		if(path.slice(1, path.length - 5) === $allMain[0].id) {
			$($allHeaderElems[i]).addClass('header__menu-item--active');
			$allHeaderElems[i].children[0].href = '#'
		}
	}
});


