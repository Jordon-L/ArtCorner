import PocketBase from 'pocketbase';
const client = new PocketBase('https://pocketbase.jordonlee.com');


function upload() {
  const uploadButton = document.getElementById("upload-submit");
  const message = document.getElementById("message");
  if (uploadButton == undefined || message == undefined) {
    return;
  }

  uploadButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title") as HTMLInputElement | null;
    const summary = document.getElementById("summary") as HTMLInputElement | null;
    const file = document.getElementById("file") as HTMLInputElement | null;;
    console.log('good');
    if (title != null && summary != null && file != null) {
      try {
        const form = document.querySelector("form")!
        const formData = new FormData(form);
        console.log('good');
        if(client.authStore.model?.id != undefined){
          formData.append("author", client.authStore.model?.id);
        }
        

        const record = await client.records.create('posts', formData);
        console.log(record);
        console.log('good');
      } catch (err: any) {
        console.log(err.data);
        message.innerHTML = `<p>Wrong Password</p>`;
      }
    }
  });
}

upload();