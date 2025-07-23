import fixPath from "./fix-path.js";
import gulp from 'gulp';
import path from 'path';
import { fileURLToPath } from 'url';

import fileinclude from 'gulp-file-include';
import cssbeautify from 'gulp-cssbeautify';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import zip from 'gulp-zip';
import { deleteAsync } from 'del';
import concat from 'gulp-concat';

import sassCompiler from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(sassCompiler);

import browserSyncLib from 'browser-sync';
const browserSync = browserSyncLib.create();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import addFile task if needed
const addFile = await import('./add-file.js');
addFile.default(gulp);

function style() {
    return gulp
        .src('./src/assets/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(sourcemaps.write('.'))
        .pipe(cssbeautify())
        .pipe(gulp.dest('./src/assets/css'))
        // Inject CSS without full reload
        .pipe(browserSync.stream());
}

function htmlfileinclude() {
    return gulp
        .src('./src/html/pages/*.html')
        .pipe(fileinclude({ prefix: '@@', basepath: '@file' }))
        .pipe(fixPath())
        .pipe(gulp.dest('./src/'));
}

function scripts() {
    return gulp
        .src('./src/assets/js/custom-lib/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./src/assets/js/'));
}

// Clean generated HTML files
async function clean() {
    await deleteAsync(['src/*.html']);
}

// Zip task for distribution
async function makeZip() {
    const currentDir = path.basename(__dirname);
    return gulp
        .src([
            'src/**',
            '!src/html/**',
            '!src/assets/sass/**',
            '!src/test.html',
            '!src/assets/css/main.css.map',
        ])
        .pipe(zip(`${currentDir}.zip`))
        .pipe(gulp.dest('./'));
}

function watch() {
    browserSync.init({
        server: { baseDir: './src/' },
    });

    gulp.watch('./src/assets/sass/**/*.scss', style);
    gulp.watch('./src/html/**/*.html', gulp.series(htmlfileinclude, (done) => {
        browserSync.reload();
        done();
    }));
    gulp.watch('./src/assets/js/custom-lib/*.js', gulp.series(scripts, (done) => {
        browserSync.reload();
        done();
    }));
}

gulp.task('clean', clean);
gulp.task('htmlInclude', htmlfileinclude);
gulp.task('cssInclude', style);
gulp.task('scripts', scripts);
gulp.task('makeZip', makeZip);
gulp.task('watch', watch);

gulp.task('zip', gulp.series('clean', 'htmlInclude', 'cssInclude', 'makeZip'));
gulp.task('default', gulp.series('clean', 'htmlInclude', 'cssInclude', 'watch'));
