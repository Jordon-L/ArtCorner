

function setupGallery() {
  const gallery = document.querySelector(".gallery");
  if(gallery != null){
    let html = "";
    for(let i = 1; i < 9; i++){
      html += `    <picture>
      <img src="../images/trending/${i}.jpg">
      </picture>` ;      
    }
      gallery.innerHTML = html;
  }
};


setupGallery();

export {setupGallery};