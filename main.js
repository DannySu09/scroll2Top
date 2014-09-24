require(['script/handler'], function(handler){
    var divBtn = document.getElementsByClassName('divBtn')[0];
    var gBtn = document.getElementsByClassName('globalBtn')[0];
    var box = document.getElementsByClassName('papa')[0];
    divBtn.addEventListener('click', function(){
        handler(box, 'ease-in');
    });
    gBtn.addEventListener('click', function(){
        handler(window, 300, 'ease-out');
    });
});