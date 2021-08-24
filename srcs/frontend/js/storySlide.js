const slideWrap = document.querySelector('.story__content-slide-wrap');
const slideBox = document.querySelector('.story__content-slide-box');
const slideList = document.querySelector('.story__content-slide-list');
const slideContent = document.querySelectorAll('.story__content-slide-content');
const slidePrevBtn = document.querySelector('.story__content-slide-prevBtn');
const slideNextBtn = document.querySelector('.story__content-slide-nextBtn');

// Slide List
const slideWidth = 480;
const slideLen = slideContent.length;

slideList.style.width = slideWidth * slideLen + "px";


// Slide Function
let index = 0;
const slideNext = () => {
    index++;
    if (index !== 0) {
        slidePrevBtn.style.display = "inline-block"
    }
    if (index <= slideLen - 1) {
        slideList.style.transform = `translateX(-${slideWidth * index}px)`;
        slideList.style.transition = `300ms`;
    }
    if (index === slideLen - 1) {
        slideNextBtn.style.display = "none";
    }
}
const slidePrev = () => {
    index--;
    if (index === 0) {
        slidePrevBtn.style.display = "none"
    }
    if (index >= 0) {
        slideList.style.transform = `translateX(-${slideWidth * index}px)`;
        slideList.style.transition = `300ms`;
    }
    if (index !== slideLen - 1) {
        slideNextBtn.style.display = "inline-block";
    }
}

slidePrevBtn.addEventListener("click", slidePrev);
slideNextBtn.addEventListener("click", slideNext);