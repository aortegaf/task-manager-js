const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const toggleButton = document.getElementById("toggle-button");

loadTasks();
loadStyleMode();

// LocalStorage functions
function storeTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTasks() {
  const tasks = Array.from(taskList.querySelectorAll("li"));
  const updatedTasks = tasks.map((task) => task.firstElementChild.textContent);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach((task) => {
    taskList.appendChild(newTask(task));
  });
}

function loadStyleMode() {
  const currentTheme = localStorage.getItem("theme") || "light";

  if (currentTheme == "dark") {
    toggleButton.textContent = "☀️";
    document.body.classList.add("dark-mode");
  } else if (currentTheme == "light") {
    toggleButton.textContent = "🌑";
  }
}

// DOM manipulation functions
function newTask(name) {
  const newTask = document.createElement("li");
  newTask.className = "task-item";

  const taskName = document.createElement("p");
  taskName.textContent = name;

  const editOption = document.createElement("span");
  editOption.className = "edit-btn";
  editOption.textContent = "Edit";
  const deleteOption = document.createElement("span");
  deleteOption.className = "delete-btn";
  deleteOption.textContent = "Delete";

  const taskOptions = document.createElement("div");
  taskOptions.className = "task-options";
  taskOptions.appendChild(editOption);
  taskOptions.appendChild(deleteOption);

  newTask.appendChild(taskName);
  newTask.appendChild(taskOptions);

  return newTask;
}

function deleteTask(task) {
  if (confirm("Are you sure that you want to delete the task?")) {
    task.remove();
    updateTasks();
  }
}

function editTask(task) {
  const editedTask = prompt("Edit task:", task.firstElementChild.textContent);
  if (editedTask !== null && editedTask !== "") {
    task.firstElementChild.textContent = editedTask;
    updateTasks();
  }
}

// Event listeners
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = newTask(taskInput.value);
  storeTask(taskInput.value);
  taskList.appendChild(task);
  taskInput.value = "";
});

taskList.addEventListener("click", (event) => {
  if (event.target.className == "delete-btn") {
    deleteTask(event.target.parentElement.parentElement);
  } else if (event.target.className == "edit-btn") {
    editTask(event.target.parentElement.parentElement);
  }
});

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const theme = document.body.classList.contains("dark-mode")
    ? "dark"
    : "light";
  localStorage.setItem("theme", theme);
  loadStyleMode();
});
