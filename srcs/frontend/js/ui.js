const navToggleBtn = document.querySelector(".menu__toggle");
const navContainer = document.querySelector(".nav__container");
const mainContainer = document.querySelector(".main__container");

navToggleBtn.addEventListener("click", () => {
    navContainer.classList.toggle("nav-active__header");
    mainContainer.classList.toggle("nav-active__main");
})
