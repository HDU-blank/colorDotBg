;(function ($) {
    // 默认参数（放在插件外面, 避免每次调用插件都调用一次, 节省内存）
    var defaults = {
        maxRadius: 40,  //圆点最大半径
        min: 5,         //初始化圆点最小半径
        upRange: 50,    //鼠标位置upRange范围内圆点变大
        num: 1000,      //初始化圆点个数
        colorArray: ["#F6D600","#1F6ED4","#F70044","#35CE8D","#9068BE"] //初始化圆点颜色数组
    };

    $.fn.extend({
        //定义插件方法
        colorBallBg: function(options) {
          var opts = $.extend(defaults, options);
          var reg=/^#[0-9a-f]{3,6}$/i;
          // 简单判断用户定义的参数的有效性，这里可以将错误输出到控制台，但是我现在为了快速示范，就先不管报错，判断也只是粗略判断
            if ( !opts.maxRadius || typeof (opts.maxRadius - 0) !== 'number' || opts.maxRadius<20 || opts.maxRadius >70 || (opts.maxRadius - 0) % 1 !== 0 ) {
                opts.maxRadius = 40;
            }
            if ( !opts.min || typeof (opts.min - 0) !== 'number' || opts.min<=0 || opts.min >10 || (opts.min - 0) % 1 !== 0 ) {
                opts.min = 5;
            }
            if ( !opts.upRange || typeof (opts.upRange - 0) !== 'number' || opts.upRange<30 || opts.upRange >150 || (opts.upRange - 0) % 1 !== 0 ) {
                opts.upRange = 50;
            }
            if ( !opts.num || typeof (opts.num - 0) !== 'number' || opts.num<100 || opts.num >2000 || (opts.num - 0) % 1 !== 0 ) {
                opts.num = 1000;
            }
            if ( Object.prototype.toString.call(opts.colorArray) !== '[object Array]' || !opts.colorArray.every(isColor) ) {
                opts.colorArray = ["#35CE8D","#9068BE"];
            }
            function isColor(element, index, array){
              return reg.test(element);
            }

            //var colorArray = ["#F6D600","#1F6ED4","#F70044","#35CE8D","#9068BE"];
            var newCanvas = "<canvas></canvas>"; 
            $(this).append(newCanvas); 
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
              width = myCanvas[0].offsetWidth;
              height = myCanvas[0].offsetHeight;
              myCanvas[0].width = width;
              myCanvas[0].height = height;
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
              this.color = opts.colorArray[Math.floor(Math.random() * opts.colorArray.length)];
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
                  mouse.x - this.x < opts.upRange &&
                  mouse.x - this.x > -opts.upRange &&
                  mouse.y - this.y < opts.upRange &&
                  mouse.y - this.y > -opts.upRange
                ) {
                  if (this.radius < opts.maxRadius) {
                    this.radius += 1;
                  }
                } else if (this.radius > this.minRadius) {
                  this.radius -= 1;
                }
                //创建圆点对象时自动绘制圆点
                this.draw();
              };
            }
            //创建圆点对象并存入数组circleArray
            function init() {
              circleArray = [];
              for (var i = 0; i < opts.num; i++) {
                //设置随机圆点坐标，并使得圆点整体处于窗口内部
                var x = Math.random() * (width - radius * 2) + radius;
                var y = Math.random() * (height - radius * 2) + radius;
                var dx = Math.random() - 0.5;
                var dy = Math.random() - 0.5;
                var radius = Math.random() * 5 + opts.min;
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
        }
    })    
})(jQuery);