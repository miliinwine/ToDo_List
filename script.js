const form = document.querySelector(".form");
const input = document.querySelector(".input");
const button = document.querySelector(".button");
const ul = document.querySelector(".ul");
const delCompleted = document.querySelector(".delete__completed");
const delAll = document.querySelector(".delete__all");
const buttons = document.querySelector(".buttons");
const hr = document.querySelector("hr");
// LocalStorage
const KEY = "todos";
const saveToDo = JSON.parse(localStorage.getItem(KEY)) ?? [];
let todos = saveToDo;
// Функция по отображению кнопок и линии
const showButtons = () => {
  if (!todos.length) {
    buttons.style.display = "none";
    hr.style.display = "none";
  } else {
    buttons.style.display = "flex";
    hr.style.display = "block";
  }
};
// Функция по созданию задач
const drawTodo = (obj) => {
  const li = document.createElement("li");
  li.innerHTML = `<label><input type="checkbox" class="task__input">
                  <span class="task__text">${obj.text}</span>;
                  <button class="task__button">❌</button></label>`;
  const chk = li.querySelector(".task__input");
  const del = li.querySelector(".task__button");
  chk.checked = obj.completed;
  del.addEventListener("click", () => deleteTask(obj.id));
  chk.addEventListener("change", () => toggleComplete(obj.id));
  return li;
};
// Поиск по ID Checkbox
const toggleComplete = (id) => {
  const findedTodo = todos.find((todo) => todo.id === id);
  findedTodo.completed = !findedTodo.completed;
  renderTodos();
};
// Функция по отображению задач
const renderTodos = () => {
  ul.innerHTML = "";
  todos.forEach((el) => {
    ul.append(drawTodo(el));
  });
  localStorage.setItem(KEY, JSON.stringify(todos));
  showButtons();
};
// Функция по добавлению задач
const addTask = (evt) => {
  evt.preventDefault();
  const value = input.value;
  if (value.trim().length) {
    todos.push({
      id: Date.now(),
      text: value,
      completed: false,
    });
    input.value = "";
    input.focus();
    renderTodos();
  }
};
//Функция по удалению задач
const deleteTask = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
};
// Функция по удалению всех задач
const deleteAll = () => {
  todos = [];
  renderTodos();
};
// События
form.addEventListener("submit", addTask);
delAll.addEventListener("click", deleteAll);
delCompleted.addEventListener("click", deleteChecked);
renderTodos();
// Функция по удалению выбранных задач
const deleteChecked = () => {
  todos = todos.filter((el) => el.completed !== true);
  renderTodos();
};
