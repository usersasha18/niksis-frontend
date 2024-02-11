const tabsBtn = document.querySelectorAll('.tab');
const tabsItem = document.querySelectorAll('.tabContent');

tabsBtn.forEach(function(item) {
    item.addEventListener('click', function() {
        let currernrBtn = item;
        let tabID = currernrBtn.getAttribute('data-tab');
        openBlock(tabID)
        tabsBtn.forEach(function(item){
            item.classList.remove('pressed');
        })
        currernrBtn.classList.add('pressed');
    })
})

function openBlock(id) {
    tabsItem.forEach(element => {
        let element_id = element.id
        if(element_id === id) {
            element.classList.add('open')
        } else {
            element.classList.remove('open')
        }
    });
}