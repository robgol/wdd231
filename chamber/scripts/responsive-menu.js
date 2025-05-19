const hamburger = document.querySelector('.menu-button')
const navElement = document.querySelector('.menu-links')

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('change');
    navElement.classList.toggle('open');
})
