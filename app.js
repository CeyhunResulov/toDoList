const newNote = document.getElementById("note__box");
const noteUl = document.querySelector(".list");
const submiNote = document.getElementById("note");
const elementLI = document.querySelector(".list");
document.addEventListener("DOMContentLoaded", localStorageRead);

submiNote.addEventListener("submit", noteCreat);
elementLI.addEventListener("click", doneAndDelete);

function doneAndDelete(e) {
  const clickELement = e.target;

  if (clickELement.classList.contains("list__parent--check")) {
    clickELement.parentElement.classList.toggle("list__done");
    clickELement.parentElement.firstElementChild.classList.toggle(
      "list__done--note"
    );
    if (
      clickELement.parentElement.firstElementChild.classList.contains(
        "list__done--note"
      )
    ) {
      localStoreageDoneCreat(
        clickELement.parentElement.firstElementChild.textContent
      );
    } else {
      let lcStoreageDone = JSON.parse(localStorage.getItem("notesDone"));
      let doneIndex = lcStoreageDone.indexOf(
        clickELement.parentElement.firstElementChild.textContent
      );
      lcStoreageDone.splice(doneIndex, 1);
      localStorage.setItem("notesDone", JSON.stringify(lcStoreageDone));
    }
  } else if (clickELement.classList.contains("list__parent--delete")) {
    clickELement.parentElement.classList.toggle("delete");
    clickELement.parentElement.addEventListener("transitionend", (e) =>
      clickELement.parentElement.remove()
    );
    let lcstoreage = JSON.parse(localStorage.getItem("notes"));
    let valueClick = clickELement.parentElement.firstElementChild.textContent;
    lcstoreage.forEach((note) => {
      if (note === valueClick) {
        let noteIndex = lcstoreage.indexOf(note);
        lcstoreage.splice(noteIndex, 1);
        localStorage.setItem("notes", JSON.stringify(lcstoreage));
      }
    });
  }
}

function noteCreat(e) {
  e.preventDefault();
  if (newNote.value.split("").length > 0) {
    localStoreageCreat(newNote.value);
    elementCreat(newNote.value);
    newNote.value = "";
  } else {
    alert("not Value!!!");
  }
}

function localStoreageCreat(newNote) {
  let noteArr;
  if (localStorage.getItem("notes") === null) {
    noteArr = [];
  } else {
    noteArr = JSON.parse(localStorage.getItem("notes"));
  }
  noteArr.push(newNote);
  localStorage.setItem("notes", JSON.stringify(noteArr));
}

function localStoreageDoneCreat(doneNote) {
  let noteDoneArr;
  if (localStorage.getItem("notesDone") === null) {
    noteDoneArr = [];
  } else {
    noteDoneArr = JSON.parse(localStorage.getItem("notesDone"));
  }
  noteDoneArr.push(doneNote);
  localStorage.setItem("notesDone", JSON.stringify(noteDoneArr));
}

function localStorageRead(newNote) {
  let localSt = JSON.parse(localStorage.getItem("notes"));
  localSt.forEach((note) => {
    elementCreat(note);
  });
  doneNoteFind();
}

function elementCreat(note) {
  // creat div
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("list__parent");
  // creat li
  const noteLi = document.createElement("li");
  noteLi.classList.add("list__note");
  noteLi.textContent = note;
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
  noteUl.appendChild(noteDiv);
}

function doneNoteFind() {
  let lcStoreageDone = JSON.parse(localStorage.getItem("notesDone"));
  let elementLI = document.querySelectorAll(".list__note");
  elementLI.forEach((doneNote) => {
    lcStoreageDone.forEach((lcDoneNote) => {
      if (doneNote.textContent === lcDoneNote) {
        doneNote.classList.add("list__done--note");
        doneNote.parentElement.classList.add("list__done");
      }
    });
  });
}
