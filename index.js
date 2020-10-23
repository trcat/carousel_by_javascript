const container = document.querySelector(".carousel-container");
const wrap = document.querySelector(".carousel-wrap");
wrap.style.position = "relative";
let distance = 0;
const viewBoxWidth = container.clientWidth;
const wrapWidth = wrap.offsetWidth;
const translateLimit = wrapWidth - viewBoxWidth;

// 设定 timer 并开始轮播
let timer;
function callback() {
  window.clearTimeout(timer);
  if (Math.abs(distance) !== translateLimit) {
    distance -= 1;
    wrap.style.transform = `translateX(${distance}px)`;
    timer = window.setTimeout(callback, 1);
  }
}
timer = window.setTimeout(callback);