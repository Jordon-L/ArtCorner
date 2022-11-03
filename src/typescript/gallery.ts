import PocketBase from "pocketbase";
import {closeAllModal} from "./modal";

const client = new PocketBase("https://www.pocketbase.jordonlee.com");

let galleryList: any[] = [];

async function setupGallery() {
  const gallery = document.querySelector(".gallery");
  const resultList = await client.records.getList('posts', 1, 50, {
    sort: '-created,id',
    filter: 'created >= "2022-01-01 00:00:00"',
  });

  let length = galleryList.length;

  if(gallery != null){
    let html = "";
    for(let i = 0; i < resultList.totalItems; i++){
      const post = resultList.items[i];
      html += `    <picture class="image" data-index-number=${length+i}>
      <img src= https://www.pocketbase.jordonlee.com/api/files/${post["@collectionId"]}/${post["id"]}/${post["file"]}?thumb=200x200>
      <div class="image-info"></div>
      </picture>` ;      
    }
      gallery.innerHTML = html;
  }

  galleryList = [...galleryList, ...resultList.items];

  gallery?.addEventListener("click", (event) => {
    let target = event.target as HTMLElement;
    if(target == null){
      return;
    }
    if(target.tagName != "IMG"){
      return;
    }
    let parent = target.closest(".image");
    if(parent != null){
      let index = parent.getAttribute("data-index-number");
      let post =  galleryList[Number(index)];
      if(index != null){
        if(window.screen.width < 768){
          window.location.href = `/post.html?id=${post["id"]}`;
          return;
        }
        else{
          updateImage(post);
        }
      }
    }
  })
};

function updateImage(post : any){
  let modal = "modal-gallery";
  let component = null;
  if(modal != null){
    component = document.getElementById(modal);
  }
  if(component != null){
    component.style.display = "flex";
    let smImage = document.querySelector(".sm-image") as HTMLSourceElement;
    let lgImage = document.querySelector(".lg-image") as HTMLSourceElement;
    let baseURL = `https://www.pocketbase.jordonlee.com/api/files/${post["@collectionId"]}/${post["id"]}/${post["file"]}`;

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
  window.addEventListener('popstate', (e) => {
    closeAllModal();
  });
}
setupGallery();
setupPopState();
export {setupGallery, updateImage};