export default function compare(){
let imgBefore = document.querySelector('.image-before');

let width = imgBefore.offsetWidth;

let clicked;

imgBefore.style.width = (width / 2) + "px";

let slider = document.querySelector('.explore-slider');

slider.style.left = (width / 2) - (slider.offsetWidth / 2) + "px";


slider.addEventListener("mousedown", slideReady);

window.addEventListener("mouseup", slideFinish);
    
slider.addEventListener("touchstart", slideReady);
     
window.addEventListener("touchstop", slideFinish);

function slideReady(e) {
    
    e.preventDefault();
    
    clicked = 1;
    
    window.addEventListener("mousemove", slideMove);
    window.addEventListener("touchmove", slideMove);
}

function slideFinish() {
    clicked = 0;
}
function slideMove(e) {
    var pos;
    
    
    if (clicked == 0) return false;
    
    
    pos = getCursorPos(e)
    
    
    if (pos < 0) pos = 0;
    if (pos > width) pos = width;
    
    
    slide(pos);
}
function getCursorPos(e) {
    var a, x = 0;
    e = e || window.event;
   
    a = imgBefore.getBoundingClientRect();
    
    x = e.pageX - a.left;
    x = x - window.pageXOffset;
    return x;
}
function slide(x) {

    imgBefore.style.width = x + "px";

    slider.style.left = imgBefore.offsetWidth - (slider.offsetWidth / 2) + "px";
}


}