// typing effect
const typedTextSpan = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");

const textArray = ["연결고리", "WEB", "술?", "사랑"];
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

// document.addEventListener("DOMContentLoaded", () => {
//     if (textArray.length)    
//         setTimeout(type, newTextDelay);
// });


// scroll event
// scroll 제어
function throttle(callback, limit = 4000) {
    let waiting = false
    return function() {
        if(!waiting) {
            callback.apply(this, arguments)
            waiting = true
            setTimeout(() => {
                waiting = false
            }, limit)
        }
    }
}

const sections = document.querySelectorAll("section");
const sectionCount = sections.length;

sections.forEach((section, index) => {
    section.addEventListener('mousewheel', throttle((e) => {
        // e.preventDefault();
        console.log("scroll");
        let delta = 0;
        let moveTop = window.scrollY;
        const secondSection = window.pageYOffset + sections[1].getBoundingClientRect().top;
        const thirdSection = window.pageYOffset + sections[2].getBoundingClientRect().top;
        const fourthSection = window.pageYOffset + sections[3].getBoundingClientRect().top;
        const contentList = document.querySelectorAll(".nav-list");
        const secondMessage = document.querySelectorAll(".second__message");
        const secondImg = document.querySelector(".second__img");

        if (e.wheelDelta)
            delta = e.wheelDelta / 120;
        // wheel down
        if (delta < 0) {
            if (index !== sectionCount - 1) {
                moveTop = window.pageYOffset + section.nextElementSibling.getBoundingClientRect().top;
                

                // second section effect on
                if (moveTop === secondSection) {
                    setTimeout(type, newTextDelay);
                }

                
                // third section effect on
                if (moveTop === thirdSection) {
                    secondMessage.forEach(message => {
                        message.classList.add("sa");
                    })
                    secondImg.classList.add("sa");
                }
                
                // fourth section effect on
                if (moveTop === fourthSection) {
                    contentList.forEach(list => {
                        list.classList.add("sa");
                    })
                }
                
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
        
    }, 4000))
})