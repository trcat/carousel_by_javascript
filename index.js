const container = document.querySelector(".carousel-container");
const wrap = document.querySelector(".carousel-wrap");
const cloneFirst = document.querySelector(".clone-first");
// 第一个克隆元素到 wrap 最左边的距离就是单次轮播的距离
const translateLimit = cloneFirst.offsetLeft;
const speed = translateLimit / 10000;
// 标记当前轮播方向, 默认为 left, 自左向右
let direction = "left";
let distance;
if (direction === "left") {
  distance = 0;
} else {
  distance = translateLimit * -1;
  wrap.style.transform = `translateX(${distance}px)`;
}

// 设定 timer 并开始轮播
let timer;
function leftCallback() {
  // 释放上一次的 timeout
  window.clearTimeout(timer);
  Math.abs(distance) >= translateLimit ? (distance = 0) : (distance -= speed);
  wrap.style.transform = `translateX(${distance}px)`;
  timer = window.setTimeout(leftCallback, 1);
}
function rightCallback() {
  // 释放上一次 timeout
  window.clearTimeout(timer);
  distance >= 0 ? (distance = translateLimit * -1) : (distance += speed);
  wrap.style.transform = `translateX(${distance}px)`;
  timer = window.setTimeout(rightCallback, 1);
}
timer = window.setTimeout(direction === "left" ? leftCallback : rightCallback);

// wrap 添加 mouseover 和 mouseleave 事件
wrap.onmouseover = () => {
  window.clearInterval(timer);
};
wrap.onmouseleave = () => {
  timer = window.setTimeout(
    direction === "left" ? leftCallback : rightCallback
  );
};

// 为轮播方向切换按钮添加点击事件, 修改 direction 的值
document.querySelector(".btn-direction").onclick = () => {
  direction = direction === "left" ? "right" : "left";
  window.clearTimeout(timer);
  timer = window.setTimeout(direction === "left" ? leftCallback : rightCallback);
};
