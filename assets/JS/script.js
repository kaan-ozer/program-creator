"use strict";

/*
COLORS *******************************************************

1: #0b7285
2: #5f3dc4
3: #a61e4d
4: #fd7e14

*/

let colorFreshman = "#0b7285";
let colorSophomore = "#5f3dc4";
let colorJunior = "#a61e4d";
let colorSenior = "#fd7e14";

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

// HEADER BUTTON ACTIVITY***************************************************************

// these boolean values prevent multiple touch on one button
let isFreshmanActive = true,
  isSophomoreActive = true,
  isJuniorActive = true,
  isSeniorActive = true;

// TABLE SETTINGS*********************************************************************

//YOU CAN ADJUST THE NUMBER OF TABLE (BUT WE HAVE 4 NOW)
let NumberOfTable = 4;
//YOU CAN ADJUST THE NUMBER OF THE ROWS
let NumberOfRow = 10;

let id = 1;

// FUNCTIONS *******************************************************

//CREATING ROWS FOR TABLES
const tableRowCreate = function () {
  let tbody, trEl, initialMinute, minutes, hours, tableOrder, rowOrder;

  //CREATE EACH TABLE
  for (tableOrder = 1; tableOrder <= NumberOfTable; tableOrder++) {
    //OBTAIN THE TBODY ELEMENT FOR EACH TABLE
    tbody = document.querySelector(`.tbody-${tableOrder}`);

    //INITIALIZE THE TOTAL MINUTE (FIRST LECTURE START)
    initialMinute = 8 * 60 + 30;

    //CREATE ROWS
    for (rowOrder = 1; rowOrder <= NumberOfRow; rowOrder++) {
      // TURN TOTAL MINUTES INTO MINUTES
      minutes = initialMinute % 60;
      // TURN TOTAL MINUTES INTO HOURS
      hours = Math.trunc(initialMinute / 60);

      trEl = document.createElement("tr");
      trEl.innerHTML +=
        "<tr>" +
        "<td class= " +
        `table-${tableOrder}-row-${rowOrder}-column-1` +
        "  ondrop='birak(event)' ondragover='return false' >" +
        `${hours}:${minutes === 0 ? "00" : minutes}` +
        "</td>" +
        "<td class= " +
        `table-${tableOrder}-row-${rowOrder}-column-2` +
        "  ondrop='birak(event)' ondragover='return false' ></td>" +
        "<td class= " +
        `table-${tableOrder}-row-${rowOrder}-column-3` +
        "  ondrop='birak(event)' ondragover='return false' ></td>" +
        "<td class= " +
        `table-${tableOrder}-row-${rowOrder}-column-4` +
        "  ondrop='birak(event)' ondragover='return false' ></td>" +
        "<td class= " +
        `table-${tableOrder}-row-${rowOrder}-column-5` +
        "  ondrop='birak(event)' ondragover='return false' ></td>" +
        "<td class= " +
        `table-${tableOrder}-row-${rowOrder}-column-6` +
        "  ondrop='birak(event)' ondragover='return false' ></td>" +
        "</tr>";

      //APPEND THAT ROW INTO TBODY
      tbody.appendChild(trEl);

      // CHANGE THE TIME FOR NEXT LECTURE
      initialMinute += 55;
    }
  }
  1;
};

// ROWS HAS BEEN CREATED
tableRowCreate();

//BRING LECTURES FROM OTHER TABLES (FOR THE HEADER BUTTONS, LIKE FRESHMAN, SOPHOMORE ETC.)
const bringLectures = function (tableNum) {
  let parameterTable, activeTableTd, k, activeTableNum;

  //OBTAIN THE TABLE WHICH YOU ARE LOOKING AT RIGHT NOW (ACTIVE TABLE)
  for (k = 1; k <= 4; k++) {
    const table = document.querySelector(`.table-${k}`);

    if (!table.classList.contains("hidden")) {
      activeTableNum = k;
      console.log("active", k);
    }
  }

  for (let j = 1; j <= NumberOfRow; j++) {
    for (let f = 1; f <= 6; f++) {
      // obtain the childnodes of each td element from the table (we chose the table through parameter)
      parameterTable = document.querySelector(
        `.table-${tableNum}-row-${j}-column-${f}`
      ).childNodes;

      //obtain the td areas of the active table
      activeTableTd = document.querySelector(
        `.table-${activeTableNum}-row-${j}-column-${f}`
      );

      //pull elements from parameterTable to the active table by cloning them
      if (
        parameterTable.length !== 0 &&
        f !== 1 &&
        activeTableNum !== tableNum
      ) {
        for (let t = 0; t < parameterTable.length; t++) {
          const clone = parameterTable[t].cloneNode(true);
          clone.id = `clone-${parameterTable[t].id}`;
          clone.setAttribute("class", "clone");
          activeTableTd.appendChild(clone);
        }
      }
    }
  }
};

