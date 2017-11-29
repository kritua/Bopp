$(document).ready(function() {
    $('button[type="submit"]').click(function () {
        var $form = $(this).closest('form');
        $.post('./form.php', $form.serialize(), function (data) {
            if (data.res == 'success') {
                // yaCounter45828519.reachGoal('zayavka');
            }
            $form.find('.message').html('<div class="alert alert-' + data.res + '">' + data.msg + '</div>');
        }, 'json');
        $form.trigger('reset');
        return false;
    });


    var saveSumm = {};
    var savePeriod = {};
    var savePercent = {};

    $("#range_1").ionRangeSlider({
        min: 100000,
        max: 25000000,
        type: 'single',
        from: 500000,
        step: 50000,
        postfix: " руб.",
        prettify: true,
        onChange: function(obj) {
            saveSumm = obj;
            $('#creditform input[name=summ]').val(obj.fromNumber || saveSumm.fromNumber);
            $('#value_slider_amount,#value_slider_amount2').val(obj.fromNumber || saveSumm.fromNumber);
            update_amount()
        },
        onLoad: function(obj) {
            saveSumm = obj;
            $('#creditform input[name=summ]').val(obj.fromNumber || saveSumm.fromNumber);
            $('#value_slider_amount,#value_slider_amount2').val(obj.fromNumber || saveSumm.fromNumber);
            update_amount()
        }
    });

    function update_amount() {
        var perMonth = Math.round((saveSumm.fromNumber / savePeriod.fromNumber) + saveSumm.fromNumber * (savePercent.fromNumber / 100));

        $('span.ccalc-mp-c').html(perMonth);
    }

    $("#range_2").ionRangeSlider({
        min: 1,
        max: 60,
        type: 'single',
        from: 24,
        step: 1,
        postfix: " мес",
        prettify: false,
        hasGrid: false,
        onChange: function(obj) {
            savePeriod = obj;
            $('#value_slider_years,#value_slider_years2').val(obj.fromNumber || savePeriod.fromNumber);
            update_amount()
        },
        onLoad: function(obj) {
            savePeriod = obj;
            $('#value_slider_years,#value_slider_years2').val(obj.fromNumber || savePeriod.fromNumber);
            update_amount()
        }
    });

    $("#range_3").ionRangeSlider({
        min: 1.25,
        max: 6,
        type: 'single',
        from: 2,
        step: 0.25,
        postfix: " %",
        prettify: false,
        hasGrid: false,
        onChange: function(obj) {
            savePercent = obj;
            $('#value_slider_percent,#value_slider_percent2').val(obj.fromNumber || savePercent.fromNumber);
            update_amount()
        },
        onLoad: function(obj) {
            savePercent = obj;
            $('#value_slider_percent,#value_slider_percent2').val(obj.fromNumber || savePercent.fromNumber);
            update_amount()
        }
    });

    var nav = $('.header');

    function isMobile() {
        if ($(window).innerWidth() < 700) {
            return true
        }
    }

    //Number validation
    $("input[name='phone']").inputmask('+7 (999) 999-99-99');

    //Mobile menu

    var menuMobile = $('.header__menu-mobile');

    $('.header__burger').on('click', function() {
        if (menuMobile.hasClass('header__menu-mobile_open')) {
            menuMobile.removeClass('header__menu-mobile_open');
            $('.header__mobile-menu').removeClass('header__mobile-menu_opened');
        } else {
            menuMobile.addClass('header__menu-mobile_open');
            $('.header__mobile-menu').addClass('header__mobile-menu_opened');
        }
    });


    $('.header__menu-item').on('click', function() {
        menuMobile.removeClass('header__menu-mobile_open')
    });

    $('.button_modal, .header__phone').on('click', function() {
        $('.modal-window').fadeIn();
    });

    // Esc close modal

    document.onkeydown = function(evt) {
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key == "Escape" || evt.key == "Esc");
        } else {
            isEscape = (evt.keyCode == 27);
        }
        if (isEscape) {
            $('.modal-window').fadeOut();
        }
    };

    $('.modal-window__close').click(function() {
        $('.modal-window').fadeOut();
    });

    // Vegas slider

    var pageHeaders = $('.page-headers');

    var slides = [
        { src: '../img/slider/slider-1.jpg' },
        { src: '../img/slider/slider-2.jpg' },
        { src: '../img/slider/slider-3.jpg' }
    ];

    slides.forEach(function() {
        $('.page-headers__dots').append('<div class="page-headers__dot"></div>')
    });

    pageHeaders.vegas({
        slides: slides,
        overlay: true,
        timer: false,
        walk: function(index) {
            $('.page-headers__dot').each(function(i, item) {
                $(this).removeClass('page-headers__dot_active');
                if (index === i) {
                    $(item).addClass('page-headers__dot_active');
                }
            });
        }
    });

    $('.page-headers__dot').each(function(i, item) {
        $(item).on('click', function() {
            pageHeaders.vegas('jump', i)
        })
    });


    $('.page-headers__button_right').on('click', function() {
        $('.page-headers').vegas('next')
    });

    $('.page-headers__button_left').on('click', function() {
        $('.page-headers').vegas('previous')
    });


    //Slow scrolling

    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();

        $('html,body').animate({ scrollTop: $(this.hash).offset() ? $(this.hash).offset().top - 70 : 0 }, 700);
    });

    // Types slider

    $('.types__wrapper').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: $('.types__arrow_left'),
        nextArrow: $('.types__arrow_right'),
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                }
            }
        ]
    });

    $('.review__items').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: $('.review__arrow_left'),
        nextArrow: $('.review__arrow_right'),
        dots: true
    });

    $('.cert__items').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: $('.cert__arrow_left'),
        nextArrow: $('.cert__arrow_right'),
        centerMode: true,
        centerPadding: '350px',
        dots: true,
        responsive: [
            {
                breakpoint: 1601,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '270px'
                }
            },
            {
                breakpoint: 1441,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '250px'
                }
            },
            {
                breakpoint: 1367,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '230px'
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '220px'
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '120px'
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '10px'
                }
            }
        ]

    });

    $('.gallery__item').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    var scrollHeight = isMobile() ? 50 : 136;

    // Menu fixed
    $(window).scroll(function() {
        if ($(this).scrollTop() > scrollHeight) {
            nav.addClass('header_fixed')
        } else {
            nav.removeClass('header_fixed')
        }
    });
});


