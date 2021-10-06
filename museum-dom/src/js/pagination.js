const slider = document.querySelector('#welcome-slider');

const wrapper = slider.querySelector('.slider-wrapper');

const slides = wrapper.getElementsByClassName('slide');

const sliderControls = slider.querySelector('.slider-controls');
const paginationBullets = sliderControls.querySelector('.slider-pagination-bullets');

const buttonPrev = sliderControls.querySelector('.slider-button-prev');
const buttonNext = sliderControls.querySelector('.slider-button-next');


function Pagination () {

    wrapper.querySelectorAll('.slide').forEach((slide) => {
        let bullet = document.createElement('span');
        bullet.classList.add('slider-pagination-bullet');
        if (slide.classList.contains('active-slide'))
        {
            bullet.classList.add('slider-pagination-bullet-active');
        }
        paginationBullets.appendChild(bullet);
    })



    buttonNext.addEventListener('click', () => {
        console.log("button next clicked");

        let activeSlide = wrapper.querySelector('.active-slide');
        let next = activeSlide.nextElementSibling;
        if (!next){
            next = slides[0];
        }
        if (next){
            next.classList.add("active-slide")
            activeSlide.classList.remove("active-slide");
        }

        let activeBullet = paginationBullets.querySelector('.slider-pagination-bullet-active');
        let nextBullet = activeBullet.nextElementSibling;
        if (!nextBullet){
            nextBullet = paginationBullets.children[0];
        }
        if (nextBullet) {
            nextBullet.classList.add("slider-pagination-bullet-active")
            activeBullet.classList.remove("slider-pagination-bullet-active");
        }
    });

    buttonPrev.addEventListener('click', () => {
        console.log("button prev clicked");

        let activeSlide = wrapper.querySelector('.active-slide');
        let prev = activeSlide.previousElementSibling;
        if (!prev){
            prev = slides[slides.length - 1];
        }
        if (prev){
            prev.classList.add("active-slide")
            activeSlide.classList.remove("active-slide");
        }

        let activeBullet = paginationBullets.querySelector('.slider-pagination-bullet-active');
        let prevBullet = activeBullet.previousElementSibling;
        if (!prevBullet){
            prevBullet = paginationBullets.children[paginationBullets.children.length - 1];
        }
        if (prevBullet) {
            prevBullet.classList.add("slider-pagination-bullet-active")
            activeBullet.classList.remove("slider-pagination-bullet-active");
        }
    })
}

export default Pagination;