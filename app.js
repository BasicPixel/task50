$("#moon").hide();
let dark = true;

// load dark mode preference from localStorage & update theme to match
$(document).ready(function () {
  let darkModeState = localStorage.getItem("darkModeState");
  if (darkModeState == "false") {
    toggleDarkMode();
  }
});

// add task on enter key inside task input box
$("#taskBox").keypress(function (event) {
  const key = event.keyCode ? event.keyCode : event.which;
  if (key == "13") {
    addTask();
  }
});

// toggle dark mode by toggling bootstrap classes
function toggleDarkMode() {
  $("body, #taskBox").toggleClass("bg-dark text-light");
  $("nav").toggleClass("navbar-dark bg-light navbar-light");
  $("#toggleDarkMode").toggleClass("btn-dark btn-light");
  $("#sun, #moon").toggle();
  dark = !dark;
  // store dark mode preference in localStorage
  localStorage.setItem("darkModeState", dark);
}

// code for task addition

function addTask() {
  if ($("#taskBox").val().length > 0) {
    const list = $("#taskList");
    let text = $("#taskBox").val();
    let element = document.createElement("p");
    element.appendChild(document.createTextNode(text));
    list.append(element);
    $("#taskBox").val("");

    element.onclick = removeTask;
  }
}

function removeTask(e) {
  e.target.remove();
}
