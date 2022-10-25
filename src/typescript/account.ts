import PocketBase from "pocketbase";

const client = new PocketBase("https://www.pocketbase.jordonlee.com");

function setupAccountCreate() {
  const createButton = document.getElementById("create-submit");
  const message = document.getElementById("message");
  if (createButton == undefined || message == undefined) {
    return;
  }

  createButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email") as HTMLInputElement | null;
    const password = document.getElementById(
      "password"
    ) as HTMLInputElement | null;
    const passwordConfirm = document.getElementById(
      "passwordConfirm"
    ) as HTMLInputElement | null;

    if (email != null && password != null && passwordConfirm != null) {
      // create user
      try {
        const user = await client.users.create({
          email: email.value,
          password: password.value,
          passwordConfirm: passwordConfirm.value,
        });
        if (user.profile == null) {
          return;
        }
        // set user profile data
        await client.records.update("profiles", user.profile.id, {
          name: "test",
        });

        // send verification email
        await client.users.requestVerification(user.email);
      } catch (err: any) {
        if (err.data.data.passwordConfirm != null) {
          message.innerHTML = `<p>${err.data.data.passwordConfirm?.message}</p>`;
        } else if (err.data.data.email != null) {
          message.innerHTML = `<p>${err.data.data.email?.message}</p>`;
        } else if (err.data.data.password != null) {
          message.innerHTML = `<p>${err.data.data.password?.message}</p>`;
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
    console.log(email, password);
    if (email != null && password != null) {
      try {
        // user authentication via email/pass
         await client.users.authViaEmail(
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
  const googleButton = document.getElementById("google-login");

  googleButton?.addEventListener("click", async (e) => {
    e.preventDefault();
    let result = await client.users.listAuthMethods();
    let googleInfo = result["authProviders"][0];
    console.log(googleInfo);
    localStorage.setItem("provider", JSON.stringify(googleInfo));
    try{
      window.location.href = `${googleInfo.authUrl}http://127.0.0.1:5173/redirect.html`;  
    }
    catch(err: any){
      console.log(err);
    }
  })
}

setupAccountCreate();
setupLogin();
googleLogin();