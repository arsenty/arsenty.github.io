sectionTotal = $('section').length;

// Navigation Arrows
$("#artist-next").click(function() {
    hover = false;
    $.fn.fullpage.moveSectionDown();
});
$("#artist-prev").click(function() {
    hover = false;
    $.fn.fullpage.moveSectionUp();
});
$("#news-next").click(function() {
    $.fn.fullpage.moveSectionDown();
});
$("#news-prev").click(function() {
    $.fn.fullpage.moveSectionUp();
});

function showArtist() {
    open = true;
    $('.artists').addClass("hidden");
    // $('.photo--controls').removeClass('hidden');
    $('.artist--details').removeClass('hidden');
    $('.artist--nav').removeClass('hidden');
    $('.photo--container').css('opacity', '1');
    $('.photo--container').addClass('fit');
}

function hideArtist(index, scale) {
    $.fn.fullpage.moveTo(index, 0)
    $('.artists').removeClass("hidden");
    $('.artist--details').addClass('hidden');
    // $('.photo--controls').addClass('hidden');
    $('.photo--source').removeClass('photo-details--open');

    $('.photo--container').css('opacity', '0.5');
    $('.photo--container').removeClass('fit');
    $('.photo--container').css({
        'transform': 'scale(' + scale + ')'
    });
}

function hideArrowsOnTheEnd(index) {
    if (index == 1) {
        $('.nav-up').addClass('hidden');
    } else {
        $('.nav-up').removeClass('hidden');
    }
    if (index === $('section').length) {
        $('.nav-down').addClass('hidden')
    } else {
        $('.nav-down').removeClass('hidden');
    }
}

function initSlide(index) {

    // Closing Artist Slider
    $('.ico-close').click(function() {
        open = false;
        var index = $('section').filter('.active').index() + 1;
        $.fn.fullpage.moveTo(index, 0);
        setTimeout(function() {
            hideArtist(index);
        }, 150)
    });

    // Toggle "ORDER THIS PRINT"
    $('.btn-order').unbind().click(function() {
        $('.photo-source--img').toggleClass('photo-details--open');
    });

    // Show All Photos
    $('.ico-grid').unbind().click(function() {
        $('.artist--desc').hide();
        $.fn.fullpage.moveTo(index, slideTotal - 1);
    });

    // FullScreen
    $('.ico-fullscreen, .photo-source--img').unbind().click(function() {
        var curr = $(this).parents('.photo--container');
        console.log(curr)
        if ($(curr).hasClass('max')) {
            $(curr).removeClass("max");
            $('.artist--details').removeClass('hidden');
            $('.logotype').removeClass('hidden');
            $('.photo--controls').removeClass('hidden');
            $('.artist--nav').removeClass('hidden');
            $('.menu').removeClass('hidden');
        } else {
            $(curr).addClass("max");
            $('.artist--details').addClass('hidden');
            $('.logotype').addClass('hidden');
            $('.photo--controls').addClass('hidden');
            $('.artist--nav').addClass('hidden');
            $('.menu').addClass('hidden');
            $(curr).find('.photo--source').removeClass('photo-details--open');
        }
    });
}

function coverImage(img) {

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var constImage = img.naturalWidth / img.naturalHeight;
    var constScreen = windowWidth / windowHeight;

    if (constImage > constScreen) {

        var scale = windowHeight / img.height
        if (img.width < windowWidth) {
            var scale = ((windowWidth / img.width) - 1) + scale;
            $(img).parents('.photo--container').css({
                'transform': 'scale(' + scale + ')'
            });
        } else {
            $(img).parents('.photo--container').css({
                'transform': 'scale(' + scale + ')'
            });
        };

    } else if (constImage < constScreen) {
        var scale = windowWidth / img.width
        $(img).parents('.photo--container').css({
            'transform': 'scale(' + scale + ')'
        });
    };
};