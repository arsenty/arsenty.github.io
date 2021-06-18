// v.0.2 / 4/11/15

'use strict';

// Инициализируем плагины
var gulp = require('gulp'),
	changed = require('gulp-changed'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	nib = require('nib'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	cssbeautify = require('gulp-cssbeautify'),
	gutil = require('gulp-util'),
	cache = require('gulp-cache'),
	include = require('gulp-include'),
	rename = require("gulp-rename"),
	uglify = require('gulp-uglify'),
	imageminPngquant = require('imagemin-pngquant'),
	jadeInheritance = require('gulp-jade-inheritance'),
	stylusTypeUtils = require('stylus-type-utils'),
	icons = require("gulp-material-icons"),
	tasks = require("icons.json"),
	// svgSprite = require('gulp-svg-sprite'),
	inline = require('gulp-inline'),
	minifyCss = require('gulp-minify-css'),
	zip = require('gulp-zip'),
	clean = require('gulp-clean'),
	uncss = require('gulp-uncss'),
	concat = require('gulp-concat'),
	filter = require('gulp-filter'),
	html2txt = require('gulp-html2txt'),
	mainBowerFiles = require('main-bower-files');
	// blade = require('gulp-blade');
	// templatizer = require('templatizer');

// Функция обработки ошибок
var handleError = function(err) {
	gutil.log(err);
	gutil.beep();
};

// Пути к файлам
var path = {
	html: {
		source: ['./source/**/*.jade', '!./source/partials/*.jade', '!./source/blocks/**/*.jade'],
		watch: 'source/**/*.jade',
		destination: './public/',
		basedir: './source'
	},
	css: {
		source: ['./source/**/*.styl', '!./source/css/**/*.styl', '!./source/**/_*.styl'],
		watch: 'source/**/*.styl',
		destination: './public/'
	},
	assets: {
		source: './assets/**/*',
		watch: 'assets/**/*',
		destination: './public'
	},
	img: {
		source: ['./source/img/**/*.{jpg,jpeg,png,gif,svg}', '!./source/img/svgs/*'],
		watch: 'source/img/**/*',
		destination: './public/img'
	},
	js: {
		scripts: {
			source: './source/js/*.js',
			watch: './source/js/*',
			destination: './public/js'
		},
		plugins: {
			source: './source/js/plugins/**/*.js',
			watch: './source/js/plugins/**/*',
			destination: './public/js'
		}
	}
};


// Локальный сервер
gulp.task('browser-sync', function () {
	browserSync.init([
		'*.html',
		'css/*.css',
		'**/*.{png,jpg,svg}',
		'js/*.js',
		'fonts/*.{eot,woff,woff2,ttf}'
	], {
		open: false,
		server: { baseDir: './public' }
	});
});



//
gulp.task('icons', function() {
    return icons({tasks: tasks})
        .pipe(gulp.dest('./source/img/'));
});
//
// var config  = {
//     dest: '.'
//   , selector: ''
//   , shape: {
//     id: {
//       separator: ''                  // Separator for directory name traversal
//     }
//   , transform: [
//       // {svgo: svgminConf}
//     ]
//   }
//   , svg: {                             // General options for created SVG files
//     xmlDeclaration: false,                     // Add XML declaration to SVG sprite
//     doctypeDeclaration: false,                     // Add DOCTYPE declaration to SVG sprite
//     namespaceIDs: false,                     // Add namespace token to all IDs in SVG shapes
//     dimensionAttributes: false                      // Width and height attributes on the sprite
//   },
//   	mode: {
//   		css: {
// 	        render: {styl: true},
// 	       	dest: './css/'
//   		},
//   		symbol: {
// 	        dest: './img/'
// 	      , sprite: 'sprite.svg'
// 	      // , prefix: ''
// 	      , dimensions: '.'
// 	      , bust: false
//     }
//   }
// };
//
//
// gulp.src('./source/img/svgs/*.svg')
//     .pipe(svgSprite(config))
//     .pipe(gulp.dest('./source/'));
//
//

// Собираем Stylus
gulp.task('stylus', function() {
	gulp.src(path.css.source)
		.pipe(changed(path.css.destination, {extension: '.css'}))
		.pipe(stylus({use: stylusTypeUtils()}))
		.pipe(stylus({
		    'include css': true,
			'use': nib()
		  }))
		.pipe(autoprefixer({
			browsers: ['last 2 version', '> 5%', 'safari 5', 'ie 8', 'ie 7', 'opera 12.1', 'ios 6', 'android 4'],
			cascade: false
		}))
		.pipe(cssbeautify({
			indent: '	',
			autosemicolon: true
		}))
		.on('error', handleError)
		.pipe(gulp.dest(path.css.destination))
		// .pipe(gulp.dest(function(file) {
		//     return file.base;
		// }))
		.pipe(reload({stream:true}));
});

// Собираем html из Jade ///////////////////////////////////////////////////////

gulp.task('jade', function() {
	var config = require('./source/content/content.json');
	// var config = require('./source/content/macros.json');
	gulp.src(path.html.source)
		// .pipe(changed(path.html.destination))
		.pipe(changed(path.html.destination, {extension: '.html'}))
		.pipe(jadeInheritance({ basedir: path.html.basedir }))
		.pipe(jade({
			pretty: '\t',
			locals: config,
			basedir: path.html.basedir
		}))
		.on('error', handleError)
		.pipe(gulp.dest(path.html.destination))
		.pipe(reload({stream:true}));
});

// Копируем и минимизируем изображения /////////////////////////////////////////

gulp.task('images', function() {
	gulp.src(path.img.source)
		.pipe(cache(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [imageminPngquant()]
		})))
		.on('error', handleError)
		.pipe(gulp.dest(path.img.destination));
});

