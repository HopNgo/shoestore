var nav = document.querySelector('.header-mobile nav')
var menuMobile = document.getElementById('menu-bar');
// console.log(menuMobile);
menuMobile.onclick = function () {
    var isClose = nav.style.display !== 'block';

    if (isClose) {
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }
}