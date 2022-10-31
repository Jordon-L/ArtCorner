import PocketBase from "pocketbase";

const client = new PocketBase("https://www.pocketbase.jordonlee.com");

async function setupGallery() {
  const gallery = document.querySelector(".gallery");
  const resultList = await client.records.getList('posts', 1, 50, {
    sort: '-created,id',
    filter: 'created >= "2022-01-01 00:00:00"',
  });
  if(gallery != null){
    let html = "";
    for(let i = 0; i < resultList.totalItems; i++){
      const post = resultList.items[i];
      html += `    <picture>
      <img src= https://www.pocketbase.jordonlee.com/api/files/${post["@collectionId"]}/${post["id"]}/${post["file"]}?thumb=200x200>
      </picture>` ;      
    }
      gallery.innerHTML = html;
  }
};


setupGallery();

export {setupGallery};