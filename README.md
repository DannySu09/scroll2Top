# 使用方法：

在绑定事件中运行scroll2Top，如：

```
var divBtn = document.getElementsByClassName('divBtn')[0];
divBtn.addEventListener('click', function(){
    scroll2Top(box, 1400);
});
```

# scroll2Top接受2个参数：

* component (object): window对象，或者一个dom对象，这个是**必传参数**。
* time (number): 滚动到顶部的时间，单位是`ms`，默认值：1000ms。

例子：
```
scroll2Top(window, 1200);
```