var divBtn = document.getElementsByClassName('divBtn')[0];
var gBtn = document.getElementsByClassName('globalBtn')[0];
var box = document.getElementsByClassName('papa')[0];
var scroll2Top = OE.scroll2Top;
divBtn.addEventListener('click', function(){
    scroll2Top(box, 'ease-in');
});
gBtn.addEventListener('click', function(){
    scroll2Top(window, 300, 'ease-out');
});