"use strict";

var gulp            =   require('gulp'),
    es              =   require('event-stream'),
    notify          =   require("gulp-notify"),
    newer           =   require('gulp-newer'),
    sass            =   require('gulp-sass'),
    cleanCss        =   require('gulp-clean-css'),
    sourcemaps      =   require('gulp-sourcemaps'),
    imagemin        =   require('gulp-imagemin'),
    prettify        =   require('gulp-html-prettify'),
    postcss         =   require('gulp-postcss'),
    uglify          =   require('gulp-uglify'),
    concat          =   require('gulp-concat'),
    rigger          =   require('gulp-rigger'),
    groupM          =   require('css-mqpacker'),
    browserSync     =   require("browser-sync").create(),
    babel           =   require("gulp-babel"),
    clipPath        =   require("postcss-clip-path-polyfill"),
    flexBugs        =   require("postcss-flexbugs-fixes"),
    fontMagician    =   require("postcss-font-magician"),
    autoprefixer    =   require("autoprefixer");

var paths = {
    fonts:   'src/scss/fonts/**/*',
    scripts: 'src/js/**/*.js',
    images:  'src/images/*',
    sass:    'src/scss/**/*.+(sass|scss)',
    html:    'src/*.html'
};

var config = {
    server: {
        baseDir: './build'
    },
    host: 'localhost',
    port: 8080,
    logPrefix: 'FrontEnd'
};

// Start browserSync server
gulp.task('webserver', ['styles'], function () {
    browserSync.init(config);

    gulp.watch(paths.sass, ['styles']);
    gulp.watch('build/*.html', browserSync.reload);
    gulp.watch('build/js/*.js', browserSync.reload);
});

// Compile and Prettify HTML
gulp.task('html', function () {
    return gulp.src(paths.html)
        .pipe(rigger())
        .pipe(prettify({
            indent_char: ' ',
            indent_size: 4
        }))
        .pipe(gulp.dest('build'));
});

// Compile, Minify and Autoprefix Sass
gulp.task('styles', function () {
    var plugins = [
        clipPath(),
        flexBugs(),
        fontMagician({
            // hosted: [paths.fonts, [/custom/path / to / fonts / on / site]]
        }),
        autoprefixer({
            browsers: ['last 5 versions', 'iOS 7']
        }),
        groupM({ sort: true })
    ];
    return gulp.src(paths.sass)
        .pipe(sourcemaps.init({largeFile: true}))
        .pipe(sass({
            style: 'expand'
        })).on('error', notify.onError(function (err) {
            return {
                title: "Error in styles!",
                message: err.message
            };
        }))
        .pipe(postcss(plugins))
        .pipe(cleanCss())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream({
            match: "**/*.css"
        }));
});

// Compile Scripts
gulp.task('scripts', function () {
    return es.concat(
        gulp.src([paths.scripts, '!src/js/common.js'], {
            dots: true
        })
        .pipe(concat('libs.js'))
        .pipe(uglify()).on('error', notify.onError(function (err) {
            return {
                title: "Error in scripts!",
                message: err.message
            };
        }))
        .pipe(gulp.dest('build/js')),

        gulp.src('src/js/common.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('build/js'))
    );
});

//Optimize Images
gulp.task('imagemin', () => {
    return gulp.src([paths.images])
        .pipe(newer('build/images/'))
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 4}),
            imagemin.svgo({plugins: [{removeViewBox: false}]})
        ], { verbose: true }))
        .pipe(gulp.dest('build/images/'));
});

// Copying fonts
gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('build/css/fonts'));
});

// Watchers
gulp.task('watch', function () {
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['imagemin']);
});

gulp.task('build', ['html', 'scripts', 'imagemin', 'fonts']);

gulp.task('default', ['build', 'webserver', 'watch']);
