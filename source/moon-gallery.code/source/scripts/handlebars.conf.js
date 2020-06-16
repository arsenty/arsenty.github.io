// var currentIndex = nextIndex;
// console.log(currentIndex);

var json = {
    "names": [{
        name: 'Adam Kimmel'
    }, {
        name: 'John Doe'
    }, {
        name: 'Matthias Koenigswieser'
    }, {
        name: 'Alex Lamarque'
    }, {
        name: 'Franz Lustig'
    }, {
        name: 'Laurent Machuel'
    }, ]
};
var json = {
    "names": [{
        name: 'Adam Kimmel'
    }, {
        name: 'John Doe'
    }, {
        name: 'Matthias Koenigswieser'
    }, {
        name: 'Alex Lamarque'
    }, {
        name: 'Franz Lustig'
    }, {
        name: 'Laurent Machuel'
    }, ]
};

Handlebars.registerHelper('addOne', function(value) {
    return value + 1;
});
Handlebars.registerHelper('addTwo', function(value) {
    return value + 2;
});
Handlebars.registerHelper('nospace', function(text) {
    text = Handlebars.Utils.escapeExpression(text);
    text = text.replace(/ /g, '-');
    return new Handlebars.SafeString(text);
});
Handlebars.registerHelper('img', function(src) {
    var s = '<img src="' + src + '">';
    return new Handlebars.SafeString(s);
});
Handlebars.registerHelper('repeat', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

var artists = Handlebars.compile($('#artist-list--template').html());
$('#artists-list').append(artists(json));

var sections = Handlebars.compile($('#artist-page--template').html());
$('#artists--app').append(sections(json));

// var photo = Handlebars.compile($('#artist-photo--template').html());
// $('#artist-photo--container').append(sections(json));