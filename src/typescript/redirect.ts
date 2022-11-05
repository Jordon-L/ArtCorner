import PocketBase from "pocketbase";

const client = new PocketBase("https://www.pocketbase.jordonlee.com");
const redirectUrl = "http://127.0.0.1:5173/redirect.html";

// parse the query parameters from the redirected url
const queryString = window.location.search;
const params = new URLSearchParams(queryString) as URLSearchParams | null;

// load the previously stored provider's data
const item = localStorage.getItem("provider") as string | null;
if (item != null && params != null) {
  const provider = JSON.parse(item);

  // compare the redirect's state param and the stored provider's one
  if (provider.state !== params.get("state")) {
    throw "State parameters don't match.";
  }

  const content = document.getElementById("content");
  const code = params.get("code");
  console.log(code);
  console.log(provider.codeVerifier);
  // authenticate
  if (code != null) {
    client.users
      .authViaOAuth2(provider.name, code, provider.codeVerifier, redirectUrl)
      .then((e) => {
        if (content != null) {
          console.log(e);
          window.location.href="/";
          content.innerText = "Login Successful. Redirecting to Home";
        }
      })
      .catch((err) => {
        if (content != null) {
          content.innerText = "Failed to exchange code.\n" + err;
        }
      });
  }
}
