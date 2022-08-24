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
const btnReset = document.querySelector(".btn--reset");
const modalBtnSubmit = document.querySelector(".modal-btn-submit");
const lectureDivs = document.querySelector(".lecture-divs");
const carousel = document.querySelector(".carousel");
let id = 1;
let isFreshmanActive = true,
  isSophomoreActive = true,
  isJuniorActive = true,
  isSeniorActive = true;

// FUNCTIONS *******************************************************

const tableRowCreate = function () {
  let tbody, trEl, initialMinute, minutes, hours;

  for (let j = 1; j <= 4; j++) {
    tbody = document.querySelector(`.tbody-${j}`);
    initialMinute = 8 * 60 + 30;

    for (let i = 1; i <= 10; i++) {
      let minutes = initialMinute % 60;
      let hours = Math.trunc(initialMinute / 60);

      trEl = document.createElement("tr");
      trEl.innerHTML +=
        "<tr>" +
        "<td class= " +
        `table-${j}-row-${i}-column-1` +
        "  ondrop='birak(event)' ondragover='return false' >" +
        `${hours}:${minutes === 0 ? "00" : minutes}` +
        "</td>" +
        "<td class= " +
        `table-${j}-row-${i}-column-2` +
        "  ondrop='birak(event)' ondragover='return false' ></td>" +
        "<td class= " +
        `table-${j}-row-${i}-column-3` +
        "  ondrop='birak(event)' ondragover='return false' ></td>" +
        "<td class= " +
        `table-${j}-row-${i}-column-4` +
        "  ondrop='birak(event)' ondragover='return false' ></td>" +
        "<td class= " +
        `table-${j}-row-${i}-column-5` +
        "  ondrop='birak(event)' ondragover='return false' ></td>" +
        "<td class= " +
        `table-${j}-row-${i}-column-6` +
        "  ondrop='birak(event)' ondragover='return false' ></td>" +
        "</tr>";
      tbody.appendChild(trEl);

      initialMinute += 50;
    }
  }
  1;
};

tableRowCreate();

const bringLectures = function (tableNum) {
  let table2El, activeTableTd, k, activeTableNum;

  //create array for the json data
  const table2Elements = [];

  for (k = 1; k <= 4; k++) {
    const table = document.querySelector(`.table-${k}`);

    if (!table.classList.contains("hidden")) {
      activeTableNum = k;
      console.log("active", k);
    }
  }

  for (let j = 1; j <= 10; j++) {
    for (let f = 1; f <= 6; f++) {
      // obtain the childnodes of the table via parameter
      table2El = document.querySelector(
        `.table-${tableNum}-row-${j}-column-${f}`
      ).childNodes;

      //obtain the td areas of the active table
      activeTableTd = document.querySelector(
        `.table-${activeTableNum}-row-${j}-column-${f}`
      );

      //add elements from second table to the active table

      if (table2El.length !== 0 && f !== 1 && activeTableNum !== tableNum) {
        for (let t = 0; t < table2El.length; t++) {
          const clone = table2El[t].cloneNode(true);
          clone.id = `clone-${table2El[t].id}`;
          clone.setAttribute("class", "clone");
          activeTableTd.appendChild(clone);
          // `clone-table${activeTableNum}-row${j}-col${f}`

          //setTimeout(() => {
          //   if (tableNum === 4)
          //     document.getElementById(
          //       `clone-table${tableNum}-row${j}-col${f}`
          //     ).style.backgroundColor = "#5f3dc4";
          //   if (tableNum === 3)
          //     document.getElementById(
          //       `clone-table${tableNum}-row${j}-col${f}`
          //     ).style.backgroundColor = "#7048e8";
          //   if (tableNum === 2)
          //     document.getElementById(
          //       `clone-table${tableNum}-row${j}-col${f}`
          //     ).style.backgroundColor = "#845ef7";
          // }, 200);
        }
      }
    }
  }
};

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

  //div features
  div.style.width = "200px";
  div.style.height = "60px";
  div.style.padding = "8px 4px";

  if (gradeVal === "1st") {
    div.style.background = "#d0bfff";
  }
  if (gradeVal === "2st") {
    div.style.background = "#9775fa";
  }
  if (gradeVal === "3st") {
    div.style.background = "#7048e8";
  }
  if (gradeVal === "4st") {
    div.style.background = "#5f3dc4";
  }

  div.style.color = "#f1f3f5";
  div.style.borderRadius = "6px";
  div.style.marginTop = "12px";
  div.style.marginbottom = "12px";
  div.style.display = "inline-block";
  div.style.textAlign = "center";
  div.style.fontWeight = 700;
  div.style.fontSize = "16px";
  div.style.draggable = "true";
  div.style.ondragover = "return false;";
  div.setAttribute("class", `lec`);
  div.setAttribute("id", id);
  div.setAttribute("draggable", "true");
  div.setAttribute("ondragstart", "surukle(event)");

  id = id + 1;

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

function del(o) {
  o.preventDefault();
  var veri = o.dataTransfer.getData("text");
  document.getElementById(veri).remove();
}

btnFreshman.addEventListener("click", function () {
  if (isFreshmanActive) {
    bringLectures(1);
    isFreshmanActive = false;
  }
});

btnSophomore.addEventListener("click", function () {
  if (isSophomoreActive) {
    bringLectures(2);
    isSophomoreActive = false;
  }
});

btnJunior.addEventListener("click", function () {
  if (isJuniorActive) {
    bringLectures(3);
    isJuniorActive = false;
  }
});

btnSenior.addEventListener("click", function () {
  if (isSeniorActive) {
    bringLectures(4);
    isSeniorActive = false;
  }
});

btnReset.addEventListener("click", function () {
  for (let i = 0; i < 60; i++) {
    if (document.getElementById(`clone-${i}`) !== null) {
      document.getElementById(`clone-${i}`).remove();
    }
  }

  isFreshmanActive = true;
  isSophomoreActive = true;
  isJuniorActive = true;
  isSeniorActive = true;
});
