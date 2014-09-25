;(function(){
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

    var speedConduct = function(originSpeed, style, cur, total){
        var method;
        var resultSpeed;
        var pi = Math.PI;
        switch (style) {
            case 'ease-in':
                method = Math.cos;
                break;
            case 'ease-out':
                method = Math.sin;
                break;
            case 'steady':
                return resultSpeed = originSpeed;
            default :
                method = Math.cos;
        }
        resultSpeed = originSpeed * method((pi/2)*(total-cur)/total);
        return resultSpeed > 20? resultSpeed : 20;
    };

    var scroll2Top = function(component, speed, style){
        if(component === undefined) {
            console.error('You must assign a dom node object or window object as the first param.');
            return;
        }
        if(typeof speed !== 'number') {
            if(typeof speed === 'string' && speed.match(/ease-in|ease-out|steady/).length !== 0) {
                style = speed
            }
            speed = 300;
        }
        if(style === undefined) {
            style = 'steady';
        }
        var originY = scrollTop(component);
        var currentY = originY;
        var currentSpeed;
        var operate = function(){
            currentSpeed = speedConduct(speed, style, currentY, originY);
            currentY -= currentSpeed;
            if(scrollTop(component, currentY) !== 0) {
                setTimeout(operate, 1000/60);
            }
        };
        operate();
    };
    window.OE = window.OE || {};
    window.OE.scroll2Top = scroll2Top;
})();