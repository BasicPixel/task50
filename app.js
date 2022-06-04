// Set darkMode to localStorage preference, or fallback to true
let darkMode = localStorage.getItem("darkModeState") || true;

// Load tasks from localStorage
if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", JSON.stringify([]))
}

let tasks = JSON.parse(localStorage.getItem("tasks"));;


$(document).ready(() => {
  $("#moon").hide();

  if (darkMode == "false") {
    toggleDarkMode();
  }

  updateTasks();
});

$("#taskForm").submit((e) => {
  e.preventDefault();

  if ($("#taskBox").val().length > 0) {
    tasks.unshift($("#taskBox").val());
    $("#taskBox").val("");

    updateTasks();
  }
});

// Toggle dark mode by toggling bootstrap classes
function toggleDarkMode() {
  $("body, #taskBox").toggleClass("bg-dark text-light");
  $("nav").toggleClass("navbar-dark bg-light navbar-light");
  $("#toggleDarkMode").toggleClass("btn-dark btn-light");
  $("#addTaskButton").toggleClass("text-white text-dark");
  $("#sun, #moon").toggle();

  darkMode = !darkMode
  localStorage.setItem("darkModeState", darkMode);
}

function updateTasks() {
  const list = $("#taskList");

  list.html("");

  tasks.forEach((task, index) => {
    // For each task, create an element with the task text
    // Each element should have a data-index attribute of the index in the list
    list.append(
      `<li data-index=${index} onclick="removeTask(${index})" class="my-2 user-select-none">${task}</li>`
    );
  });

  // Update tasks in localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(index) {
  // Remove the item with the specified index from the tasks array, then update tasks
  tasks.splice(index, 1);
  updateTasks();
}