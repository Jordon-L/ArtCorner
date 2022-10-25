// Toggle navigation open
export function setupNav(){

  const navbarMenu = document.querySelector("#navigation #navbar-menu");
  const hamburgerMenu = document.querySelector("#navigation .hamburger-menu");

  
  if(hamburgerMenu != null && navbarMenu != null){
    hamburgerMenu.addEventListener("click", function () {
      navbarMenu.classList.toggle("open");
      hamburgerMenu.classList.toggle("open");
    });
  }
}




