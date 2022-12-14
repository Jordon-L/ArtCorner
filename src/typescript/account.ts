import PocketBase from "pocketbase";

const pb = new PocketBase("https://artcorner.jordonlee.com");

function setupAccountCreate() {
  const createForm = document.getElementById("form");
  const messageEmail = document.getElementById("message-email");
  const messagePass = document.getElementById("message-pass");
  const messageUser = document.getElementById("message-user");
  if (createForm  == undefined || messagePass == undefined || messageEmail == undefined || messageUser == undefined) {
    return;
  }

  createForm.addEventListener("submit", async (e) => {
    
    e.preventDefault();

    const email = document.getElementById("email") as HTMLInputElement | null;
    const username = document.getElementById("username") as HTMLInputElement | null;
    const password = document.getElementById(
      "password"
    ) as HTMLInputElement | null;
    const passwordConfirm = document.getElementById(
      "confirm-password"
    ) as HTMLInputElement | null;
    if (email != null && password != null && passwordConfirm != null && username != null) {
      // create user
      
      try {
        const user = await pb.collection('users').create({
          email: email.value,
          password: password.value,
          passwordConfirm: passwordConfirm.value,
          name: username.value,
        });

        if (user == null) {
          return;
        }
        //login
        await pb.collection('users').authWithPassword(
          email.value,
          password.value
        );
        // send verification email
        //await client.users.requestVerification(user.email);
        window.location.href="index.html";
      } catch (err: any) {
        console.log(err)
        if (err.data.data.passwordConfirm != null) {
          messagePass.innerHTML = `<p>${err.data.data.passwordConfirm?.message}</p>`;
        } else if (err.data.data.email != null) {
          messageEmail.innerHTML = `<p>${err.data.data.email?.message}</p>`;
        } else if (err.data.data.password != null) {
          messagePass.innerHTML = `<p>${err.data.data.password?.message}</p>`;
        } else if(err.data.data.name != null) {
          messageUser.innerHTML = `<p>${err.data.data.name?.message}</p>`
        }
        else{
          console.log(err)
        }
      }
    }
  });
}

function setupLogin() {
  const loginButton = document.getElementById("login-submit");
  const message = document.getElementById("message");
  if (loginButton == undefined || message == undefined) {
    return;
  }

  loginButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email") as HTMLInputElement | null;
    const password = document.getElementById("password") as HTMLInputElement | null;
    if (email != null && password != null) {
      try {
        // user authentication via email/pass
        await pb.collection('users').authWithPassword(
          email.value,
          password.value
        );
        window.location.href="index.html";
      } catch (err: any) {
        password.className = password.className + " error";
        message.innerHTML = `<p>Wrong password or Email</p>`;
      }
    }
  });
}

function googleLogin(){
  const url = 'https://artcorner.jordonlee.com'
  const googleButton = document.getElementById("google-login");

  googleButton?.addEventListener("click", async (e) => {
    e.preventDefault();
    const result = await pb.collection('users').listAuthMethods();
    let googleInfo = result["authProviders"][0];
    localStorage.setItem("provider", JSON.stringify(googleInfo));
    try{
      window.location.href = `${googleInfo.authUrl}${url}/redirect.html`;  
    }
    catch(err: any){
      console.log(err);
    }
  })
}

setupAccountCreate();
setupLogin();
googleLogin();