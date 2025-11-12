import { saveTasks } from "./store";
import { generateId, pluralize } from "./utils";

export const tasks = [];

export const taskList = document.getElementById("todo-list");
export const addTask = document.getElementById("add-new-task-input");
export const clearCompletedButton = document.querySelector(".clear-completed");

export function createTask(task) {
  const newTask = {
    id: generateId(),
    title: task,
    completed: false,
  };
  return newTask;
}

export function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = task.completed ? "completed" : "";

  //Div.view
  const divView = document.createElement("div");
  divView.className = "view";

  //Checkbox
  const checkbox = document.createElement("input");
  checkbox.className = "toggle";
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  // Label
  const labelTask = document.createElement("label");
  labelTask.textContent = task.title;

  // Botón eliminar
  const deleteButton = document.createElement("button");
  deleteButton.className = "destroy";

  // Input edición
  const inputEdit = document.createElement("input");
  inputEdit.className = "edit";
  inputEdit.value = task.title;

  // Estructura
  divView.appendChild(checkbox);
  divView.appendChild(labelTask);
  divView.appendChild(deleteButton);

  li.appendChild(divView);
  li.appendChild(inputEdit);

  // Checkbox: marcar como completada
  checkbox.addEventListener("change", () => {
    const originalTask = tasks.find((t) => t.id === task.id);
    if (originalTask) {
      originalTask.completed = checkbox.checked;
      saveTasks(tasks);
      renderTasks();
    }
  });

  // Doble clic en label: modo edición
  labelTask.addEventListener("dblclick", () => {
    li.classList.add("editing");
    inputEdit.focus();
  });

  // Botón eliminar
  deleteButton.addEventListener("click", () => {
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks.splice(index, 1);
      saveTasks(tasks);
      renderTasks();
    }
  });

  // Input edición: guardar/cancelar
  inputEdit.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const newTitle = inputEdit.value.trim();
      if (newTitle) {
        const originalTask = tasks.find((t) => t.id === task.id);
        if (originalTask) {
          originalTask.title = newTitle;
          saveTasks(tasks);
          li.classList.remove("editing");
          renderTasks();
        }
      }
    }
    if (event.key === "Escape") {
      inputEdit.value = task.title;
      li.classList.remove("editing");
    }
  });

  return li;
}

export function addTaskToList(newTask) {
  tasks.push(newTask);
  saveTasks(tasks);
  renderTasks();
}

export function updateVisibility() {
  const main = document.querySelector(".main");
  const footer = document.querySelector(".footer");

  tasks.length == 0
    ? ((main.style.display = "none"), (footer.style.display = "none"))
    : ((main.style.display = ""), (footer.style.display = ""));
}

export function showFooter() {
  const item = document.querySelector(".todo-count");
  let count = 0;
  count = filterTasks().length;
  const word = pluralize(count);
  item.innerHTML = `<strong>${count}</strong> ${word} left`;
}

export function clearCompletedTasks() {
  const pending = tasks.filter((task) => !task.completed);
  tasks.length = 0;
  tasks.push(...pending);
  saveTasks(tasks);
  renderTasks();
}

export function filterTasks() {
  const hash = window.location.hash;
  switch (hash) {
    case "#/pending":
      return tasks.filter((task) => !task.completed);
    case "#/completed":
      return tasks.filter((task) => task.completed);
    case "#/":
    default:
      return tasks;
  }
}

export function updateFilterSelected() {
  const links = document.querySelectorAll(".filters a");
  const hash = window.location.hash || "#/";

  links.forEach((link) => {
    link.classList.remove("selected");
    if (link.getAttribute("href") == hash) {
      link.classList.add("selected");
    }
  });
}

export function renderTasks() {
  updateVisibility();
  showFooter();
  taskList.innerHTML = "";

  const fragment = document.createDocumentFragment();
  const filteredTasks = filterTasks();

  filteredTasks.forEach((task) => {
    const li = createTaskElement(task);
    fragment.appendChild(li);
  });

  taskList.appendChild(fragment);

  tasks.some((task) => task.completed)
    ? clearCompletedButton.classList.remove("hidden")
    : clearCompletedButton.classList.add("hidden");
  updateFilterSelected();
}
