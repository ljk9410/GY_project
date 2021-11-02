window.addEventListener('scroll', (e) => {
    const sections = document.querySelectorAll('.aboutUs__section');
    const sectionPosition = sections[1].getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 3;

    if (sectionPosition < screenPosition) {
        sections[1].classList.add('scroll-active');
    }
    else
        sections[1].classList.remove('scroll-active');
})
