export function saveTasks(tasks) {
  localStorage.setItem("mydayapp-js", JSON.stringify(tasks));
}

export function loadTasks() {
  const load = localStorage.getItem("mydayapp-js");
  return load ? JSON.parse(load) : [];
}
