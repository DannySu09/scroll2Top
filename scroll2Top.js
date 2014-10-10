;(function(){
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

    var scrollTop = function(component, nextStep){
        if(nextStep === undefined) {
            return component.scrollY ? component.scrollY : component.scrollTop;
        } else if(nextStep <= 0) {
            component.scrollTo ? component.scrollTo(0, 0):component.scrollTop = 0;
            return 0;
        } else {
            component.scrollTo ? component.scrollTo(0, nextStep) : component.scrollTop = nextStep;
            return nextStep;
        }
    };

    var speedConduct = function(originSpeed, time, cur, total){
        var method = Math.sin;
        var PI = Math.PI;
        return originSpeed * method(PI * (total-cur)/total) + 1;
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
        console.log(time);
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
        window.define(function(){
            return scroll2Top;
        });
    } else {
        window.OE = window.OE || {};
        window.OE.scroll2Top = scroll2Top;
    }
})();