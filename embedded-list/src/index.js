const list = document.querySelector(".list");

list.addEventListener("click", () => {
  const newLi = document.createElement("li");
  newLi.innerText = "New movmov";
  list.appendChild(newLi);
});

window.addEventListener("message", (e) => {
  if (!e.origin.startsWith("https://movies-list-gregschoenberg.netlify.app")) {
    return;
  }
  const newLi = document.createElement("li");
  newLi.innerText = e.data;
  list.appendChild(newLi);
});