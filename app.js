let darkMode = true;
let tasks = [];

// load dark mode preference from localStorage & update theme to match
$(document).ready(function () {
  $("#moon").hide();

  const darkModeState = localStorage.getItem("darkModeState");
  if (darkModeState === "false") {
    toggleDarkMode();
  }

  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks")).reverse();
  } else {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  updateTasks();
});

$("#taskForm").submit((e) => {
  e.preventDefault();
  if ($("#taskBox").val().length > 0) {
    tasks.push($("#taskBox").val());
    $("#taskBox").val("");

    updateTasks();
  }
});

// toggle dark mode by toggling bootstrap classes
function toggleDarkMode() {
  $("body, #taskBox").toggleClass("bg-dark text-light");
  $("nav").toggleClass("navbar-dark bg-light navbar-light");
  $("#toggleDarkMode").toggleClass("btn-dark btn-light");
  $("#addTaskButton").toggleClass("text-white text-dark");
  $("#sun, #moon").toggle();
  darkMode = !darkMode;
  // store dark mode preference in localStorage
  localStorage.setItem("darkModeState", darkMode);
}

// code for task addition

function updateTasks() {
  // Store task list reference
  const list = $("#taskList");

  // Empty the original task list
  list.html("");

  tasks.reverse().forEach((task, index) => {
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
