$(document).ready(function() {

    var nav = $('.header');

    function isMobile() {
        if ($(window).innerWidth() < 700) {
            return true
        }
    }

    //Number validation
    var countryCode = '+7';
    $("input[name='phone']").mask(countryCode + ' ' + '(999) 999-99-99');

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

    });

    // var scrollHeight = isMobile() ? 50 : 136;

    // // Menu fixed
    // $(window).scroll(function() {
    //     if ($(this).scrollTop() > scrollHeight) {
    //         nav.addClass('header_fixed')
    //     } else {
    //         nav.removeClass('header_fixed')
    //     }
    // })


    // CALC

    function recount(data) {
        if($('#calculatorResult_graph').find('tr').eq(1).hasClass('controlRow'))
            var payment = $('#calculatorResult_graph').find('td').eq(2).text().split(' ').join('')-1+13001;
        else
            var payment = $('#calculatorResult_graph').find('td').eq(1).text().split(' ').join('')-1+13001;
        $('.additional .monthly').each(function(){
            payment += $(this).val().split(' ').join('')-1+1;
        })
        $('.additional .annual').each(function(){
            payment += Math.ceil($(this).val().split(' ').join('')/12);
        })
        // payment += $('.additional .kids').val().split(' ').join('')*5000;
        // if($('.additional option:selected').val() == 1)
        //     payment += 5000;
        if (data) {
            while(data.replace(/\D/g,'')/payment > 0.6) {
                payment += 1000;
            }
        }
        $('.finish').val(payment.toFixed(0));
    }

    var oCalculator = new calc( '#calculator', '#calculatorResult' );

    $('#button').click(function(){
        $("#lcredit, .finish").attr("disabled", false);
        location.href = '/client/getcalc/'+'?'+$('#calculator').serialize();
    });

    var flag = false;


    $('#vznos-percent').on("keyup", function(){
        var summ = $('#cost_ned').val().split(' ').join('');
        var percentSumm = (summ * this.value / 100).toFixed(0);
        var percent = this.value;
        $('#vznos').val(percentSumm).trigger('keyup',1);
        $("#lcredit").val(summ - percentSumm);
        $("[name=summ]").val(summ - percentSumm);
        oCalculator.chvalue($('#lcredit')[0],$('#lcredit').val())
        oCalculator.recalc();
        this.value = percent;
    });


    $('#vznos').keyup(function(e, params){
        var costNed = parseInt($('#cost_ned').val());
        //var summ = parseInt($('#cost_ned').val().split(' ').join(''));
        oCalculator.chvalue($('#lcredit')[0],$('#cost_ned').val())
        oCalculator.recalc();
        $("#lcredit").val(costNed - parseInt($('#vznos').val().split(' ').join('')));
        if (params != 1) {
            $('#vznos-percent').val(((parseInt(this.value.split(' ').join('')) * 100) / costNed).toFixed(0));
        }
    });

    $('.finish').val($('#calculatorResult_graph').find('td').eq(1).text());

    $('.additional').find('select').change(function(){
        recount();
    });

    $('input[class="radio"]').click(function(){
        if ($(this).attr('id') == 'vznos_type2')
        {
            var value = ($('#vznos').val().replace(/\D/g,'')) * ($('#lcredit').val().replace(/\D/g,'')) / 100;
            $('#calculated_percent').html(value+' руб.').show();
        }
        else
        {
            $('#calculated_percent').hide();
        }
    });
    $('#lcredit,#vznos').on('keyup keydown change',function(){
        if ($('#vznos_type2').prop('checked'))
            $('#vznos_type2')[0].click();
    })

    $('.finish').on("change", function(){
        var payment = this.value;
        $('.additional .monthly').each(function(){
            payment -= $(this).val().split(' ').join('')-1+1;
        })
        $('.additional .annual').each(function(){
            payment -= Math.ceil($(this).val().split(' ').join('')/12);
        })
        payment -= $('.additional .kids').val().split(' ').join('')*5000;
        if($('.additional option:selected').val() == 1)
            payment -= 5000;
        payment -= 13000;
        var vznos = $('#vznos').val();
        var srok = $('#lterm').val().split(' ').join('');
        if ($('#term2').prop('checked'))
            srok *= 12;
        var stavka = $('#lpercent').val().split(' ').join('') / 1200;

        var x = (( 1 - 1 / Math.pow( 1 + stavka, srok ) ) * payment) / ( stavka );
        x += vznos*1;
        $('#lcredit').val(x.toFixed(0));
        $("[name=summ]").val(x.toFixed(0));
        oCalculator.chvalue($('#lcredit')[0],$('#lcredit').val())
        oCalculator.recalc();
    });

    recount();

    $('#get-calc').on("click", function(){
        location.href = '{{ path("get_calc_document") }}'+'?'+$('#calculator').serialize();
    });

    $('#ipoteka').on('ifChecked', function(event){
        $("#lcredit,.finish").attr("disabled", true);
        $(".one_vznos").fadeIn();
        $(".cost_ned").fadeIn();
    });

    $('#ipoteka').on('ifUnchecked', function(event){
        $("#lcredit,.finish").attr("disabled", false);
        $(".one_vznos").fadeOut();
        $(".cost_ned").fadeOut();
    });

    $("#cost_ned").on("change", function(){
        var cost = $(this).val();
        var vznos = $("#vznos").val();
        var credit = cost - vznos;
    })
});


