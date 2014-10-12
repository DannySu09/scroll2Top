;(function(){
//    get the prefix or non-prefix raf
    var animate = (function(){
        var action = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        return function(runner){
            action.call(window, runner);
        };
    })();

//    get or set the scrollTop value
    var scrollTop = function(component, nextStep){
        if(nextStep == null) {
            return component.scrollY != null ? component.scrollY : component.scrollTop;
        } else if(nextStep <= 0) {
            component.scrollTo ? component.scrollTo(0, 0):component.scrollTop = 0;
            return 0;
        } else {
            component.scrollTo ? component.scrollTo(0, nextStep) : component.scrollTop = nextStep;
            return nextStep;
        }
    };

//    set speed
    var speedConduct = function(originSpeed, time, cur, total){
        if(total === 0) {
            return 0;
        }
        var method = Math.sin;
        var PI = Math.PI;
        var INIT_SPEED = 2;
        return originSpeed * method(PI * (total-cur)/total) + INIT_SPEED;
    };

    var scroll2Top = function(component, time){
        var DEFAULT_TIME = 1000;
        if(component == null) {
            console.error('You must assign a dom node object or window object as the first param.');
            return;
        }
        if(time == null) {
            time = DEFAULT_TIME;
        }
        var originY = scrollTop(component);
        var currentY = originY;
        var originSpeed = originY / (time / 60);
        var currentSpeed;
        (function operate(){
            currentSpeed = speedConduct(originSpeed, time, currentY, originY);
            currentY -= currentSpeed;
            if(scrollTop(component, currentY) !== 0) {
                animate(operate);
            }
        })();
    };

    if(window.define != null) {
        define(function(){
            return scroll2Top;
        });
    } else {
        window.scroll2Top = scroll2Top;
    }
})();