// Toggle navigation open

const navbarMenu = document.querySelector("#navigation #navbar-menu");
const hamburgerMenu = document.querySelector("#navigation .hamburger-menu");
const main = document.querySelector("main");
const gallery = document.querySelector(".gallery");

hamburgerMenu.addEventListener("click", function () {
  navbarMenu.classList.toggle("open");
  hamburgerMenu.classList.toggle("open");
});

function getImages() {
  let html = "";
  for(let i = 1; i < 9; i++){
    html += `    <picture>
    <img src="src/images/trending/${i}.jpg">
    </picture>` ;      
  }
  gallery.innerHTML = html;
};

getImages();
