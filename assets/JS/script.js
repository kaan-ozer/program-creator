"use strict";

// ELEMENTS *******************************************************

const btnAdd = document.querySelector(".btn-add");
const btnDel = document.querySelector(".btn-del");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal-btn");
const carouselBtnRight = document.querySelector(".carousel-btn-right");
const carouselBtnLeft = document.querySelector(".carousel-btn-left");
const btnFreshman = document.querySelector(".btn--freshman");
const btnSophomore = document.querySelector(".btn--sophomore");
const btnJunior = document.querySelector(".btn--junior");
const btnSenior = document.querySelector(".btn--senior");
const modalBtnSubmit = document.querySelector(".modal-btn-submit");
const lectureDivs = document.querySelector(".lecture-divs");
const carousel = document.querySelector(".carousel");
let id = 1;
let hourStart = 7;

// FUNCTIONS *******************************************************

const tableRowCreate = function () {
  let tbody, trEl;

  for (let j = 1; j <= 4; j++) {
    tbody = document.querySelector(`.tbody-${j}`);

    for (let i = 1; i <= 10; i++) {
      trEl = document.createElement("tr");
      trEl.innerHTML +=
        "<tr>" +
        "<td ondrop='birak(event)' ondragover='return false' >09:20</td>" +
        "<td  ondrop='birak(event)' ondragover='return false' ></td>" +
        "<td  ondrop='birak(event)' ondragover='return false' ></td>" +
        "<td  ondrop='birak(event)' ondragover='return false' ></td>" +
        "<td  ondrop='birak(event)' ondragover='return false' ></td>" +
        "<td  ondrop='birak(event)' ondragover='return false' ></td>" +
        "</tr>";
      tbody.appendChild(trEl);
    }
  }
  1;
};

tableRowCreate();
//closing the modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//moving table via carousel buttons, just pass the direction into fuction
const moveTable = function (direction) {
  let activeTable;

  for (let i = 1; i <= 4; i++) {
    //if it doesn't contain hidden class, it is the active class
    if (!document.querySelector(`.table-${i}`).classList.contains("hidden")) {
      // obtain the active table index
      activeTable = i;
      // make hidden the active table
      document.querySelector(`.table-${i}`).classList.add("hidden");
      //make hidden the dot
      document.querySelector(`.dot-${i}`).classList.remove("dot-fill");
    }
  }

  if (direction === "right") {
    // making visible the next table
    if (activeTable !== 4) {
      //if it is not the last table, add 1 to active table and make visible the next table
      document
        .querySelector(`.table-${activeTable + 1}`)
        .classList.remove("hidden");
      document
        //if it is not the last dot, add 1 to active table and make visible the next dot
        .querySelector(`.dot-${activeTable + 1}`)
        .classList.add("dot-fill");
    } else {
      //if it is  the last table, make visible the  table--1
      document.querySelector(`.table-${1}`).classList.remove("hidden");
      //if it is  the last dot, make visible the  dot--1
      document.querySelector(`.dot-${1}`).classList.add("dot-fill");
    }
  }

  // make visible the next table for the left direction(same process)
  if (direction === "left")
    if (activeTable !== 1) {
      document
        .querySelector(`.table-${activeTable - 1}`)
        .classList.remove("hidden");
      document
        .querySelector(`.dot-${activeTable - 1}`)
        .classList.add("dot-fill");
    } else {
      document.querySelector(`.table-${4}`).classList.remove("hidden");
      document.querySelector(`.dot-${4}`).classList.add("dot-fill");
    }
};

// EVENT LİSTENERS  *******************************************************

//if you push the add button which is on modal, modal will be visible
btnAdd.addEventListener("click", function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

//if you push the close button which is on modal, modal will close up
closeModalBtn.addEventListener("click", closeModal);

//if you push the environment of  the modal, modal will close up
overlay.addEventListener("click", closeModal);

//if you push the any key from the keyboard, modal will close up
document.addEventListener("keydown", function (event) {
  console.log(event);
  if (event["key"] === "Escape") closeModal();
});

carouselBtnRight.addEventListener("click", function () {
  moveTable("right");
});

carouselBtnLeft.addEventListener("click", function () {
  moveTable("left");
});

modalBtnSubmit.addEventListener("click", function () {
  //create div
  const div = document.createElement("div");
  const lectureNameVal = document.querySelector(".lecture-name").value;
  const lecturerNameVal = document.querySelector(".lecturer-name").value;
  const mandatoryOptionalVal = document.querySelector(
    ".lec-status:checked"
  ).value;
  const sessionVal = document.querySelector(".session:checked").value;
  const gradeVal = document.querySelector(".student-grade:checked").value;

  id = id + 1;

  //div features
  div.style.width = "200px";
  div.style.height = "60px";
  div.style.padding = "8px 4px";
  div.style.background = "#b197fc";
  div.style.color = "#f1f3f5";
  div.style.borderRadius = "6px";
  div.style.marginTop = "12px";
  div.style.display = "flex";
  div.style.textAlign = "center";
  div.style.justifyContent = "center";
  div.style.fontWeight = 700;
  div.style.fontSize = "16px";
  div.style.draggable = "true";
  div.style.ondragover = "return false;";
  div.setAttribute("class", `lec`);
  div.setAttribute("id", id);
  div.setAttribute("draggable", "true");
  div.setAttribute("ondragstart", "surukle(event)");

  div.innerHTML =
    lectureNameVal +
    "-" +
    lecturerNameVal +
    "[" +
    sessionVal +
    "] -" +
    gradeVal +
    "- (" +
    mandatoryOptionalVal +
    ")";

  lectureDivs.appendChild(div);
});

// btnDel.addEventListener("click", function () {});

function surukle(o) {
  o.dataTransfer.setData("text", o.target.id);
}

function birak(o) {
  o.preventDefault();
  var veri = o.dataTransfer.getData("text");
  o.target.appendChild(document.getElementById(veri));
}

btnSophomore.addEventListener("click", function () {
  const table1 = document.querySelector(".table-1");
  const el2 = document.querySelector(".test-1-table-2").textContent;
  const el1 = document.querySelector(".test-1");
  console.log(el1.innerHTML);
  el1.innerHTML += el2;
});