//CLOSE THE MODAL
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
      // make the active table hidden
      document.querySelector(`.table-${i}`).classList.add("hidden");
      //make the dot hidden
      document.querySelector(`.dot-${i}`).classList.remove("dot-fill");
    }
  }

  if (direction === "right") {
    // making  the next table visible
    if (activeTable !== 4) {
      //if it is not the last table, add 1 to active table and make the next table visible
      document
        .querySelector(`.table-${activeTable + 1}`)
        .classList.remove("hidden");
      document
        //if it is not the last dot, add 1 to active table and make the next dot visible
        .querySelector(`.dot-${activeTable + 1}`)
        .classList.add("dot-fill");
    } else {
      //if it is  the last table, make  the  table--1 visible
      document.querySelector(`.table-${1}`).classList.remove("hidden");
      //if it is  the last dot, make  the  dot--1 visible
      document.querySelector(`.dot-${1}`).classList.add("dot-fill");
    }
  }

  // make visible the next table for the left direction(same process)
  if (direction === "left") {
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
  }
};

function surukle(o) {
  o.dataTransfer.setData("text", o.target.id);
}

function birak(o) {
  o.preventDefault();
  var veri = o.dataTransfer.getData("text");
  o.target.appendChild(document.getElementById(veri));
}

//if you drag lectures on del button, those lectures will be deleted
function del(o) {
  o.preventDefault();
  var veri = o.dataTransfer.getData("text");
  document.getElementById(veri).remove();
}

// EVENT LİSTENERS  *******************************************************

//  it will create lectures, when you push submit on modal.
modalBtnSubmit.addEventListener("click", function () {
  //create div
  const div = document.createElement("div");

  //get values from modal
  const lectureNameVal = document.querySelector(".lecture-name").value;
  const lecturerNameVal = document.querySelector(".lecturer-name").value;
  const gradeVal = document.querySelector(".student-grade:checked").value;
  const mandatoryOptionalVal = document.querySelector(
    ".lec-status:checked"
  ).value;

  // const sessionVal = document.querySelector(".session:checked").value;

  //div features--------------------------------------
  div.style.width = "200px";
  div.style.height = "60px";
  div.style.padding = "8px 4px";

  //div colors
  if (gradeVal === "1st") {
    div.style.background = colorFreshman;
  }
  if (gradeVal === "2st") {
    div.style.background = colorSophomore;
  }
  if (gradeVal === "3st") {
    div.style.background = colorJunior;
  }
  if (gradeVal === "4st") {
    div.style.background = colorSenior;
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

  //append the new divs as child on aside part
  lectureDivs.appendChild(div);
});

//if you push the add button which is on modal, modal will be visible
btnAdd.addEventListener("click", function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

//if you push the close button which is on modal, modal will close
closeModalBtn.addEventListener("click", closeModal);

//if you push the environment of  the modal, modal will close
overlay.addEventListener("click", closeModal);

//if you push the any key from the keyboard, modal will close
document.addEventListener("keydown", function (event) {
  console.log(event);
  if (event["key"] === "Escape") closeModal();
});

// Change the table on carousel -right-
carouselBtnRight.addEventListener("click", function () {
  moveTable("right");
});

// Change the table on carousel -left-
carouselBtnLeft.addEventListener("click", function () {
  moveTable("left");
});

//FRESHMAN BUTTON WILL WORK AND IT WILL PULL THE LECTURES FROM TABLE 1
btnFreshman.addEventListener("click", function () {
  if (isFreshmanActive) {
    bringLectures(1);
    isFreshmanActive = false;
  }
});

//SOPHOMORE BUTTON WILL WORK AND IT WILL PULL THE LECTURES FROM TABLE 2
btnSophomore.addEventListener("click", function () {
  if (isSophomoreActive) {
    bringLectures(2);
    isSophomoreActive = false;
  }
});

//SOPHOMORE BUTTON WILL WORK AND IT WILL PULL THE LECTURES FROM TABLE 3
btnJunior.addEventListener("click", function () {
  if (isJuniorActive) {
    bringLectures(3);
    isJuniorActive = false;
  }
});

//SOPHOMORE BUTTON WILL WORK AND IT WILL PULL THE LECTURES FROM TABLE 4
btnSenior.addEventListener("click", function () {
  if (isSeniorActive) {
    bringLectures(4);
    isSeniorActive = false;
  }
});

//IT WILL CLEAR THE ALL CLONES (clear button on header)
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
