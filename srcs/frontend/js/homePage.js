const typedTextSpan = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");

const textArray = ["우영", "상원", "술", "삶", "사랑"];
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