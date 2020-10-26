class Carousel {
  constructor(options = {}) {
    // config from options
    this.el = options.el;
    this.space = options.space || 20;
    this.direction = options.direction || "left";
    this.duration = options.duration || 10000;
    this.dirBtn = options.dirBtn || {};
    // init self config
    // container element
    this.container = null;
    // item elements 所有轮播内容
    this.items = null;
    // wrap element
    this.wrap = null;
    // 单词轮播需要移动的总距离
    this.translateLimit = 0;
    // 移动速度
    this.speed = 0;
    // 当前移动距离
    this.realDistance = 0;
    // 计时器
    this.timer = null;
    // 是否轮播
    this.shouldCarousel = true;
    // 克隆元素宽度（不包含首个的间隔距离）
    this.cloneWidth = 0;
    // init
    this.init();
  }
  /**
   * 初始化组件
   */
  init() {
    this.initContainer();
    this.initItems();
    this.initCloneNode();
    this.initWrap();
    this.initConfig();
    this.initCarousel();
    this.initDirBtn();
  }
  /**
   * 初始化 container 部分
   */
  initContainer() {
    const container = document.querySelector(this.el);
    // container 是必须要素，如果没有，则报错
    if (!container) throw new Error("找不到 container");
    container.style.margin = "0";
    container.style.padding = "0";
    container.style.overflow = "hidden";

    this.container = container;
  }
  /**
   * 初始化 items 部分
   */
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
    // 当轮播内容宽度大于 container 宽度时，才需要轮播操作
    this.shouldCarousel = total > this.getElementWidth(this.container);
    this.shouldCarousel && (this.translateLimit = total + this.space);
  }
  /**
   * 根据实际情况，创建克隆元素，使得动画开始状态与结束状态保持一致
   */
  initCloneNode() {
    if (this.shouldCarousel) {
      const width = this.getElementWidth(this.container);
      let count = -1;
      let total = 0;

      while (total < width && count < this.items.length - 1) {
        count += 1;
        total += this.getElementWidth(this.items[count]);
      }

      this.cloneWidth = total + count * this.space;

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
  /**
   * 初始化 wrap 部分，将其添加到 container 中，container 中原子元素都加入到 wrap 中
   */
  initWrap() {
    const result = document.createElement("div");
    result.style.width = `${this.translateLimit + this.cloneWidth}px`;
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
  /**
   * 初始化其他参数
   */
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
  /**
   * 初始化轮播行为
   */
  initCarousel() {
    if (this.shouldCarousel) {
      if (this.timer) window.clearTimeout(this.timer);
      this.timer = window.setTimeout(this.startCarousel());
    }
  }
  /**
   * 初始化左右方向轮播按钮行为
   */
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
  /**
   * 轮播事件
   */
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
  /**
   * 用 window.getComputedStyle 取得元素宽度
   * @param {HTMLElement} element
   * @return {number}
   */
  getElementWidth(element) {
    return Number(window.getComputedStyle(element).width.split("px")[0]);
  }
}

try {
  exports.default = Carousel;
} catch {}
