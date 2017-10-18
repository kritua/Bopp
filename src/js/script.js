$(document).ready(function() {

	var nav = $('.header');

	function isMobile() {
		if ($(window).innerWidth() < 900) {
			return true
		}
	}

	//Mobile menu

	var menuMobile = $('.header__menu-mobile');

	$('.header__burger').on('click', function() {
		if (menuMobile.hasClass('header__menu-mobile_open')) {
			menuMobile.removeClass('header__menu-mobile_open')
		} else {
			menuMobile.addClass('header__menu-mobile_open')
		}
	});

	$('.header__menu-item').on('click', function() {
		menuMobile.removeClass('header__menu-mobile_open')
	});


	var $slides = $('.content__review-wrapper');

	$slides.slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		dots: true,
		autoplaySpeed: 5000,
		prevArrow: $('.content__button-control_left'),
		nextArrow: $('.content__button-control_right'),
		appendDots: $('.content__review-controls'),
		dotsClass: 'content__review-dots',
		customPaging: function(slider, i) {
			var title = $(slider.$slides[i]).children()[1].innerHTML;

			return '<a class="content__dot"></a>';
		}
	});

	var $videos = $('.content__video-wrapper');

	$videos.slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: false,
		dots: true,
		autoplaySpeed: 5000,
		prevArrow: $('.content__video-control_left'),
		nextArrow: $('.content__video-control_right'),
		appendDots: $('.content__video-controls'),
		dotsClass: 'content__review-dots',
		customPaging: function(slider, i) {
			return '<a class="content__dot"></a>';
		},
		responsive: [
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true,
					centerPadding: "20px"
				}
			}
		]
	});

	$('.content__map-mobile').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '20px'
	});

	$('.station__item_big').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.station__item_small'
	});
	$('.station__item_small').slick({
		slidesToShow: 4,
		slidesToScroll: 0,
		asNavFor: '.station__item_big',
		centerMode: true,
		centerPadding: "20px 40px",
		focusOnSelect: true
	});

	if(isMobile()) {
		$('.content__projects-wrapper').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '20px'
		})
	}

	if(isMobile()) {
		$('.content__products').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '20px'
		})
	}

	if(!isMobile()) {
		$('.button').removeClass('button_mobile');
		$('.content__arrow').removeClass('content__arrow_mobile');
		$('.content__chem-buttons').removeClass('content__chem-buttons_mobile');
		$('.content__chem-arrow').removeClass('content__arrow_mobile');
	}

	if(isMobile()) {
		$('.content__partners-wrapper').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '65px 40px'
		})
	}

	//Number validation
	var countryCode = '+7';
	$("input[name='phone']").mask(countryCode + ' ' + '(999) 999-99-99');


	//Modal form

	$('.button_modal').click(function() {
		$('.modal-window__content').removeClass('modal-window__content_active');
		$('.modal-window__content:first').addClass('modal-window__content_active');
		$('.modal-window').fadeIn();
	});

	$('.modal-window__close, .modal-window__overlay').click(function() {
		$('.modal-window').fadeOut();
	});

	var contentItems = $('.modal-window__content');

	$('.button_next').click(function() {
		$(this)
			.closest('.modal-window__content')
			.removeClass('modal-window__content_active')
			.next('.modal-window__content')
			.addClass('modal-window__content_active')
	});

	$('.button_prev').click(function() {
		$(this)
			.closest('.modal-window__content')
			.removeClass('modal-window__content_active')
			.prev('.modal-window__content')
			.addClass('modal-window__content_active')
	});

	//Slow scrolling

	$('a[href*="#"]').on('click', function(e) {
	    e.preventDefault();

	    $('html,body').animate({ scrollTop: $(this.hash).offset() ? $(this.hash).offset().top : 0 }, 700);
	});

	//Active header item

	function setActiveMenuItem() {
		var links = [
			'index',
			'about',
			'catalog',
			'projects',
			'rent',
			'business',
			'contacts'
		];

		var $allMenuItems = $('.header__menu-list').children();

		links.forEach(function(item) {
			if (window.location.pathname && window.location.pathname.indexOf(item) >= 0) {
				for (var i = 0; i < $allMenuItems.length; i++) {
					if ($($allMenuItems[i]).hasClass('header__menu-item_active')) {
						$($allMenuItems[i]).removeClass('header__menu-item_active');
					}
				}

				var $allActive = $('.header__menu-item_' + item);

				for (var y = 0; y < $allActive.length; y++) {
					$($allActive[y]).addClass('header__menu-item_active')
				}
			}
		});
	}

	setActiveMenuItem();

	function setMainClass() {
		var elems = [
			$('header'),
			$('main')
		];

		elems.forEach(function(item) {
			if (window.location.pathname === '/' || window.location.pathname.indexOf("index") >= 0) {
				item.removeClass(item.selector + '_pages')
			} else {
				item.addClass(item.selector + '_pages')
			}

			if (window.location.pathname.indexOf('about') >= 0) {
				$('main').addClass('main_pages-about');
			}
		})
	}

	setMainClass();

	function setStationClass() {
		if (window.location.pathname.indexOf('station') >= 0) {
			$('.headers').addClass('headers_station');
			$('.content__video').addClass('content__video_pages');
			$('.content__video-wrapper').addClass('content__video-wrapper_less');
			$('.content__video-controls').hide();
		}
	}

	setStationClass();

	function setChemClass() {
		if (window.location.pathname.indexOf('chem-') >= 0) {
			$('.headers').addClass('headers_chem');
			$('.content__chem').addClass('content__chem_pages');
		}
	}

	setChemClass();


	var scrollHeight = isMobile() ? 50 : 136;

	// Menu fixed

	var navbar = $('.content__wrapper_custom');

	$(window).scroll(function() {
		if ($(this).scrollTop() > scrollHeight) {
			navbar.addClass('content__wrapper_fixed');
			$('.header').addClass('header_fixed')
		} else {
			navbar.removeClass('content__wrapper_fixed')
			$('.header').removeClass('header_fixed')
		}
	});



	// Textarea valid

	$('.content__textarea').change(function() {
		if (this.value !== '') {
			$(this).addClass('content__textarea_valid')
		} else {
			$(this).removeClass('content__textarea_valid')
		}
	});

	// Gallery

	$('.chem-item__image').magnificPopup({
		type: 'image'
	});

	// Business page

	var construction = $('.button_construction');
	var calculator = $('.button_calculator');
	var switchConst = $('.switch__block_construction');
	var switchCalc = $('.switch__block_calculator');

	construction.click(function() {
		construction.removeClass('button_inactive');
		calculator.addClass('button_inactive');
		switchConst.removeClass('switch__block_inactive');
		switchCalc.addClass('switch__block_inactive');
	});

	calculator.click(function() {
		calculator.removeClass('button_inactive');
		construction.addClass('button_inactive');
		switchCalc.removeClass('switch__block_inactive');
		switchConst.addClass('switch__block_inactive');
	});

	var buttons = $('.switch__button');
	var inputs = $('.switch__button input');
	var buttonsArray = [].slice.call(buttons);
	var inputsArray = [].slice.call(inputs);

	buttonsArray.forEach(function(item, index, array) {
		$(item).on('click', function() {
			if($(item).children()[0].checked) {
				var firstLine = $('.switch__calc-washes_first');
				var secondLine = $('.switch__calc-washes_second');
				var firstLineInput = firstLine.find('.switch__checkbox');
				var secondLineInput = firstLine.find('.switch__checkbox');

				$(item).prevAll().children().filter('input').attr('checked', true);
				$(item).nextAll().children().filter('input').attr('checked', false);

				if(index <= 7) {
					firstLine.attr('class', 'switch__calc-washes switch__calc-washes_first switch__calc-washes_' + (index + 1));
					secondLine.attr('class', 'switch__calc-washes switch__calc-washes_second');
					secondLine.find('.switch__checkbox').attr('checked', false);
				} else {
					firstLine.attr('class', 'switch__calc-washes switch__calc-washes_first switch__calc-washes_8');
					secondLine.attr('class', 'switch__calc-washes switch__calc-washes_second switch__calc-washes_' + (index - 7 ));
					firstLine.find('.switch__checkbox').attr('checked', true);
				}

				const maxPercent = (index + 1) / 0.1 > 50 ? 50 : (index + 1) / 0.1;
				const total = $.number((index + 1) * 300000, 0, ' ', ' ');

				$('.switch__cars').html((index + 1) * 50);
				$('.switch__total-cars').html((index + 1) * 25);
				$('.switch__per-month').html((index + 1) * 100000);
				$('.switch__spend').html(maxPercent);
				$('.switch__total').html(total);
			}
		})
	})
});


