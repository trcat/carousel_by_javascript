# carousel_by_javascript
用 javascript 实现走马灯动画效果

## Usage

### Browser

在 html `<body>` 标签中引入 `<script src="carousel.min.js"></script>`

### Node

```bash
npm install @trcat/carousel@1.0.0
```

### 实例

1. 通过 `new Carousel` 创建实例, 并传入对应 `options`, 实例代码如下:

   ```html
     <div class="carousel-container">
       <div class="carousel-item">1</div>
       <div class="carousel-item">2</div>
       <div class="carousel-item">3</div>
       <div class="carousel-item">4</div>
       <div class="carousel-item">5</div>
       <div class="carousel-item">6</div>
     </div>
     <button class="left">←</button>
     <button class="right">→</button>
   ```

   

   ```javascript
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
   ```

### 注意点

1. 充当 `carousel-container` 的标签必须要有宽度
2. 轮播的内容必须要加 `carousel-item` class, 并且并列放到充当 `carousel-container` 的标签中

### 实例代码效果

[效果展示](https://trcat.github.io/carousel_by_javascript/)



## log
- [x] 实现从左到右移动, 1 毫秒移动 1px
- [x] 轮播显示最后一个内容就停止
- [x] 实现循环
- [x] 鼠标悬停轮播停止, 移开鼠标轮播继续
- [x] 实现向左向右轮播动态切换
- [x] 用 javascirpt 生成 `wrap` div 标签
- [X] 用 javascript 生成克隆节点, 并计算 wrap 的宽度
- [X] 用 ES6 class 改写 javascript 代码
- [X] 让部分参数从组件外部传入
- [X] 添加控制左右方向按钮参数(选填), 并调整代码
- [x] 初步添加防护措施; 如果 item 不多, 则不会进行轮播
- [X] 用 gulp 打包编译压缩 javascript 代码
- [X] 添加 node 版本