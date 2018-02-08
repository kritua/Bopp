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

    var labels = ['days', 'hours', 'minutes'],
        nextYear = moment.tz('2018-02-10 00:00', 'Europe/Moscow').format('YYYY-MM-DD HH:MM'),
        currDate = moment().tz('Europe/Moscow').format('YYYY-MM-DD HH:MM'),
        nextDate = '00:00:00',
        parser = /([0-9]{2})/gi,
        $example = $('#main-example');
    function strfobj(str) {
        var parsed = str.match(parser),
            obj = {};
        labels.forEach(function(label, i) {
            obj[label] = parsed[i]
        });
        return obj;
    }
    // Return the time components that diffs
    function diff(obj1, obj2) {
        var diff = [];
        labels.forEach(function(key) {
            if (obj1[key] !== obj2[key]) {
                diff.push(key);
            }
        });
        return diff;
    }
    // Starts the countdown
    $example.countdown(nextYear, function(event) {
        var newDate = event.strftime('%D:%H:%M'),
            data;
        if (newDate !== nextDate) {
            currDate = nextDate;
            nextDate = newDate;
            // Setup the data
            data = {
                'curr': strfobj(currDate),
                'next': strfobj(nextDate)
            };
            // Apply the new values to each node that changed
            diff(data.curr, data.next).forEach(function(label) {
                var selector = '.%s'.replace(/%s/, label),
                    $node = $example.find(selector);
                // Update the node
                $node.removeClass('flip');
                $node.find('.curr').text(data.curr[label]);
                $node.find('.next').text(data.next[label]);
                // Wait for a repaint to then flip
                setTimeout(function($node) {
                    $node.addClass('flip');
                }, 50, $node);
            });
        }
    });
});


