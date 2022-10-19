import PocketBase from "pocketbase";

function setupPocketbase() {
  const createButton = document.getElementById("create-submit");
  const message = document.getElementById("message");
  if (createButton == undefined || message == undefined) {
    return;
  }
  const client = new PocketBase("https://www.pocketbase.jordonlee.com");
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
        if(err.data.data.passwordConfirm != null){
          message.innerHTML = `<p>${err.data.data.passwordConfirm?.message}</p>`
        }
        else if(err.data.data.email != null){
          message.innerHTML = `<p>${err.data.data.email?.message}</p>`;
        }
        else if(err.data.data.password != null){
          message.innerHTML = `<p>${err.data.data.password?.message}</p>`;
        }

      }
    }
  });
}

export {setupPocketbase}