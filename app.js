const newNote = document.getElementById("note__box");
const noteUl = document.querySelector(".list");
const submiNote = document.getElementById("note");
const elementLI = document.querySelector(".list");

submiNote.addEventListener("submit", noteCreat);
elementLI.addEventListener("click", doneAndDelete);

function doneAndDelete(e) {
  const clickELement = e.target;

  if (clickELement.classList.contains("list__parent--check")) {
    clickELement.parentElement.classList.toggle("list__done");
    clickELement.parentElement.firstElementChild.classList.toggle(
      "list__done--note"
    );
  } else if (clickELement.classList.contains("list__parent--delete")) {
    clickELement.parentElement.classList.toggle("delete");
    clickELement.parentElement.addEventListener("transitionend", (e) =>
      clickELement.parentElement.remove()
    );
  }
}

function noteCreat(e) {
  e.preventDefault();
  const noteValue = newNote.value;
  // creat div
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("list__parent");
  // creat li
  const noteLi = document.createElement("li");
  noteLi.classList.add("list__note");
  noteLi.textContent = noteValue;
  noteDiv.appendChild(noteLi);

  // creat check button
  const buttonCheck = document.createElement("button");
  buttonCheck.classList.add("list__parent--check");
  buttonCheck.innerHTML = '<i class="far fa-check-square"></i>';
  noteDiv.appendChild(buttonCheck);

  // creat delete button

  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("list__parent--delete");
  buttonDelete.innerHTML = '<i class="far fa-trash-alt"></i>';
  noteDiv.appendChild(buttonDelete);
  newNote.value = "";
  noteUl.appendChild(noteDiv);
}