// Копируем файлы //////////////////////////////////////////////////////////////
gulp.task('copy', function() {
	gulp.src(path.assets.source)
		.on('error', handleError)
		.pipe(gulp.dest(path.assets.destination))
		.pipe(reload({stream:true}));
});

// Собираем JS
gulp.task('plugins', function() {
    gulp.src(mainBowerFiles())
		.pipe(filter('**/*.js'))
		.pipe(concat('plugins.js'))
		.pipe(uglify())
		.on('error', handleError)
		.pipe(gulp.dest('./public/js/'))
		.pipe(reload({stream:true}));
});

// Собираем JS
gulp.task('scripts', function() {
	gulp.src(path.js.scripts.source)
		.pipe(include())
		// .pipe(gulp.dest(path.js.scripts.destination))
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		// .pipe(rename({
		// 	suffix: ".min"
		// }))
		.on('error', handleError)
		.pipe(gulp.dest(path.js.scripts.destination))
		.pipe(reload({stream:true}));
});

// BLADE

// gulp.task('blade', function(){
//   gulp.src('./source/templates/*.blade')
//     .pipe(blade())
//     .pipe(gulp.dest('./source/js/'))
// });

gulp.task('templatizer', function(){
  // gulp.src('./source/templates/*.blade')
	templatizer(
	  __dirname + '/source/templates/*.jade',
	  __dirname + '/public/js/templates.js',
	  // options, // Optional
	  function (err, templates) { console.log(err || 'Success!') }
	);
});



////////////////


gulp.task('inline', function() {
	gulp.src('./public/**/*.html')
	  .pipe(inline({
	    // base: 'public/',
	    // js: uglify(),
	    // css: minifyCss(),
	    disabledTypes: ['svg', 'img'], // Only inline css files
	    // ignore: ['public/index.html']
	  }))
	  .pipe(gulp.dest('public/'));
});


gulp.task('uncss', function () {
    return gulp.src('./public/**/styles.css')
        .pipe(uncss({
            html: ['./public/**/index.html', 'posts/**/*.html', 'http://example.com']
        }))
		  .pipe(minifyCss())
        .pipe(gulp.dest('public/'));
});

gulp.task('clean', function () {
    return gulp.src(['./public/**/*.css', '!./public/css/*.css'])
        .pipe(clean({force: true}))
        .pipe(gulp.dest(''));
});

////////////////

// gulp.task('zip', function () {
//     return gulp.src('./public/**/*')
//         .pipe(zip('index.zip'))
//         .pipe(gulp.dest(''));
// });


////////////////
////////////////

gulp.task('html2txt', function(){
  gulp.src('./public/1/index.html')
	 .pipe(html2txt({wordwrap: 13, ignoreHref: true}))

    .pipe(gulp.dest('./public/1/'));
});


// gulp.task("build", ['stylus', 'jade', 'images', 'plugins', 'copy', 'inline', 'clean']);
// gulp.task("build", ['inline', 'uncss', 'clean']);

gulp.task("default", ["browser-sync"], function(){
	gulp.watch(path.css.watch, ["stylus"]);
	gulp.watch(path.html.watch, ["jade"]);
	// gulp.watch(path.img.watch, ["images"]);
	gulp.watch("node_modules/icons.json", ["icons"]);
	gulp.watch(path.js.plugins.watch, ["plugins"]);
	gulp.watch(path.js.scripts.watch, ["scripts"]);
	// gulp.watch("./source/templates/*", ["templatizer"]);
	// gulp.watch(path.assets.watch, ["copy"]);
});
