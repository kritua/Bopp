$(document).ready(function () {

    var nav = $('.header');

    function isMobile() {
        if($(window).innerWidth() < 900) {
            return true
        }
    }

	//Mobile menu
    $('.header__menu').addClass("header__menu--hidden");
	nav.removeClass("header--menu-opened");
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


    //First page slider
    $('.page-headers__right-column').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    });

    //Work slider

    var $slides = $('.work__slides');
    var $switches = $('.work__switches');

    $slides.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
        autoplaySpeed: 5000,
        prevArrow: $('.work__switch-button_left'),
        nextArrow: $('.work__switch-button_right'),
        appendDots: $switches,
        dotsClass: 'work__switch',
        customPaging : function(slider, i) {
            var title = $(slider.$slides[i]).children()[1].innerHTML;

            return '<a class="work__switch-inside"> '+title+' </a>';
        }
    });

    $slides.on('afterChange', function(slick, currentSlide) {
        var slide = currentSlide.currentSlide;

        $('.work__step span').text((slide + 1) + '/7');
    });


	//Modal form

    var modals = [
        'confident',
        'oferta',
        'rules'
    ];

    modals.forEach(function(item) {
        $('.footer__agreement_' + item).click(function() {
            $('.modal-window_' + item).fadeIn();
        });
    });

	$('.modal-window__close').click(function() {
        $('.modal-window').fadeOut();
    });

	//Slow scrolling

	$('a[href*="#"]').on('click', function (e) {
	    e.preventDefault();

		$('html,body').animate({scrollTop: $(this.hash).offset() ? $(this.hash).offset().top : 0}, 700);
	});

	var scrollHeight = isMobile() ? 50 : 136;

	// Menu fixed
    $(window).scroll(function() {
        if($(this).scrollTop() > scrollHeight) {
            nav.addClass('header_fixed')
        } else {
            nav.removeClass('header_fixed')
        }
    })
});


