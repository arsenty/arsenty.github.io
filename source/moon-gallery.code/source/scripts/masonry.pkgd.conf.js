   // external js: masonry.pkgd.js, imagesloaded.pkgd.js

$(document).ready(function() {

    // init Masonry
    var $grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        columnWidth: '.grid-sizer'
    });

    // layout Isotope after each image loads
    $grid.imagesLoaded().progress(function() {
        $grid.masonry();
    });

    var i = 0;
    $('section').each(function(el) {
        var el = el - 1;
        $('#grid-item-' + el).click(function() {
            $.fn.fullpage.moveTo(1, 0);
        });
        i++;
    });

});