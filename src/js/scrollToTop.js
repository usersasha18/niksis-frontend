const button = document.querySelector('.top-button');
 
const offset_height = document.documentElement.clientHeight;


document.addEventListener('scroll', function() {
    if(Math.round(window.scrollY) > offset_height) {
        button.classList.add('show')
    } else {
        button.classList.remove('show')
    }
});


button.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})
