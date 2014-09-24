define(["./scrollTop", "./speedConduct"], function(scrollTop, speedConduct){
    return function(component, speed, style){
        if(component === undefined) {
            console.error('You must assign a dom node object or window object as the first param.');
            return;
        }
        if(typeof speed !== 'number') {
            if(typeof speed === 'string' && speed.match(/ease|steady/).length !== 0) {
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
});