// 子组件之间的间距
const space = 20;
const container = document.querySelector(".carousel-container");
container.style.margin = "0";
container.style.padding = "0";
const items = document.querySelectorAll(".carousel-item");
const wrap = generateWrap(container);
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
  timer = window.setTimeout(
    direction === "left" ? leftCallback : rightCallback
  );
};

// 生成 wrap 并将其渲染到 container 中, container 的所有子节点也都移入 wrap 中
function generateWrap(parent) {
  const result = document.createElement("div");

  generateCloneNode(items, parent);

  result.style.width = `${computeWidth(parent)}px`;
  result.style.position = "relative";
  result.style.overflow = "auto";
  result.style.margin = "0";
  result.style.padding = "0";

  while (parent.firstChild) {
    result.append(parent.firstChild);
  }

  parent.append(result);

  return result;
}

// 根据 container 的宽度, 从头依次复制若干个子节点
function generateCloneNode(items, viewBox) {
  const width = viewBox.clientWidth;
  let count = -1;
  let total = count;
  while (total < width) {
    count += 1;
    total += items[count].offsetWidth;
  }

  let _count = -1;
  while (_count < count) {
    _count += 1;
    const cloneNode = items[_count].cloneNode(true);
    _count === 0 && (cloneNode.classList.add('clone-first'));
    viewBox.append(cloneNode);
  }
}

// 计算 wrap 的宽度
function computeWidth(target) {
  let result = 0;
  for (let i = 0; i < target.children.length; i++) {
    result += target.children[i].offsetWidth;
    console.log(target.children[i].offsetWidth)
    if (i !== 0 ) {
      result += space;
    }
  }

  return result;
}
