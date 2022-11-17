import PocketBase from "pocketbase";
import {updateImage} from "./gallery"

const client = new PocketBase("https://www.pocketbase.jordonlee.com");
let galleryList: any[] = [];

async function getPost() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  if (id != null) {
    const author = await client.records.getList("profiles", 1, 50, {
      filter: `userId = "${id}"`,
    });
    if(author != null){
      let text = document.querySelector(".author > .author-name > a") as HTMLLinkElement;
      text.innerHTML = author.items[0].name;
      text.href = `/profile.html?id=${id}`
    }
    const resultList = await client.records.getList("posts", 1, 50, {
      sort: "-created,id",
      filter: `author = "${id}"`,
    });
    populateUserGallery(resultList);
  }
}

function populateUserGallery(list: any) {
  let gallery = document.querySelector(".gallery");

  if (gallery != null) {
    let html = "";
    for (let i = 0; i < list.totalItems; i++) {
      const post = list.items[i];
      html += `    <picture class="image" data-index-number=${length + i}>
      <img src= https://www.pocketbase.jordonlee.com/api/files/${
        post["@collectionId"]
      }/${post["id"]}/${post["file"]}?thumb=200x200 alt=${post["title"]}>
      <div class="image-info"></div>
      </picture>`;
    }
    gallery.innerHTML = html;
  }

  galleryList = [...galleryList, ...list.items];

  gallery?.addEventListener("click", (event) => {
    let target = event.target as HTMLElement;
    if (target == null) {
      return;
    }
    if (target.tagName != "IMG") {
      return;
    }
    let parent = target.closest(".image");
    if (parent != null) {
      let index = parent.getAttribute("data-index-number");
      let post = galleryList[Number(index)];
      if (index != null) {
        if (window.screen.width < 768) {
          window.location.href = `/post.html?id=${post["id"]}`;
          return;
        } else {
          updateImage(post);
        }
      }
    }
  });
}
function profileBackButton() {
  let backButtons = document.querySelectorAll(".back");
  backButtons.forEach((e) => {
    e.addEventListener("click", () => {
      window.location.href = "/";
    });
  });
}

profileBackButton();
getPost();
