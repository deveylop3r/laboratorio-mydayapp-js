import { renderTasks, addTaskToList, addTask, createTask } from "./tasks.js";
import { clearCompletedButton, clearCompletedTasks, tasks } from "./tasks.js";
import { loadTasks } from "./store";

const loaded = loadTasks();
tasks.push(...loaded);

addTask.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && addTask.value.trim() !== "") {
    const task = createTask(addTask.value.trim());
    addTaskToList(task);
    addTask.value = "";
  }
});

window.addEventListener("hashchange", renderTasks);

clearCompletedButton.addEventListener("click", clearCompletedTasks);

renderTasks();
