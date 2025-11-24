const text = document.getElementById("myInput");
const btn = document.querySelector(".btn");
const addpara = document.getElementById("outputParagraph");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

//Load Notes on Page Load
window.addEventListener("DOMContentLoaded", loadNotes);

function loadNotes() {
  notes.forEach((note) => createNoteElement(note));
}

// Add New Note 
btn.addEventListener("click", function () {
  const taskText = text.value.trim();

  if (taskText !== "") {
    notes.push(taskText);
    localStorage.setItem("notes", JSON.stringify(notes));

    createNoteElement(taskText);
    text.value = "";
  }
});

// Create Note Element 
function createNoteElement(taskText) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-item");

  const newParagraph = document.createElement("p");
  newParagraph.textContent = taskText;

  // Edit Button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("btn-edit");

  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("btn-delete");

  // Add to DOM
  taskContainer.appendChild(newParagraph);
  taskContainer.appendChild(editButton);
  taskContainer.appendChild(deleteButton);
  addpara.appendChild(taskContainer);

  // Edit
  editButton.addEventListener("click", function () {
    const newText = prompt("Edit your note:", newParagraph.textContent);
    if (newText !== null) {
      // Update UI
      newParagraph.textContent = newText;

      // Update localStorage
      const index = notes.indexOf(taskText);
      if (index > -1) {
        notes[index] = newText;
        localStorage.setItem("notes", JSON.stringify(notes));
      }
    }
  });

  // Delete
  deleteButton.addEventListener("click", function () {
    taskContainer.remove();

    // Remove from array + localStorage
    notes = notes.filter((note) => note !== newParagraph.textContent);
    localStorage.setItem("notes", JSON.stringify(notes));
  });
}
