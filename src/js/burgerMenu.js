const menu_wrapper = document.querySelector('.hidden-menu');
const button_icon = document.querySelector('.button-icon').addEventListener('click', () => {
    menu_wrapper.classList.toggle('show-menu')
})
document.addEventListener('scroll', () => {
    menu_wrapper.classList.add('show-menu')
})