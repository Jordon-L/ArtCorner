import PocketBase from "pocketbase";
import {updateImage} from "./utils"

const pb = new PocketBase("https://artcorner.jordonlee.com");

let galleryList: any[] = [];

async function setupGallery() {
  const gallery = document.querySelector(".gallery");

  if(gallery == null){
    return;
  }

  const resultList = await pb.collection('posts').getList(1, 50, {
    filter: 'created >= "2022-01-01 00:00:00" ',
    sort: '-created'
  });

  if(gallery != null){
    let html = "";
    for(let i = 0; i < resultList.totalItems; i++){
      const post = resultList.items[i];
      html += `    <picture class="image" data-index-number=${i}>
      <img src= https://artcorner.jordonlee.com/api/files/${post["collectionId"]}/${post["id"]}/${post["file"]}?thumb=200x200 alt=${post["title"]}>
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


setupGallery();