const container = document.querySelector(".carousel-container");
const wrap = document.querySelector(".carousel-wrap");
const cloneFirst = document.querySelector(".clone-first");
let distance = 0;
// 第一个克隆元素到 wrap 最左边的距离就是单次轮播的距离
const translateLimit = cloneFirst.offsetLeft;
const speed = translateLimit / 10000;
// 标记当前轮播方向, 默认为 left, 自左向右
let direction = "left";

// 设定 timer 并开始轮播
let timer;
function leftCallback() {
  // 释放上一次的 timeout
  window.clearTimeout(timer);
  Math.abs(distance) >= translateLimit ? (distance = 0) : (distance -= speed);
  wrap.style.transform = `translateX(${distance}px)`;
  timer = window.setTimeout(callback, 1);
}
timer = window.setTimeout(leftCallback);

// wrap 添加 mouseover 和 mouseleave 事件
wrap.onmouseover = () => {
  window.clearInterval(timer);
};
wrap.onmouseleave = () => {
  timer = window.setTimeout(leftCallback);
};
