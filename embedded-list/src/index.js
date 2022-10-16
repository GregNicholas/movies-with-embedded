const list = document.querySelector(".list");

window.addEventListener("message", (e) => {
  if (!e.origin.startsWith("https://movies-list-gregschoenberg.netlify.app")) {
    return;
  }
  const newLi = document.createElement("li");
  newLi.innerText = e.data;
  list.appendChild(newLi);
});