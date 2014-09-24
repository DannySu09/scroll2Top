define(function(){
    return function(originSpeed, style, cur, total){
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
    }
});