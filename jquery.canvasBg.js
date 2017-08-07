$(function(){
  var colorArray = ["#F6D600","#1F6ED4","#F70044","#35CE8D","#9068BE"];
  var maxRadius = 40,
      min=5;
  var myCanvas = $("canvas"),
  //  计算画布的宽高
  width = myCanvas[0].offsetWidth,
  height = myCanvas[0].offsetHeight,
  ctx = myCanvas[0].getContext("2d");
  //  设置画布的宽高
  myCanvas[0].width = width;
  myCanvas[0].height = height;  
  
  var circleArray = [];
  //清除画布内容  
  function clear() {
    ctx.clearRect(0,0,width,height);
  }
  //鼠标位置坐标
  var mouse = {
  x: undefined,
  y: undefined
};
  //监听鼠标移动事件
  $(window).mousemove(function(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  }); 
  //监听浏览器窗口大小变化
  $(window).resize(function() {
    myCanvas[0].width = myCanvas[0].offsetWidth;
    myCanvas[0].height = myCanvas[0].offsetHeight;
    init();
  });
  //设置圆点对象构造函数
  function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    //圆点绘制方法
    this.draw = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    };
  
    this.update = function() {
      //判断圆点触碰边界反弹
      if (this.x + radius > width || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
  
      if (this.y + this.radius > height || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
  
      this.x += this.dx;
      this.y += this.dy;
  
      //判断圆点坐标位置离鼠标距离，圆点放大
  
      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50
      ) {
        if (this.radius < maxRadius) {
          this.radius += 1;
        }
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }
      //创建圆点对象时自动绘制圆点
      this.draw();
    };
  }
  function init() {
    circleArray = [];
    for (var i = 0; i < 800; i++) {
      //设置随机圆点坐标，并使得圆点整体处于窗口内部
      var x = Math.random() * (width - radius * 2) + radius;
      var y = Math.random() * (height - radius * 2) + radius;
      var dx = Math.random() - 0.5;
      var dy = Math.random() - 0.5;
      var radius = Math.random() * 5 + min;
      circleArray.push(new Circle(x, y, dx, dy, radius));
    }
  }
  //使圆点动起来，不断刷新重绘，刷新频率为显示器默认频率
  function animate() {
    requestAnimationFrame(animate);
    clear();
  
    for (var i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
  }

  init();
  animate();
})
