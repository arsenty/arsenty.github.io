$(".gallery").colorbox({
    rel: "gallery",
    transition: "none",
    maxWidth: "90%",
    //maxHeight: "90%",
    //fixed: true,
    scrolling: false,
    scalePhotos: true,
    current: "{current} / {total}",
    title: function() {
        title = this.title;
        if (this.hasAttribute("data-big")) {
            title += " (full size)".link(this.getAttribute("data-big"));
        }
        if (this.hasAttribute("data-date")) {
            title += this.getAttribute("data-date");
        }
        return title;
    },
    inline: function() {
        return this.hasAttribute("inline");
    }
});

$(document).bind('cbox_open', function() {
    $("#cboxOverlay, #colorbox").swipe({
        swipeLeft: function(event, direction, distance, duration, fingerCount) {
            $.colorbox.next();
        },
        swipeRight: function(event, direction, distance, duration, fingerCount) {
            $.colorbox.prev();
        },
        tap: function(event, target) {
            $.colorbox.close()
        },
        excludedElements: $.fn.swipe.defaults.excludedElements + ", #colorbox"
    }).unbind("click");
});

(function() {
    echo.init({
        offset: 100,
        throttle: 250,
        unload: false,
        callback: function(element, op) {
            //console.log(element, 'has been', op + 'ed')
        }
    });
}());


// Elements
var tags = document.querySelectorAll('[name="tag"]');
var list = document.querySelector('#main');
var apps = document.querySelectorAll('figure');

function filter(hash) {
    var figure = document.querySelectorAll("[data-tags]");
    figure.forEach(function(e) {
        if (e instanceof Element) {
            var string = e.getAttribute('data-tags');
            var regex = RegExp(hash);
            if (regex.test(string)) {
                e.setAttribute('style', 'display: grid !important;');
                echo.render();
            } else {
                e.setAttribute('style', 'display: none !important;');
            }
        }
    });
    var cv = document.querySelectorAll('section');
    cv.forEach(function(e) {
        e.setAttribute('style', 'display: none;');
    });
}

function updateMenu(hash) {
    var links = document.getElementById("skills").querySelectorAll('a');
    links.forEach(function(e) {
        if (e instanceof Element) {
            if (e.getAttribute('href') == location.hash) {
                e.setAttribute('class', 'active');
            } else {
                e.removeAttribute('class');
            }
        }
    });
}

var hash = location.hash.replace('#', '');
if (hash) {
    document.getElementById("main").setAttribute('data-filter', hash);
    document.getElementById("skills").setAttribute('data-filter', hash);
    filter(hash);
    updateMenu(hash);
}
$(window).on('hashchange', function() {
    var hash = location.hash.replace('#', '');
    filter(hash);
    updateMenu(hash);
    window.scrollTo(0, 0);
    //window.scrollTo(0, document.getElementsByTagName('header')[0].clientHeight + 30);
    echo.render();
});

var links = document.links;
for (var i = 0, linksLength = links.length; i < linksLength; i++) {
       if (links[i].hostname != window.location.hostname) {
                  links[i].target = '_blank';
              }
}
