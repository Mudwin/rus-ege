const labels = document.querySelectorAll(".task_label");
const inputs = document.querySelectorAll(".task_checkbox");
const tasks = document.querySelectorAll(".task_item");
const progress = document.querySelector(".progress-bar_number");

for (let i = 0; i < labels.length; i++) {
  function checkItem(event) {
    if (!inputs[i].hasAttribute("checked")) {
      inputs[i].setAttribute("checked", "");

      labels[i].classList.add("_done");
      inputs[i].classList.add("_checked");

      addMark(tasks[i]);
      localStorage.setItem(inputs[i].id, "checked");
      updateProgress();
    } else {
      inputs[i].removeAttribute("checked");

      labels[i].classList.remove("_done");
      inputs[i].classList.remove("_checked");

      removeMark(tasks[i]);
      localStorage.removeItem(inputs[i].id);
      updateProgress();
    }
  }

  function addMark(element) {
    let mark = document.createElement("img");
    mark.src = "./images/check-solid.svg";
    mark.classList.add("_mark");
    element.prepend(mark);
  }

  function removeMark(element) {
    let mark = element.querySelector("._mark");
    mark.remove();
  }

  tasks[i].addEventListener("click", checkItem);
  labels[i].addEventListener("click", checkItem);
}

function updateProgress() {
  progress.innerHTML = calculateProgress();
}

function calculateProgress() {
  let checkedItems = localStorage.length;
  let allItems = labels.length;

  let percent = Math.floor((checkedItems / allItems) * 100);
  return percent;
}

function restoreProgress() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let input = document.querySelector(`#${key}`);
    let label = input.parentElement.children[1];
    input.setAttribute("checked", "");
    label.classList.add("_done");
    input.classList.add("_checked");
    addMark(input.parentElement);
    updateProgress();
  }
}

document.addEventListener("DOMContentLoaded", restoreProgress);
