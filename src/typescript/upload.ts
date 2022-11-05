import PocketBase from 'pocketbase';
const client = new PocketBase('https://pocketbase.jordonlee.com');

let filesToUpload: Blob;
let fileName = "image"

function upload() {
  const uploadButton = document.getElementById("form");
  const message = document.getElementById("message");
  if (uploadButton == undefined || message == undefined) {
    return;
  }

  uploadButton.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title") as HTMLInputElement | null;
    const summary = document.getElementById("summary") as HTMLInputElement | null;
    const file = document.getElementById("file") as HTMLInputElement | null;
    console.log('good');
    if (title != null && summary != null && file != null) {
      //check if title is 3 letters
      if(title.value.length > 3){

      }
      try {
        const form = document.querySelector("form")!
        const formData = new FormData(form);
        formData.set("file", filesToUpload, fileName);
        if(client.authStore.model?.id != undefined){
          formData.append("author", client.authStore.model?.id);
        }
        

        await client.records.create('posts', formData);
        window.location.href="index.html";
      } catch (err: any) {
        console.log(err.data);
        console.log(err);
        message.innerHTML = `<p>Something went wrong</p>`;
      }
    }
  });
}

function loadFile(file : File){
  fileName = file.name;
  const inputs = document.querySelectorAll(".input-group");
  inputs[0].classList.add("none");
  inputs[1].classList.remove("none");
  let reader = new FileReader();
  let preview = document.querySelector('#myimage') as HTMLImageElement;
  let image = new Image;
  //if covert to jpeg
  var c = document.createElement("canvas"),  // create a temp. canvas
  ctx = c.getContext("2d") as CanvasRenderingContext2D;
  image.onload = () => {
    c.width = image.naturalWidth;                      // set size = image, draw
    c.height = image.naturalHeight;
    ctx.drawImage(image, 0, 0);
    preview.src = c.toDataURL('image/jpeg', 0.9);
    c.toBlob(function(blob){
      filesToUpload = blob as Blob;
    },'image/jpeg', 0.9);
    
  };
    reader.addEventListener("load", () => {
      // convert image file to base64 string
      if(image != null){
        image.src = reader.result as string;
      }    
    }, false);

    reader.readAsDataURL(file);


}

function dropHandler(ev : any) {
  console.log('File(s) dropped');
  const fileHTML = document.getElementById("file") as HTMLInputElement | null;
  
  if(fileHTML == null){
    return;
  }
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    [...ev.dataTransfer.items].forEach((item) => {
      // If dropped items aren't files, reject them
      if (item.kind === 'file') {
        const file = item.getAsFile();
        loadFile(file);
      }
    });
  } else {
    // Use DataTransfer interface to access the file(s)
    [...ev.dataTransfer.files].forEach((file) => {
      loadFile(file);
    });
  }
}

function dragOverHandler(ev: any) {
  console.log('File(s) in drop zone');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

function setupFileUpload(){
  const zone = document.querySelector(".drop-zone") as HTMLInputElement | null;
  const input = document.querySelector("#file") as HTMLInputElement | null;
  const title = document.getElementById('title');
  if(zone == null){
    return;
  }
  console.log('test');
  zone.addEventListener("drop", dropHandler);
  zone.addEventListener("dragover", dragOverHandler);
  input?.addEventListener("input", (ev) => {
    let fileInput = (ev.target as HTMLInputElement | null);
    if(fileInput != null){
      let file = fileInput.files;
      if(file != null){
        console.log('testing')
        loadFile(file[0]);
      }
    }
    
  });
}

setupFileUpload();
upload();