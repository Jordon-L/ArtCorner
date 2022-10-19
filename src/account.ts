import PocketBase from "pocketbase";

export function setupPocketbase() {
  const createButton = document.getElementById("create-submit");
  if (createButton == undefined) {
    return;
  }
  const client = new PocketBase("http://www.pocketbase.jordonlee.com");
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
      const user = await client.users.create({
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      });

      if(user.profile == null){
        return;
      }
      // set user profile data
      const updatedProfile = await client.records.update(
        "profiles",
        user.profile.id,
        {
          name: "test",
        }
      );

      // send verification email
      await client.users.requestVerification(user.email);
    }
  });
}
