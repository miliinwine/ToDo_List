const input = document.querySelector(".input");
const ul = document.querySelector(".list__conteiner");
const button = document.querySelector(".button");
button.addEventListener("click", () => {
  if (input.value === "") {
  } else {
    let li = document.createElement("li");
    li.innerHTML = 
    `<input type="checkbox" class="task__input">
     <span class="task__text">${input.value}</span>
     <button class="task__button">❌</button>`;
    ul.appendChild(li);
  }
  input.value = "";
  saveData();
});
ul.addEventListener(
  "click",
  (el) => {
    if (el.target.tagName === "LI") {
      el.target.classList.toggle("checked");
      saveData();
    } else if (el.target.tagName === "BUTTON") {
      el.target.parentElement.remove();
      saveData();
    }
  },
  false
);
function saveData() {
  localStorage.setItem("data", ul.innerHTML);
}
function showTask() {
  ul.innerHTML = localStorage.getItem("data");
}
showTask();


