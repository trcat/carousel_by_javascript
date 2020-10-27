const { src, dest, watch } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

function defaultTask() {
  return src("src/*.js")
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
}

watch("src/*.js", defaultTask);

exports.default = defaultTask;
