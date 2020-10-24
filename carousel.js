class Carousel {
  constructor(options) {
    this.el = options.el;
    this.space = options.space || 20;
    this.direction = options.direction || "left";
    this.duration = options.duration || 10000;
    this.dirBtn = options.dirBtn || {};
    this.container = null;
    this.items = null;
    this.firstCloneItems = null;
    this.wrap = null;
    this.translateLimit = 0;
    this.speed = 0;
    this.realDistance = 0;
    this.timer = null;
    this.init();
  }
  init() {
    this.initContainer();
    this.initItems();
    this.initCloneNode();
    this.initWrap();
    this.initConfig();
    this.initCarousel();
    this.initDirBtn();
  }
  initContainer() {
    const container = document.querySelector(this.el);
    container.style.margin = "0";
    container.style.padding = "0";
    container.style.overflow = "hidden";

    this.container = container;
  }
  initItems() {
    this.items = document.querySelectorAll(`${this.el} .carousel-item`);
    this.items.forEach(
      (i, index) => index > 0 && (i.style.marginLeft = `${this.space}px`)
    );
  }
  initCloneNode() {
    const width = this.container.clientWidth;
    let count = -1;
    let total = count;

    while (total < width) {
      count += 1;
      total += this.items[count].offsetWidth;
    }

    let _count = -1;
    while (_count < count) {
      _count += 1;
      const cloneNode = this.items[_count].cloneNode(true);

      if (_count === 0) {
        cloneNode.style.marginLeft = `${this.space}px`;
        this.firstCloneItems = cloneNode;
      }

      this.container.append(cloneNode);
    }
  }
  initWrap() {
    const result = document.createElement("div");
    result.style.width = `${this.computeWidth(this.container, this.space)}px`;
    result.style.position = "relative";
    result.style.overflow = "auto";
    result.style.margin = "0";
    result.style.padding = "0";

    while (this.container.firstChild) {
      result.append(this.container.firstChild);
    }

    this.container.append(result);

    this.wrap = result;
    this.wrap.onmouseover = () => {
      window.clearInterval(this.timer);
    };
    this.wrap.onmouseleave = () => {
      this.initCarousel();
    };
  }
  initConfig() {
    this.translateLimit = this.firstCloneItems.offsetLeft;
    this.speed = this.translateLimit / this.duration;

    if (this.direction === "left") {
      this.realDistance = 0;
    } else {
      this.realDistance = this.translateLimit * -1;
      this.wrap.style.transform = `translateX(${this.realDistance}px)`;
    }
  }
  initCarousel() {
    if (this.timer) window.clearTimeout(this.timer);
    this.timer = window.setTimeout(this.startCarousel());
  }
  initChangeBtn() {
    document.querySelector(".btn-direction").onclick = () => {
      this.direction = this.direction === "left" ? "right" : "left";
      this.initCarousel();
    };
  }
  startCarousel() {
    this.timer && window.clearTimeout(this.timer);
    if (this.direction === "left") {
      Math.abs(this.realDistance) >= this.translateLimit
        ? (this.realDistance = 0)
        : (this.realDistance -= this.speed);
    } else {
      this.realDistance >= 0
        ? (this.realDistance = this.translateLimit * -1)
        : (this.realDistance += this.speed);
    }
    this.wrap.style.transform = `translateX(${this.realDistance}px)`;
    this.timer = window.setTimeout(() => this.startCarousel(), 1);
  }
  initDirBtn() {
    if (this.dirBtn.left && document.querySelector(this.dirBtn.left)) {
      document.querySelector(this.dirBtn.left).onclick = () => {
        if (this.direction !== "left") {
          this.direction = "left";
          this.initCarousel();
        }
      };
    }
    if (this.dirBtn.right && document.querySelector(this.dirBtn.right)) {
      document.querySelector(this.dirBtn.right).onclick = () => {
        if (this.direction !== "right") {
          this.direction = "right";
          this.initCarousel();
        }
      };
    }
  }
  computeWidth(node, space) {
    let result = 0;
    for (let i = 0; i < node.children.length; i++) {
      result += node.children[i].offsetWidth;
      if (i !== 0) {
        result += space;
      }
    }

    return result;
  }
}

new Carousel({
  el: ".carousel-container", // 必填, 渲染目标
  space: 20, // 选填, 轮播内容间距
  direction: "left", // 选填, 轮播方向
  duration: 10000, // 选填, 单次轮播完成时间
  dirBtn: {
    // 选填, 控制向左或向右轮播按钮
    left: ".left", // 选填, 向左
    right: ".right", // 选填, 向右
  },
});
