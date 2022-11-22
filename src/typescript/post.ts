import PocketBase from "pocketbase";
import {updateImage} from "./gallery"


const client = new PocketBase("https://artcorner.jordonlee.com");

let authorId = "" as string;

async function getPost(){
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  if(id != null){
    const post = await client.records.getOne('posts', id, {});
    authorId = post.author;
    updateImage(post);
  }
}

function postBackButton(){
  let backButtons = document.querySelectorAll(".back");
  backButtons.forEach((e) => {
    e.addEventListener("click", () => {
      if(document.referrer.includes("profile")){
        if(authorId.length != 0){
          window.location.href = `/profile.html?id=${authorId}`;
        }
      }
      else{
        window.location.href = '/';
      }
      
    });
  });
}

postBackButton()
getPost();
