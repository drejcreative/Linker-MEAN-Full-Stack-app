const gulp = require('gulp'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync'),
      useref = require('gulp-useref'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      gulpIf = require('gulp-if'),
      cssnano = require('gulp-cssnano'),
      imagemin = require('gulp-imagemin'),
      cache = require('gulp-cache'),
      del = require('del'),
      svgSprite = require('gulp-svg-sprites'),
      filter    = require('gulp-filter'),
      svg2png   = require('gulp-svg2png'),
      spritesmith = require('gulp.spritesmith'),
      runSequence = require('run-sequence'),
      imgRetina = require('gulp-img-retina'),
      pxtorem = require('gulp-pxtorem'),

      notify        = require('gulp-notify'),
      source        = require('vinyl-source-stream'),
      browserify    = require('browserify'),
      babelify      = require('babelify'),
      ngAnnotate    = require('browserify-ngannotate'),
      rename        = require('gulp-rename'),
      templateCache = require('gulp-angular-templatecache'),
      merge         = require('merge-stream');

      $ = require('gulp-load-plugins')({lazy: true});

// #Autiprefixer options
const autoprefixerOptions = {
  browsers: ['last 20 versions', '> 5%', 'Firefox ESR']
};

const pxtoremOptions = {
    replace: false
};

// Push Errors
const interceptErrors = function(error) {
  const args = Array.prototype.slice.call(arguments);
  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  // Keep gulp from hanging on this task
  this.emit('end');
};

// Where our Angular files are located
var jsFiles   = 'app/js/**/*.js';
var viewFiles = 'app/js/**/*.html';

gulp.task('browserify', ['views'], function() {
  return browserify('./app/js/app.js')
      .transform(babelify, {presets: ['es2015']})
      .transform(ngAnnotate)
      .bundle()
      .on('error', interceptErrors)
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('main.js'))
      // Start piping stream to tasks!
      .pipe(gulp.dest('./build/js/'));
});

//ANgular templates
gulp.task('views', function() {
  return gulp.src(viewFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename('app.templates.js'))
      .pipe(gulp.dest('app/js/config/'));
});

// Optimizing HTML
gulp.task('html', function() {
  return gulp.src('app/index.html')
    .on('error', interceptErrors)
    .pipe(gulp.dest('./build/'));
});

// #Scss with Autoprefixer - Adding all cross browser prefixes
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')       // # Gets all files ending with .scss in app/scss and children dirs
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))  // # Passes it through a gulp-sass
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))  // # Adding cross browser prefixes
    //.pipe(pxtorem(pxtoremOptions))            // # Converting PX to Rem with px fallback for older browsers
    .pipe(gulp.dest('./build/css/'))               // # Outputs it in the css folder
    .pipe(browserSync.reload({
      stream: true
    }));
});


//Creating sprites from svg vector images
gulp.task('spriteSvg', function () {
  return gulp.src('app/images/svg/**/*.svg')
        .pipe(svgSprite({
          // mode: "symbols",
          // svgId: "svg-%f"
        }))
        .pipe(gulp.dest('build/images/icons'))    // # Write the sprite-sheet + CSS + Preview
        // .pipe(filter('build/images/**/*.svg'))    // # Filter out everything except the SVG file
        // .pipe(svg2png())                        // # Create a PNG
        .pipe(gulp.dest('build/images/icons'));
});


// Optimization Tasks
// ------------------

//Optimizing HTML files
gulp.task('html-opt', ['sass'], function() {
  return gulp.src('build/index.html')
    .pipe(imgRetina()) // Adding retina display version images Example: <img src='images/default/example.jpg' alt='example image' srcset='images/default/example.jpg 1x, images/default/example@2x.jpg 2x, images/default/example@3x.jpg 3x' />
    .pipe(useref())
    .pipe(gulpIf('css/main.min.css', cssnano()))
    .pipe(gulpIf('js/main.min.js', uglify()))
    .pipe(gulp.dest('dist'));
});

// Optimizing Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'));
});

// Copying fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('build/fonts'));
});

// Cleaning
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
});

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

//Copy images for build
gulp.task('copyImages', function () {
    return gulp.src('app/images/**/*')
        .pipe(gulp.dest('./build/images'));
});

// Build Sequences
// ---------------
gulp.task('default', ['sass',  'html', 'browserify', 'copyImages', 'fonts'], function(callback) {
  browserSync.init(['./build/**/**.**'], {
    server: {
      baseDir: './build',
      routes: {
          '/bower_components': 'bower_components'
      }
    },
    port: 4000,
    notify: false,
    ui: {
      port: 4001
    }
  });

  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/index.html', ['html']);
  gulp.watch(viewFiles, ['views']);
  gulp.watch(jsFiles, ['browserify']);
  gulp.watch('app/images/**/*.+(png|jpg|jpeg|gif|svg)', ['copyImages']);
  gulp.watch('app/fonts/**/*', ['fonts']);
});

gulp.task('build', ['html', 'browserify', 'clean:dist', 'images', 'fonts', 'html-opt'], function(callback) {
  const font = gulp.src('app/fonts/**/*')
                .pipe(gulp.dest('./dist/fonts'));

  return merge(font);
});
