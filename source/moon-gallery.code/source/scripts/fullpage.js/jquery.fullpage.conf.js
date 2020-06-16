var slideTimeout;
var slideIndex2 = 1,
    sliding = false,
    hover = false;

$(document).ready(function() {
    $('#artists--app').fullpage({
        //Navigation
        menu: '#nav',
        // anchors: ['slide1', 'slide2'],
        lockAnchors: false,
        navigation: false,
        navigationPosition: 'right',
        //navigationTooltips:['firstSlide','secondSlide'],
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: 'bottom',
        //Scrolling
        css3: true,
        // scrollingSpeed: 250,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: false,
        continuousVertical: false,
        continuousHorizontal: false,
        scrollHorizontally: false,
        interlockedSlides: false,
        resetSliders: false,
        // normalScrollElements: '#element1,.element2',
        scrollOverflow: true,
        scrollOverflowOptions: null,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,
        bigSectionsDestination: null,
        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,
        //Design
        controlArrows: false,
        verticalCentered: true,
        // sectionsColor: ['#111', '#222', '#333', '#444', '#555', '#666', '#777', '#888', '#999', '#888', '#777'],
        paddingTop: '0px',
        paddingBottom: '0px',
        // fixedElements: 'header, footer',
        // responsiveWidth: 800,
        // responsiveHeight: 668,
        //Customselectors
        sectionSelector: 'section',
        slideSelector: '.slide',
        lazyLoading: false,
        //events
        afterRender: function(index) {
            console.log('afterRender')

            // Go Home
            $('.logotype').click(function() {
                open = false;
                hideArtist();
                var index = $('section').filter('.active').index() + 1;
                $.fn.fullpage.moveTo(index, 0);
                $.fn.fullpage.moveTo(1, 0);
            });

            $('.artists-list').find('.artist-list--i').click(function() {
                showArtist();
            });

            var i = 0;
            $('section').each(function(el) {
                $('#artist-list--' + el).hover(function() {
                    hover = true;
                    $.fn.fullpage.moveTo(el);
                });
                i++;
            });

            $(function() {
                $(".lazy").lazyload({
                    threshold: 200,
                    effect: "fadeIn",
                    event: "sporty"
                });
            });
        },

        afterLoad: function(anchorLink, index) {
            console.log('afterLoad')
            slideTotal = $(this).find('.slide').length;
            hideArrowsOnTheEnd(index);
            initSlide(index);

            $("#photo-next").unbind().click(function() {
                $.fn.fullpage.moveSlideRight();
            });
            $("#photo-prev").unbind().click(function() {
                console.log('prev')
                $.fn.fullpage.moveSlideLeft();
            });

            // LazyLoad
			$('img.lazy').load(function() {
				var img = $(this).parents('section').find('.slide.active').find('img')[0];
				coverImage(img);
			});
        },

        onLeave: function(index, nextIndex, direction) {
            console.log('onLeave')

            sectionTotal = $(this).find('.slide').length;

            // Scroll Menu
            var heightUser = 68;
            if (direction == 'up' && nextIndex == 1 && hover != true) {
            	$('.welcome').animate({ opacity: "1" }, 250);
                $(".artists-list").find("ul").animate({
                    top: 0,
                }, 250);
            } else if (hover != true) {
            	$('.welcome').animate({ opacity: "0" }, 250);
                $(".artists-list").find("ul").animate({
                    top: -heightUser * nextIndex + 'px',
                }, 250);
            }
            hover = false;

            // Scrolling Photos
            if (open == true && !sliding) {
                if (direction == 'down') {
                    sliding = true;
                    $.fn.fullpage.moveSlideRight();
                    return false;
                } else if (direction == 'up') {
                    sliding = true;
                    $.fn.fullpage.moveSlideLeft();
                    return false;
                }
            } else if (sliding) {
                return false;
            }
        },

        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
            console.log('afterSlideLoad')
            sliding = false;
            if (slideIndex < 2) {
                sliding = false;
                return false;
            }
        },

        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {
            console.log('onSlideLeave')
        },
    });


    $('#news--app').fullpage({
        //Navigation
        menu: '#nav',
        //Scrolling
        css3: true,
        // scrollingSpeed: 250,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        continuousHorizontal: false,
        scrollHorizontally: false,
        interlockedSlides: false,
        resetSliders: false,
        // normalScrollElements: '#element1,.element2',
        scrollOverflow: true,
        scrollOverflowOptions: null,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,
        bigSectionsDestination: null,
        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,
        //Design
        controlArrows: false,
        verticalCentered: true,
        paddingTop: '0px',
        paddingBottom: '0px',
        //Customselectors
        sectionSelector: 'section',
        slideSelector: '.slide',

        afterLoad: function(anchorLink, index) {
            hideArrowsOnTheEnd(index);
        }
    });

    $('#contact--app').fullpage({
        verticalCentered: true,
        sectionSelector: 'section'
    });
});