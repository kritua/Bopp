$(document).ready(function() {

    var nav = $('.header');

    function isMobile() {
        if ($(window).innerWidth() < 700) {
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

    if(isMobile()) {
        $('.header__menu-item_user').hide();
    }

    var passwordCheckbox = $('.modal-window__checkbox_password');

    passwordCheckbox.on('click', function() {
        if(!this.checked) {
            $('.modal-window__passwords').fadeIn()
        } else {
            $('.modal-window__passwords').fadeOut()
        }

    });

    //First page slider
    $('.page-headers__slick-wrapper').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: $('.page-headers__switch-button_left'),
        nextArrow: $('.page-headers__switch-button_right')
    });

    // scroll to start event

    var isScrolled = false;

    //Work slider

    var $slides = $('.work__slides');
    var $switches = $('.work__switches');

    $slides.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        dots: true,
        autoplaySpeed: 3000,
        prevArrow: $('.work__switch-button_left'),
        nextArrow: $('.work__switch-button_right'),
        appendDots: $switches,
        dotsClass: 'work__switch',
        customPaging: function(slider, i) {
            var title = $(slider.$slides[i]).children()[1].innerHTML;

            return '<a class="work__switch-inside"> ' + title + ' </a>';
        }
    });

    $slides.on('afterChange', function(slick, currentSlide) {
        var slide = currentSlide.currentSlide;

        $('.work__step span').text((slide + 1) + '/7');
    });

    $(window).scroll(function() {
        var hT = $('.work__slides').offset().top,
            hH = $('work__slides').outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();

        if (wS > (hT + hH - wH)) {
            $slides.slick('slickPlay');
            isScrolled = true;
        }
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

    // Login register modals

    var userModals = [
        'login',
        'register'
    ];

    userModals.forEach(function(item) {
        $('.button__modal_' + item).click(function() {
            $('.modal-window_' + item).fadeIn();
        })
    });

    //Slow scrolling

    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();

        $('html,body').animate({ scrollTop: $(this.hash).offset() ? $(this.hash).offset().top : 0 }, 700);
    });

    var scrollHeight = isMobile() ? 50 : 136;

    // Menu fixed
    $(window).scroll(function() {
        if ($(this).scrollTop() > scrollHeight) {
            nav.addClass('header_fixed')
        } else {
            nav.removeClass('header_fixed')
        }
    })
});


