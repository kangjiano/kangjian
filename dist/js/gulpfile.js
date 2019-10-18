"use strict";var gulp=require("gulp"),html=require("gulp-minify-html"),css=require("gulp-minify-css"),sass=require("gulp-sass"),uglifyjs=require("gulp-uglify"),watch=require("gulp-watch"),babel=require("gulp-babel"),bablecore=require("babel-core"),es2015=require("babel-preset-es2015"),imagemin=require("gulp-imagemin"),sourcemaps=require("gulp-sourcemaps"),plugins=require("gulp-load-plugins")();gulp.task("copyfile",function(){return gulp.src("src/font/*").pipe(gulp.dest("dist/font/"))}),gulp.task("uglifyhtml",function(){return gulp.src("src/*.html").pipe(html()).pipe(gulp.dest("dist/"))}),gulp.task("compilesass",function(){return gulp.src("src/sass/*.scss").pipe(plugins.sourcemaps.init()).pipe(plugins.sass({outputStyle:"compressed"})).pipe(plugins.sourcemaps.write(".")).pipe(gulp.dest("dist/css/"))}),gulp.task("babel",function(){return gulp.src("src/script/*.js").pipe(babel({presets:["es2015"]})).pipe(uglifyjs()).pipe(gulp.dest("dist/js/"))}),gulp.task("runimg",function(){return gulp.src("src/img/*.{png,gif,jpg,ico}").pipe(imagemin()).pipe(gulp.dest("dist/img/"))}),gulp.task("default",function(){watch(["src/font/*","src/*.html","src/sass/*.scss","src/script/*.js","src/img/*.{png,jpg,gif,ico}"],gulp.parallel("copyfile","uglifyhtml","compilesass","babel","runimg"))});