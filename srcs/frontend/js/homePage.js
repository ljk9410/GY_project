// scroll event
// window.addEventListener("wheel", (e) => {
//     e.preventDefault();
// }, {passive:false});
const sections = document.querySelectorAll("section");
const sectionCount = sections.length;

sections.forEach((section, index) => {
    section.addEventListener('mousewheel', (e) => {
        // e.preventDefault();
        let delta = 0;
        let moveTop = window.scrollY;

        if (e.wheelDelta)
            delta = e.wheelDelta / 120;
        // wheel down
        if (delta < 0) {
            if (index !== sectionCount - 1) {
                moveTop = window.pageYOffset + section.nextElementSibling.getBoundingClientRect().top;
            }
            else {
                return ;
            }
        }
        // wheel up
        else if (delta > 0) {
            if (index !== 0) {
                moveTop = window.pageYOffset + section.previousElementSibling.getBoundingClientRect().top;
            }
            else {
                return ;
            }
        }
        window.scrollTo({top:moveTop, left:0, behavior:'smooth'});        
    })
})



// typing effect
const typedTextSpan = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");

const textArray = ["우영", "상원", "WEB", "연결고리", "술", "사랑"];
const typingDelay = 200;
const erassingDelay = 100;
const newTextDelay = 1000;
let textArrayIndex = 0;
let charIndex = 0;

function erase() {
    if (charIndex > 0) {
        if (!cursor.classList.contains("typing"))
            cursor.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erassingDelay);
    } else {
        cursor.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1000);
    }
}

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursor.classList.contains("typing"))
            cursor.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursor.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (textArray.length)    
        setTimeout(type, newTextDelay);
})