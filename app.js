const submiNote = document.getElementById("note");
submiNote.addEventListener("submit", noteCreat);

function noteCreat(e) {
  const noteValue = document.getElementById("note__box").value;
  const noteDiv = document.createElement("div");
  const noteLi = document.createElement("li");
  const noteUl = document.querySelector(".list");
  noteDiv.classList.add("list__parent");
  noteLi.classList.add("list__note");
  noteDiv.innerHTML = "<span class='icon first__icon'></span>";
  noteUl.appendChild(noteDiv);
  noteDiv.appendChild(noteLi);
  noteLi.textContent = note.value;

  noteLi.textContent = noteValue;
  e.preventDefault();
}
