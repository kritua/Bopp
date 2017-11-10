$(document).ready(function() {

    var nav = $('.header');

    function isMobile() {
        if ($(window).innerWidth() < 700) {
            return true
        }
    }

    //Mobile menu

    var menuMobile = $('.header__menu-mobile');
    var menuItems = [
        'burger',
        'phone'
    ];

    menuItems.forEach(function(item, index) {
        $('.header__' + item).on('click', function() {
            if (menuMobile.hasClass('header__menu-mobile_open')) {
                menuMobile.removeClass('header__menu-mobile_open');
                $('.header__mobile-menu').removeClass('header__mobile-menu_opened header__mobile-menu_' + item);
            } else {
                menuMobile.addClass('header__menu-mobile_open');
                $('.header__mobile-menu').addClass('header__mobile-menu_opened header__mobile-menu_' + item);
            }
        });
    });


    $('.header__menu-item').on('click', function() {
        menuMobile.removeClass('header__menu-mobile_open')
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

        $('html,body').animate({ scrollTop: $(this.hash).offset() ? $(this.hash).offset().top : 0 }, 700);
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

    })

    // var scrollHeight = isMobile() ? 50 : 136;

    // // Menu fixed
    // $(window).scroll(function() {
    //     if ($(this).scrollTop() > scrollHeight) {
    //         nav.addClass('header_fixed')
    //     } else {
    //         nav.removeClass('header_fixed')
    //     }
    // })
});


