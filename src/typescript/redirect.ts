import PocketBase from "pocketbase";

const pb = new PocketBase("https://artcorner.jordonlee.com");
const redirectUrl = "https://artcorner.jordonlee.com/redirect.html";

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
  // authenticate
  if (code != null) {
    pb.collection('users')
      .authWithOAuth2(provider.name, code, provider.codeVerifier, redirectUrl, {
        'name': 'test',
      },)
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
