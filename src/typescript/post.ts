import PocketBase from "pocketbase";
import {updateImage} from "./gallery"


const client = new PocketBase("https://www.pocketbase.jordonlee.com");


async function getPost(){
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  if(id != null){
    const post = await client.records.getOne('posts', id, {});
    updateImage(post);
  }
}

function postBackButton(){
  let backButtons = document.querySelectorAll(".back");
  backButtons.forEach((e) => {
    e.addEventListener("click", () => {
      window.location.href = '/';
    });
  });
}

postBackButton()
getPost();
