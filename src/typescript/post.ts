import PocketBase from "pocketbase";
import {updateImage} from "./gallery"


const client = new PocketBase("https://www.pocketbase.jordonlee.com");


async function getPost(){
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  if(id != null){
    console.log(id);
    const post = await client.records.getOne('posts', id, {});
    updateImage(post);
  }
}


getPost();
