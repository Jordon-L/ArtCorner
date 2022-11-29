import {closeAllModal} from "./modal";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://artcorner.jordonlee.com");

async function updateImage(post : any){
  const profile = await pb.collection('users').getOne(`${post.author}`);
  let modal = "modal-gallery";
  let component = null;
  if(modal != null){
    component = document.getElementById(modal);
  }
  if(component != null){

    component.style.display = "flex";
    let smImage = document.querySelector(".sm-image") as HTMLSourceElement;
    let lgImage = document.querySelector(".lg-image") as HTMLSourceElement;
    let baseURL = `https://artcorner.jordonlee.com/api/files/${post["collectionId"]}/${post["id"]}/${post["file"]}`;
    let title = document.querySelector(".title") as HTMLElement;
    let summary = document.querySelector(".summary") as HTMLElement;
    title.innerHTML = post["title"];
    summary.innerHTML = post["summary"];
    if(profile != null){

      let authorList = document.querySelectorAll(".author") as NodeList;
      authorList.forEach((e) => {
        let author = e as  HTMLElement;
        let avatar = author.querySelector(".author > picture > #profile-image") as HTMLImageElement;
        let text = author.querySelector(".author > .author-name > a") as HTMLLinkElement;
        text.innerHTML = profile.name;
        text.href = `/profile.html?id=${post.author}`
      
        if(profile.avatar != ""){
          avatar.src = profile.avatar;
        }
      });
    }
    if(smImage != null){
      smImage.srcset = `${baseURL}?thumb=400x400f`;
    }
    if(lgImage != null){
      lgImage.srcset = `${baseURL}`;
    }
    if(window.location.href.indexOf("post.html") <= -1){
      window.history.pushState({'post': true}, '', `/post.html?id=${post["id"]}`);
    }
    
  }
}

function setupPopState(){
  window.addEventListener('popstate', () => {
    closeAllModal();
  });
}

setupPopState();

export {updateImage};