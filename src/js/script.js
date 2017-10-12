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
        }
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
        dots: true,
        centerMode: true,
        focusOnSelect: true
    });

    //Number validation
    var countryCode = '+7';
    $("input[name='phone']").mask(countryCode + ' ' + '(999) 999-99-99');


    //Modal form

    // var modals = [
    //     'confident',
    //     'oferta',
    //     'rules'
    // ];
    //
    // modals.forEach(function(item) {
    //     $('.footer__agreement_' + item).click(function() {
    //         $('.modal-window_' + item).fadeIn();
    //     });
    // });
    //
    // $('.modal-window__close').click(function() {
    //     $('.modal-window').fadeOut();
    // });

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
        var $header = $('.header');
        var $main = $('main');

        links.forEach(function(item) {
            if (window.location.pathname && window.location.pathname.indexOf(item) >= 0) {
                for (var i = 0; i < $allMenuItems.length; i++) {
                    if ($($allMenuItems[i]).hasClass('header__menu-item_active')) {
                        $($allMenuItems[i]).removeClass('header__menu-item_active');
                    }
                }

                // if(item !== 'index') {
                //     $header.addClass('header_pages');
                //     $main.addClass('main_pages');
                //
                //     if(item === 'about') {
                //         $main.addClass('main_pages-about');
                //     }
                // }

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
            if(window.location.pathname === '/' || window.location.pathname.indexOf("index") >= 0) {
                item.removeClass(item.selector + '_pages')
            } else {
                item.addClass(item.selector + '_pages')
            }

            if(window.location.pathname.indexOf('about') >= 0) {
                $('main').addClass('main_pages-about');
            }
        })
    }

    setMainClass();

    function setStationClass() {
        if(window.location.pathname.indexOf('station') >= 0) {
            $('.headers').addClass('headers_station');
        }
    }

    setStationClass();

    // var scrollHeight = isMobile() ? 50 : 136;

    // Menu fixed

    var navbar = $('.content__wrapper_custom');

    $(window).scroll(function() {
        if ($(this).scrollTop() > 136) {
            navbar.addClass('content__wrapper_fixed')
        } else {
            navbar.removeClass('content__wrapper_fixed')
        }
    });

    // Textarea valid

    $('.content__textarea').change(function() {
        if (this.value !== '') {
            $(this).addClass('content__textarea_valid')
        } else {
            $(this).removeClass('content__textarea_valid')
        }
    })
});


