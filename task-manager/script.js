const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

loadTasks();

function newTask(name) {
  const newTask = document.createElement("li");
  newTask.className = "task-item";

  const taskName = document.createElement("p");
  taskName.textContent = name;

  const deleteOption = document.createElement("span");
  deleteOption.className = "delete-btn";
  deleteOption.textContent = "Delete";
  const editOption = document.createElement("span");
  editOption.className = "edit-btn";
  editOption.textContent = "Edit";

  const taskOptions = document.createElement("div");
  taskOptions.className = "task-options";
  taskOptions.appendChild(deleteOption);
  taskOptions.appendChild(editOption);

  newTask.appendChild(taskName);
  newTask.appendChild(taskOptions);

  return newTask;
}

function storeTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach((task) => {
    taskList.appendChild(newTask(task));
  });
}

function deleteTask(task) {
  if (confirm("Are you sure that you want to delete the task?")) {
    task.remove();
  }
}

function editTask(task) {
  const editedTask = prompt("Edit task:", task.firstElementChild.textContent);
  if (editedTask !== null && editedTask !== "") {
    task.firstElementChild.textContent = editedTask;
  }
}

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
