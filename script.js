const text = document.getElementById("myInput");
const btn = document.querySelector(".btn");
const addpara = document.getElementById("outputParagraph");
const searchInput = document.getElementById("searchInput");

let notes = JSON.parse(localStorage.getItem("notes")) || [];


window.addEventListener("DOMContentLoaded", loadNotes);

function loadNotes() {
  notes.forEach((note) => createNoteElement(note));
}


btn.addEventListener("click", function () {
  const taskText = text.value.trim();

  if (taskText !== "") {
    notes.push(taskText);
    localStorage.setItem("notes", JSON.stringify(notes));

    createNoteElement(taskText);
    text.value = "";
  }
});


function createNoteElement(taskText) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-item");

  const newParagraph = document.createElement("p");
  newParagraph.textContent = taskText;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("btn-edit");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("btn-delete");

  taskContainer.appendChild(newParagraph);
  taskContainer.appendChild(editButton);
  taskContainer.appendChild(deleteButton);
  addpara.appendChild(taskContainer);

  
  editButton.addEventListener("click", function () {
    const newText = prompt("Edit your note:", newParagraph.textContent);
    if (newText !== null) {
      const index = notes.indexOf(taskText);

      newParagraph.textContent = newText;
      if (index > -1) {
        notes[index] = newText;
        localStorage.setItem("notes", JSON.stringify(notes));
      }
    }
  });


  deleteButton.addEventListener("click", function () {
    taskContainer.remove();
    notes = notes.filter((note) => note !== newParagraph.textContent);
    localStorage.setItem("notes", JSON.stringify(notes));
  });
}


searchInput.addEventListener("input", function () {
  const value = searchInput.value.toLowerCase();

  const tasks = document.querySelectorAll(".task-item");

  tasks.forEach(task => {
    const text = task.querySelector("p").textContent.toLowerCase();

    task.style.display = text.includes(value) ? "block" : "none";
  });
});
