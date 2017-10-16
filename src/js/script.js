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

    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();

        var varOffset = isMobile() ? 40 : 70;

        $('html,body').animate({ scrollTop: $(this.hash).offset() ? $(this.hash).offset().top - varOffset : 0 }, 700);
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

    // Active items

    var itemsToSet = [
        'print',
        'build',
        'pack',
        'office',
        'prom'
    ];

    // var allItems = $('.content__inner-block-2');
    // var allButtons = $('.content__choice-item-2');
    //
    // console.log(allItems)
    //
    //
    // for (var y = 0; y < allButtons.length; y++) {
    //     $(allButtons[y]).click(function(y) {
    //         $(allItems).removeClass('content__inner-block_active');
    //         $(allItems[y]).addClass('content__inner-block_active');
    //     })(y)
    // }

    //Submit button script

    $('button[type="submit"]').click(function () {
        var $form = $(this).closest('form');
        $.post('./form.php', $form.serialize(), function (data) {
            // if (data.res == 'success') yaCounter42155824.reachGoal('zayavka');
            $form.find('.message').html('<div class="alert alert-' + data.res + '">' + data.msg + '</div>');
        }, 'json');
        $form.trigger('reset');
        return false;
    });


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

});


