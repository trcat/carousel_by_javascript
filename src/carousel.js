class Carousel {
  constructor(options = {}) {
    // config from options
    this.el = options.el;
    this.space = options.space || 20;
    this.direction = options.direction || "left";
    this.duration = options.duration || 10000;
    this.dirBtn = options.dirBtn || {};
    // init self config
    this.container = null;
    this.items = null;
    this.wrap = null;
    this.translateLimit = 0;
    this.speed = 0;
    this.realDistance = 0;
    this.timer = null;
    this.shouldCarousel = true;
    // init
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

    if (!container) throw new Error("找不到 container");
    container.style.margin = "0";
    container.style.padding = "0";
    container.style.overflow = "hidden";

    this.container = container;
  }
  initItems() {
    let total = 0;

    this.items = document.querySelectorAll(`${this.el} .carousel-item`);
    this.items.forEach((i, index) => {
      total += this.getElementWidth(i);
      i.style.float = "left";

      if (index > 0) {
        i.style.marginLeft = `${this.space}px`;
        total += this.space;
      }
    });
    
    this.translateLimit = total;
    this.shouldCarousel = total > this.getElementWidth(this.container);
  }
  initCloneNode() {
    if (this.shouldCarousel) {
      const width = this.getElementWidth(this.container);
      let count = -1;
      let total = count;

      while (total < width && count < this.items.length - 1) {
        count += 1;
        total += this.getElementWidth(this.items[count]);
      }

      let _count = -1;
      while (_count < count) {
        _count += 1;
        const cloneNode = this.items[_count].cloneNode(true);

        if (_count === 0) {
          cloneNode.style.marginLeft = `${this.space}px`;
        }

        this.container.append(cloneNode);
      }
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

    if (this.shouldCarousel) {
      this.wrap.onmouseover = () => {
        window.clearInterval(this.timer);
      };
      this.wrap.onmouseleave = () => {
        this.initCarousel();
      };
    }
  }
  initConfig() {
    if (this.shouldCarousel) {
      this.speed = this.translateLimit / this.duration;

      if (this.direction === "left") {
        this.realDistance = 0;
      } else {
        this.realDistance = this.translateLimit * -1;
        this.wrap.style.transform = `translateX(${this.realDistance}px)`;
      }
    }
  }
  initCarousel() {
    if (this.shouldCarousel) {
      if (this.timer) window.clearTimeout(this.timer);
      this.timer = window.setTimeout(this.startCarousel());
    }
  }
  initDirBtn() {
    if (this.shouldCarousel) {
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
  computeWidth(node, space) {
    let result = 0;
    for (let i = 0; i < node.children.length; i++) {
      result += this.getElementWidth(node.children[i]);
      if (i !== 0) {
        result += space;
      }
    }

    return result;
  }
  getElementWidth(element) {
    return Number(window.getComputedStyle(element).width.split('px')[0]);
  }
}
