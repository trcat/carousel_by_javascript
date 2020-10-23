const container = document.querySelector(".carousel-container");
const wrap = document.querySelector(".carousel-wrap");
const cloneFirst = document.querySelector('.clone-first');
wrap.style.position = "relative";
let distance = 0;
// 第一个克隆元素到 wrap 最左边的距离就是单次轮播的距离
const translateLimit = cloneFirst.offsetLeft;
const speed = translateLimit / 10000;

// 设定 timer 并开始轮播
let timer;
function callback() {
  window.clearTimeout(timer);
  Math.abs(distance) >= translateLimit ? (distance = 0) : (distance -= speed);
  wrap.style.transform = `translateX(${distance}px)`;
  window.setTimeout(callback, 1);
}
timer = window.setTimeout(callback);
