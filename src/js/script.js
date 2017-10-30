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


    //Number validation
    var countryCode = '+7';
    $("input[name='phone']").mask(countryCode + ' ' + '(999) 999-99-99');

    //Modal form

    $('.button_modal').click(function() {
        $('.modal-window').fadeIn();
    });

    $('.modal-window__close, .modal-window__overlay').click(function() {
        $('.modal-window').fadeOut();
    });

    //Slow scrolling

    function slowScroll(isPrevented) {
        $('a[href*="#"]').on('click', function(e) {

            if(isPrevented) {
                e.preventDefault();
            }

            var varOffset = isMobile() ? 40 : 70;

            $('html,body').animate({ scrollTop: $(this.hash).offset() ? $(this.hash).offset().top - varOffset : 0 }, 700);
        });
    }

    if(window.location.pathname === '/' || window.location.pathname.indexOf('index') > 0) {
        slowScroll(true)
    } else {
        slowScroll()
    }

    var scrollHeight = isMobile() ? 50 : 136;

    // Menu fixed

    $(window).scroll(function() {
        if ($(this).scrollTop() > scrollHeight) {
            nav.addClass('header_fixed')
        } else {
            nav.removeClass('header_fixed')
        }
    });


    // Pages

    function setPages() {
        if(window.location.pathname !== '/' && window.location.pathname.indexOf('index') < 0) {
            $('main').addClass('main_pages');
            $('header').addClass('header_pages');
        }
    }

    setPages();

    //Submit button script

    $('button[type="submit"]').click(function () {
        var $form = $(this).closest('form');
        $.post('./form.php', $form.serialize(), function (data) {
            if (data.res == 'success') yaCounter45828519.reachGoal('zayavka');
            $form.find('.message').html('<div class="alert alert-' + data.res + '">' + data.msg + '</div>');
        }, 'json');
        $form.trigger('reset');
        return false;
    });

    // Active items

    var itemsToSet = [
        'print',
        'build',
        'pack',
        'office',
        'prom',
        'glue'
    ];

    itemsToSet.forEach(function(item) {
        $('.content__choice-item_' + item).click(function() {
            $('.content__inner-block').removeClass('content__inner-block_active');
            $('.content__inner-block_' + item).addClass('content__inner-block_active');
            $('.content__choice-item').removeClass('content__choice-item_active');
            $('.content__choice-item_' + item).addClass('content__choice-item_active')
        });

        $('.content__choice-item-2_' + item).click(function() {
            $('.content__inner-block-2').removeClass('content__inner-block-2_active');
            $('.content__inner-block-2_' + item).addClass('content__inner-block-2_active');
            $('.content__choice-item-2').removeClass('content__choice-item-2_active');
            $('.content__choice-item-2_' + item).addClass('content__choice-item-2_active')
        })
    });


    /*
     Анимация кнопки .ripplelink
     */

    $('.ripplelink').each(function() {
        var $this = $(this);

        var ink, d, x, y;

        setInterval(function() {
            if($this.find(".ink").length === 0){
                $this.prepend("<span class='ink'></span>");
            }

            ink = $this.find(".ink");
            ink.removeClass("animate");

            if(!ink.height() && !ink.width()){
                d = Math.max($this.outerWidth(), $this.outerHeight());
                ink.css({height: d, width: d});
            }

            x = Math.round(Math.random()*ink.width() - ink.width()/2);
            y = Math.round(Math.random()*ink.height() - ink.height()/2);
            // y = 0;
            // x = e.pageX - $this.offset().left - ink.width()/2;
            // y = e.pageY - $this.offset().top - ink.height()/2;

            ink.css({top: y+'px', left: x+'px'}).addClass("animate");
        }, 3000)
    });

});


