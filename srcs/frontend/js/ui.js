const navToggleBtn = document.querySelector(".menu__toggle");
const navContainer = document.querySelector(".nav__container");

navToggleBtn.addEventListener("click", () => {
    navContainer.classList.toggle("nav-active");
})