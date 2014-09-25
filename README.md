# 使用方法：

在绑定事件中运行scroll2Top，如：

```
var divBtn = document.getElementsByClassName('divBtn')[0];
divBtn.addEventListener('click', function(){
    scroll2Top(box, 400, 'ease-in');
});
```

# `scroll2Top`接受三个参数：

* component(object): window对象，或者一个dom对象。
* speed(number): 滚动速度。缺省/默认值300px每1000/60ms。
* style(string)：滚动效果，目前支持三种，分别为：'steady'、'ease-in'、'ease-out'。缺省/默认值 'steady'。

例子：
```
scroll2Top('steady', 500, 'ease-out');
```