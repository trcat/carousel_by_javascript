const container = document.querySelector(".carousel-container");
const wrap = document.querySelector(".carousel-wrap");
wrap.style.position = "relative";
let distance = 0;
const viewBoxWidth = container.clientWidth;
const wrapWidth = wrap.offsetWidth;
const translateLimit = wrapWidth - viewBoxWidth;
console.log(translateLimit);

// 设定 timer 并开始轮播
const timer = window.setInterval(() => {
  if (Math.abs(distance) === translateLimit) {
    window.clearInterval(timer);
  } else {
    distance -= 1;
    wrap.style.transform = `translateX(${distance}px)`;
  }
}, 1);
