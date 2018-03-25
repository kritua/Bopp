$(document).ready(function() {
    var nav = $('.header');

    function isMobile() {
        if ($(window).innerWidth() < 768) {
            return true
        }
    }

    function setActiveMenuItem() {
        var links = [
            'login',
            'register'
        ];

        links.forEach(function(item) {
            if (window.location.pathname && window.location.pathname.indexOf(item) >= 0) {
                $('.main').addClass('main_' + item);
            }
        });
    }

    setActiveMenuItem();

    // Background change on pages

    function changeBackground() {
        if(window.location.pathname === '/' || window.location.pathname === '/index.html') {
            if(!isMobile()) {
                $('body').css('backgroundImage', "url(\'../img/bg.jpg\')");
            } else {
                $('body').css('backgroundImage', "url(\'../img/bg-mobile.jpg\')");
            }
        }
    }

    changeBackground();

    // Mobile menu

    $('.header__mobile-item_burger').on('click', function() {
        $('.header__menu-mobile').toggleClass('header__menu-mobile_open');
        $('.header__mobile-menu').toggleClass('header__mobile-menu_opened');
    });

    $('.header__menu-item').on('click', function() {
        $('.header__menu-mobile').removeClass('header__menu-mobile_open')
    });

    // Slow scrolling

    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();

        $('html,body').animate({ scrollTop: $(this.hash).offset() ? $(this.hash).offset().top : 0 }, 700);
    });

    var scrollHeight = 80;

    // Menu fixed

    if(isMobile()) {
        $(window).scroll(function() {
            if ($(this).scrollTop() > scrollHeight) {
                nav.addClass('header_fixed')
            } else {
                nav.removeClass('header_fixed')
            }
        })
    }
});


