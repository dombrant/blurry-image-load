const gulp = require("gulp");
const chalk = require("chalk");
const del = require("del");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
// const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const stripDebug = require("gulp-strip-debug");
const terser = require("gulp-terser");
const fs = require("fs");
const prettyBytes = require("pretty-bytes");

const plumberErrorHandler = error =>
    console.log(`${chalk.red("Error:")} ${error}`);
// Create a function for handling errors caught by the plumber plugin

const css = async () => {
    const plugins = [autoprefixer(), cssnano()];

    try {
        await del("dist/*.css");
    } catch (error) {
        console.log(
            `${chalk.red("Error deleting CSS files in dist folder")}: ${error}`
        );
    }
    // Delete any css files in the dist before creating a new one below

    return new Promise((resolve, reject) => {
        gulp.src("src/blurry-load.css")
            .pipe(
                plumber({
                    errorHandler: plumberErrorHandler
                })
            )
            // .pipe(sourcemaps.init())
            .pipe(rename("blurry-load.min.css"))
            .pipe(postcss(plugins))
            // .pipe(sourcemaps.write())
            .pipe(gulp.dest("dist"))
            .on("error", reject)
            .on("end", resolve);
    });
};

const js = async () => {
    try {
        await del("dist/*.js");
    } catch (error) {
        console.log(
            `${chalk.red(
                "Error deleting JavaScript files in dist folder"
            )}: ${error}`
        );
    }
    // Delete any JS files in the dist folder before creating a new one below

    return new Promise((resolve, reject) => {
        gulp.src("src/blurry-load.js")
            .pipe(
                plumber({
                    errorHandler: plumberErrorHandler
                })
            )
            .pipe(stripDebug())
            // .pipe(sourcemaps.init())
            .pipe(terser())
            // .pipe(sourcemaps.write())
            .pipe(rename("blurry-load.min.js"))
            .pipe(gulp.dest("dist"))
            .on("error", reject)
            .on("end", resolve);
    });
};

const logSize = () => {
    return new Promise((resolve, reject) => {
        let cssSize = 0;
        let jsSize = 0;

        try {
            let file = fs.statSync("dist/blurry-load.min.css");
            cssSize = file.size;

            file = fs.statSync("dist/blurry-load.min.js");
            jsSize = file.size;

            resolve(
                console.log(
                    `Project Size: \n CSS: ${prettyBytes(
                        cssSize
                    )} \n JS: ${prettyBytes(jsSize)}`
                )
            );
            // Use the prettyBytes module to display the number of bytes (in Kb or Mb) in the CSS and JS files after the build is complete
        } catch (error) {
            reject(error);
        }
    });
};

const watch = () => {
    gulp.watch("src/blurry-load.css", gulp.series(css, logSize));
    gulp.watch("src/*.js", gulp.series(js, logSize));
};

gulp.task("default", gulp.series(css, js, logSize));
gulp.task("watch", gulp.series(css, js, logSize, watch));
