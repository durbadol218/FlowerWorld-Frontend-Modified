// const hamburger = document.querySelector('#toggle-btn');

// hamburger.addEventListener('click', function(){
//     document.querySelector('#sidebar').classList.toggle('expand')
// });
const hamburger = document.querySelector('#toggle-btn');
const sidebar = document.querySelector('#sidebar');
const icon = document.querySelector('#toggle-icon');

hamburger.addEventListener('click', function () {
    sidebar.classList.toggle('expand');

    if (sidebar.classList.contains('expand')) {
        icon.classList.remove('fa-arrow-right');
        icon.classList.add('fa-arrow-left');
    } else {
        icon.classList.remove('fa-arrow-left');
        icon.classList.add('fa-arrow-right');
    }
});
