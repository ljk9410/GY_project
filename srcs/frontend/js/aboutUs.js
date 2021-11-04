const container = document.querySelector('.abountUs__container');

container.addEventListener('scroll', (e) => {
    const sections = document.querySelectorAll('.aboutUs__section');
    const sectionPosition = sections[1].getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 3;

    console.log(sectionPosition, screenPosition);
    if (sectionPosition < screenPosition) {
        sections[1].classList.add('scroll-active');
    }
    else
        sections[1].classList.remove('scroll-active');
})

// typing effect
const typedTextSpan = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");

const textArray = ["선후배", "연결고리", "술?", "사랑"];
const typingDelay = 150;
const erassingDelay = 80;
const newTextDelay = 800;
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
        // 무한반복
        // if (textArrayIndex >= textArray.length)
        //     textArrayIndex = 0;
        setTimeout(type, typingDelay + 800);
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
        if (textArrayIndex >= textArray.length - 1)
            return ;
        setTimeout(erase, newTextDelay);
    }
}

type();