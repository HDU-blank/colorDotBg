# colorDotBg

* #### colorDotBg()接受五个参数
    maxRadius   定义圆点变大时最大半径（maxRadius须为[20,70]之间的数字）
    min         定义圆点初始最小半径（min须为(0,10]之间的数字）
    upRange     定义鼠标位置upRange范围内圆点变大（upRange须为[20,70]之间的数字）
    num         初始化圆点个数（num须为[30,150]之间的数字）
    colorArray  初始化圆点颜色数组（colorArray须为素组，且数组元素均符合十六进制颜色编码）

* #### colorDotBg()参数默认值为    
    maxRadius: 40,  
    min: 5,         
    upRange: 50,   
    num: 1000,     
    colorArray: ["#F6D600","#1F6ED4","#F70044","#35CE8D","#9068BE"]

* #### 若colorDotBg()传入参数不全或不符合规范，则相应参数由默认值代替。