const text = document.getElementById("myInput");
const btn = document.querySelector(".btn");
const addpara = document.getElementById("outputParagraph");

btn.addEventListener("click", function () {
  const taskText = text.value.trim();

  if (taskText !== "") {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-item");

    const newParagraph = document.createElement("p");
    newParagraph.textContent = taskText;

    // Create Edit Button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("btn-edit");

    // Create Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn-delete");

    // Append elements
    taskContainer.appendChild(newParagraph);
    taskContainer.appendChild(editButton);
    taskContainer.appendChild(deleteButton);
    addpara.appendChild(taskContainer);

    // Clear input
    text.value = "";

    // Edit task
    editButton.addEventListener("click", function () {
      const newText = prompt("Edit your note:", newParagraph.textContent);
      if (newText !== null) {
        newParagraph.textContent = newText;
      }
    });

    // Delete task
    deleteButton.addEventListener("click", function () {
      taskContainer.remove();
    });
  }
});
