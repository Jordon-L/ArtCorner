import {setupNav} from './nav';

import PocketBase from "pocketbase";

const client = new PocketBase("https://www.pocketbase.jordonlee.com");

//check if logged in
function loggedIn(){
  const hero = document.getElementById("hero");
  const trending = document.querySelector(".trending") as HTMLElement | null;

  const loginNav = document.getElementById("login-nav");
  const uploadNav = document.getElementById("upload-nav");
  const profileNav = document.getElementById("profile-nav");
  if(loginNav == null || uploadNav == null || profileNav == null){
    return;
  }
  if(client.authStore.token.length != 0){
    loginNav.innerHTML = "Logout"
    if(hero != null && trending != null){
      hero.style.display = "none";
      trending.style.paddingTop = "4em"; 
    }
  }

  loginNav.addEventListener("click", async (e) => {
    e.preventDefault();
    if(client.authStore.token.length != 0){
      client.authStore.clear();
      window.location.href="index.html";
    }
    else{
      window.location.href="login.html";
    }

  });

  uploadNav.addEventListener("click", (e) => {
    e.preventDefault();
    if(client.authStore.token.length != 0){
      let modal = "modal-upload";
      let component = null;
      if(modal != null){
        component = document.getElementById(modal);
        window.location.href="upload.html";
      }
      if(component != null){
        component.style.display = "flex";
      }
    }
    else{
      window.location.href="login.html";
    }

  }); 

  profileNav.addEventListener("click", (e) => {
    e.preventDefault();
    if(client.authStore.token.length != 0){
      window.location.href="profile.html";
    }
    else{
      window.location.href="login.html";
    }

  });  


}

setupNav();
loggedIn();



