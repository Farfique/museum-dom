export default function compare(){
let imgBefore = document.querySelector('.image-before');

let width = imgBefore.offsetWidth;

let clicked;

imgBefore.style.width = (width / 2) + "px";

let slider = document.querySelector('.explore-slider');

slider.style.left = (width / 2) - (slider.offsetWidth / 2) + "px";


slider.addEventListener("mousedown", startListenSlider);

window.addEventListener("mouseup", stopSlider);
    
slider.addEventListener("touchstart", startListenSlider);
     
window.addEventListener("touchstop", stopSlider);

function startListenSlider(event) {
    
    event.preventDefault();
    
    clicked = true;
    
    window.addEventListener("mousemove", moveSlider);
    window.addEventListener("touchmove", moveSlider);
}

function stopSlider() {
    clicked = false;
}
function moveSlider(event) {
    let position;
    
    
    if (clicked == false) 
        return false;    
    
    position = getCursorPosition(event)
    
    
    if (position < 0) 
        position = 0;

    if (position > width) 
        position = width;
    
    moveSliderToPosition(position);
}
function getCursorPosition(event) {
    let domRectangle;
    event = event || window.event;
   
    domRectangle = imgBefore.getBoundingClientRect();

    return event.pageX - domRectangle.left - window.pageXOffset;
}
function moveSliderToPosition(x) {

    imgBefore.style.width = x + "px";

    slider.style.left = imgBefore.offsetWidth - (slider.offsetWidth / 2) + "px";
}


}