const { src, dest } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

exports.default = function () {
  return src("carousel.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(dest("dist"));
};
