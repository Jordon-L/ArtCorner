// Toggle navigation open 

const navbarMenu = document.querySelector("#navigation #navbar-menu");
const hamburgerMenu = document.querySelector("#navigation .hamburger-menu");
const main = document.querySelector("main");

hamburgerMenu.addEventListener('click', function() {
    navbarMenu.classList.toggle("open");
    hamburgerMenu.classList.toggle("open");
});