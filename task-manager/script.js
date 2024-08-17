const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

function newTask(name) {
  const newTask = document.createElement("li");
  newTask.className = "task-item";

  const taskName = document.createElement("p");
  taskName.innerText = name;

  const deleteOption = document.createElement("span");
  deleteOption.className = "delete-btn";
  deleteOption.innerText = "Delete";
  const editOption = document.createElement("span");
  editOption.className = "edit-btn";
  editOption.innerText = "Edit";

  const taskOptions = document.createElement("div");
  taskOptions.className = "task-options";
  taskOptions.appendChild(deleteOption);
  taskOptions.appendChild(editOption);

  newTask.appendChild(taskName);
  newTask.appendChild(taskOptions);

  return newTask;
}

function deleteTask(task) {
  if (confirm("Are you sure that you want to delete the task?")) {
    task.remove();
  }
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const task = newTask(taskInput.value);
  taskList.appendChild(task);

  taskInput.value = "";
});

taskList.addEventListener("click", (event) => {
  if (event.target.className == "delete-btn") {
    deleteTask(event.target.parentElement.parentElement);
  }
});
