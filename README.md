# colorDotBg背景插件
#### 背景效果可见上个repositories--->canvasBall
***
* ### 使用方法：js代码中获取DOM元素，添加colorDotBg()方法，会在DOM元素下插入一个<canvas>元素
    ```
    $(function(){
        $("div").colorDotBg({
            maxRadius: 40,
            min: 10,
            upRange: 70,
            num: 200,
            colorArray: ["#F6D600","#1F6ED4","#F70044","#35CE8D","#9068BE"]
        });
    })
    ```
* ### colorDotBg(obj)接受一个对象参数，obj对象有五个属性
    ```
    - maxRadius   定义圆点变大时最大半径（maxRadius须为[20,70]之间的数字） 
    - min         定义圆点初始最小半径（min须为(0,10]之间的数字）
    - upRange     定义鼠标位置upRange范围内圆点变大（upRange须为[20,70]之间的数字）
    - num         初始化圆点个数（num须为[30,150]之间的数字）
    - colorArray  初始化圆点颜色数组（colorArray须为素组，且数组元素均符合十六进制颜色编码）
    ```

* ### colorDotBg(obj)参数默认值为    
    ```
    obj = {
        maxRadius: 40,  
        min: 5,         
        upRange: 50,   
        num: 1000,     
        colorArray: ["#F6D600","#1F6ED4","#F70044","#35CE8D","#9068BE"]
    }
    ```
* ### 若colorDotBg()传入对象参数不符合规范或属性值不全，则相应参数由默认值代替。