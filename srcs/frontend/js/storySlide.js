const slideWrap = document.querySelector('.story__content-slide-wrap');
const slideBox = document.querySelector('.story__content-slide-box');
const slideList = document.querySelector('.story__content-slide-list');
const slideContent = document.querySelectorAll('.story__content-slide-content');
const slidePrevBtn = document.querySelector('.story__content-slide-prevBtn');
const slideNextBtn = document.querySelector('.story__content-slide-nextBtn');
const slidePage = document.querySelector('.story__content-slide-pagination');

// Slide List
// width 값이 소수점일 때 문제가 발생 -> 새롭게 image를 랜더링해주면 되지 않을까?
let slideWidth = Math.floor(slideBox.offsetWidth);
let slideLen = slideContent.length;
slideContent.forEach((element => {
    element.style.cssText += `
        padding-bottom: ${100 / slideLen}%
    `
}))
slideList.style.width = slideWidth * slideLen + "px";

// 사진이 1장일 때
if (slideLen === 1) {
    slideNextBtn.style.display = "none";
}


// Slide Function
let index = 0;


// Pagination
let pageDot = '';
for (let i = 0; i < slideLen; i++) {
    pageDot += `
        <li class='dot' data-index="${i}"></li>
    `
}
slidePage.innerHTML = pageDot;

slidePage.querySelectorAll('.dot')[0].classList.add('dot-active');
const pageDotActive = () => {
    const dot_active = slidePage.querySelector('.dot-active');
    console.log(dot_active);
    const dots = slidePage.querySelectorAll('.dot')
    
    dots.forEach((element) => {
        if (parseInt(element.dataset.index) === index) {
            dot_active.classList.remove('dot-active');
            element.classList.add("dot-active");
        }
    });
}

const slideNext = () => {
    index++;
    pageDotActive();
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
    pageDotActive();
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

// 이부분 코딩 다시
// resize할 때 어떤게 다시 resize 되어야 하는가?
// translateX 의 값이 이상하게 변하기 떄문에 제대로 작동 X
// 일단은 고정 px로 만들어두기
window.addEventListener('resize', resizeSlide);
