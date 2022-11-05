function setupModal(){
  window.onclick = function (event) {
    if(event.target == null){
      return;
    }
    if ((event.target as Element).className.includes("modal")) {
      (event.target as Element).setAttribute("style", "display: none");
      window.history.back();
    }
  };
  modalBackButton();
}

function modalBackButton(){
  let backButtons = document.querySelectorAll(".back-button");
  if(backButtons == null){
    return;
  }
  backButtons.forEach((e) => {
    e.addEventListener("click", () => {
      let modal = e.closest(".modal") as Element;
      if(modal != null){
        modal.setAttribute("style", "display: none");
      }
      window.history.back();
    });
  });
}

function closeAllModal(){
  let modals = document.querySelectorAll(".modal");
  modals.forEach((e) => e.setAttribute("style", "display: none"));
}
setupModal();

export {setupModal,closeAllModal};