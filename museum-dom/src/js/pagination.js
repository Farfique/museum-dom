


function Pagination (sliderId, prefix) {

    const slider = document.querySelector(sliderId);

    const wrapper = slider.querySelector('.slider-wrapper');

    const slides = wrapper.getElementsByClassName('slide');

    const sliderControls = slider.querySelector('.slider-controls');
    const paginationBullets = sliderControls.querySelector('.slider-pagination-bullets');

    const buttonPrev = sliderControls.querySelector('.slider-button-prev');
    const buttonNext = sliderControls.querySelector('.slider-button-next');

    let slidesBullets = {};

    function getSlideIndex(slide){
        return Array.prototype.indexOf.call(wrapper.children, slide);
    }

    function findBulletFromSlide(slide){
        let index = getSlideIndex(slide);
        return slidesBullets[index].bullet;
    }

    function stringSlideNumberWithPads(number, stringLength = 2){
        let n = '' + number;
        let numberZeroPads = Math.max(stringLength - n.length, 0);
        let addedPads = new Array(numberZeroPads).fill('0').join('');
        return addedPads + n;
    }

    function hideSlide(slide, direction="to-left"){
        let bullet = findBulletFromSlide(slide);

        slide.classList.add(prefix + '-hiding-' + direction);
        bullet.classList.remove("slider-pagination-bullet-active");

        slide.classList.remove("active-slide");

        slide.addEventListener('animationend', () => {
            console.log("animation-hiding-end");
            slide.classList.remove(prefix + '-hiding-' + direction);
            
            
        }, {once: true});
    }

    function slideIn(slide, direction="to-left"){
        let bullet = findBulletFromSlide(slide);

        slide.classList.add(prefix + '-sliding-' + direction);
        bullet.classList.add("slider-pagination-bullet-active");

        if (sliderControls.querySelector('.slider-pagination-current')){
            sliderControls.querySelector('.slider-pagination-current').innerText = stringSlideNumberWithPads(getSlideIndex(slide)+1);
        }
        
        slide.addEventListener('animationend', () => {
            console.log("animation-sliding-end");
            slide.classList.remove(prefix + '-sliding-' + direction);
           
        }, {once: true});

        slide.classList.add("active-slide");

        let changeSlideEvent = new CustomEvent('changeActiveSlide', {
            bubbles: true,
            slide: slide
        });
        slide.dispatchEvent(changeSlideEvent); 

    }

    function goToNext(){
        let activeSlide = wrapper.querySelector('.active-slide');
        let next = activeSlide.nextElementSibling;
        if (!next){
            next = slides[0];
        }

        goToSlide(next, 'to-left');
    
    }

    function goToPrev(){
        let activeSlide = wrapper.querySelector('.active-slide');
        let prev = activeSlide.previousElementSibling;
        if (!prev){
            prev = slides[slides.length - 1];
        }

        goToSlide(prev, 'to-right');
    }

    function goToSlide(slide, direction){
        if (!slide){
            slide = slides[0];
        }

        let activeSlide = wrapper.querySelector('.active-slide');
        hideSlide(activeSlide, direction);
        slideIn(slide, direction);

    }

    function goToSlideNumber(index){
        let activeSlide = wrapper.querySelector('.active-slide');
        let currentIndex = getSlideIndex(activeSlide);

        let direction = (index - currentIndex) > 0? "to-left" : "to-right";
        if (index != currentIndex){
            let slideToGo = wrapper.children[index];
            goToSlide(slideToGo, direction);
        }
    }

    
    wrapper.querySelectorAll('.slide').forEach((slide) => {
        let bullet = document.createElement('span');
        bullet.classList.add('slider-pagination-bullet');
        
        if (slide.classList.contains('active-slide'))
        {
            bullet.classList.add('slider-pagination-bullet-active');
        }
        paginationBullets.appendChild(bullet);
        let index =  Array.prototype.indexOf.call(wrapper.children, slide);
        
        slidesBullets[index] = {slide, bullet};
        bullet.addEventListener('click', () => {
            goToSlideNumber(index);
        });
    })



    buttonNext.addEventListener('click', () => {
        console.log("button next clicked");

        goToNext();
    });

    buttonPrev.addEventListener('click', () => {
        console.log("button prev clicked");

        goToPrev();
    })


}

export default Pagination;