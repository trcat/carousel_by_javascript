const wrap = document.querySelector(".carousel-wrap");
wrap.style.position = "relative";
let distance = 0;

const timer = window.setInterval(() => {
  distance -= 1;
  wrap.style.transform = `translateX(${distance}px)`;
}, 1);
