$(document).ready(function() {

	var nav = $('.header');

	function isMobile() {
		if ($(window).innerWidth() < 900) {
			return true
		}
	}

	//Mobile menu

	var menuMobile = $('.header__menu-mobile');
	var callbackMobile = $('.header__callback-mobile');

	$('.header__burger').on('click', function() {
		if (menuMobile.hasClass('header__menu-mobile_open')) {
			menuMobile.removeClass('header__menu-mobile_open')
		} else {
			menuMobile.addClass('header__menu-mobile_open')
		}
	});

	$('.header__phone').on('click', function() {
		if (callbackMobile.hasClass('header__callback-mobile_open')) {
			callbackMobile.removeClass('header__callback-mobile_open')
		} else {
			callbackMobile.addClass('header__callback-mobile_open')
		}
	});

	function showHide() {
		$('.header__menu-content-item_second').hide();
		$('.header__menu-content-item_first').show();
		$('.header__h2_menu').show();
		$('.header__h2_back').hide();
	}

	$('.header__close').on('click', function() {
		menuMobile.removeClass('header__menu-mobile_open');
		callbackMobile.removeClass('header__callback-mobile_open');
		showHide()
	});

	$('.header__h2_back').on('click', function() {
		showHide()
	});

	$('.header__menu-item:not(".header__menu-item_catalog")').on('click', function() {
		menuMobile.removeClass('header__menu-mobile_open');
	});

	$('.header__menu-link_products').on('click', function() {
		$('.header__h2_menu').hide();
		$('.header__h2_back').show();
		$('.header__menu-content-item_second').show();
		$('.header__menu-content-item_first').hide();
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

	// Videos slick

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

	// Tools slick

    $('.chem-item__images').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        customPadding: "40px",
        variableWidth: true,
        asNavFor: '.chem-item__gallery',
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows: true
                }
            }
        ]
    });

    $('.chem-item__gallery').slick({
        slidesToShow: 4,
        slidesToScroll: 0,
        asNavFor: '.chem-item__images',
        centerMode: true,
        centerPadding: "0",
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    centerPadding: "10px"
                }
            }
        ]
    });

	// Station slick

	$('.station__item_big').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.station__item_small',
		responsive: [
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 3000,
					arrows: true
				}
			}
		]
	});

	$('.station__item_small').slick({
		slidesToShow: 4,
		slidesToScroll: 0,
		asNavFor: '.station__item_big',
		centerMode: true,
		centerPadding: "20px 40px",
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 700,
				settings: {
					centerPadding: "10px"
				}
			}
		]
	});

	if (isMobile()) {
		$('.content__projects-wrapper').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '20px'
		});

		$('.content__products').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '50px',
			responsive: [
				{
					breakpoint: 340,
					settings: {
						centerPadding: "23px"
					}
				}
			]
		});

		$('.content__partners-wrapper').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '65px 40px'
		});

		$('.content__chem-wrapper').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '30px 30px'
		});
	}

	if (!isMobile()) {
		nav.removeClass('header_fixed-static');
		$('.button').removeClass('button_mobile');
		$('.content__arrow').removeClass('content__arrow_mobile');
		$('.content__chem-buttons').removeClass('content__chem-buttons_mobile');
		$('.content__chem-arrow').removeClass('content__arrow_mobile');
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
	    var chem = window.location.pathname.indexOf('chem-') >= 0;
	    var tools = window.location.pathname.indexOf('tools-') >= 0;
	    var parts = window.location.pathname.indexOf('parts-') >= 0;

		if (chem || tools || parts) {
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
			nav.addClass('header_fixed')
		} else {
			navbar.removeClass('content__wrapper_fixed')
			nav.removeClass('header_fixed')
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

	if(isMobile()) {
		var imageItem = $('.switch__item-img');

		for (var i = 0; i < imageItem.length; i++) {
			var imageSrc = $(imageItem[i]).children().attr('src');

			$(imageItem[i]).attr('href', imageSrc);
		}

		imageItem.magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			}
		})
	}

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
	var buttonsArray = [].slice.call(buttons);

	buttonsArray.forEach(function(item, index, array) {
		$(item).on('click', function() {
			if ($(buttons[index]).children()[0].checked) {
				var firstLine = $('.switch__calc-washes');

				$(buttons[index]).prevAll().children().filter('input').attr('checked', true).addClass('switch__checkbox_checked');
				$(buttons[index]).nextAll().children().filter('input').attr('checked', false).removeClass('switch__checkbox_checked');

				firstLine.attr('class', 'switch__calc-washes switch__calc-washes_first switch__calc-washes_active');

				const total = $.number((index + 1) * 300000, 0, ' ', ' ');

				$('.switch__cars').html((index + 1) * 50);
				$('.switch__total-cars').html((index + 1) * 25);
				$('.switch__per-month').html((index + 1) * 100000);
				$('.switch__total').html(total);
			}
		})
	})
});


