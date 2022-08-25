"use strict";

/*
COLORS *******************************************************

They are moved to css file

1: #0b7285
2: #5f3dc4
3: #a61e4d
4: #fd7e14

*/

// ELEMENTS *******************************************************

//elements on aside
const btnAdd = document.querySelector(".btn-add");
const btnDel = document.querySelector(".btn-del");
const lectureDivs = document.querySelector(".lecture-divs");
//modals
const overlay = document.querySelector(".overlay");
//modal for lec
const modalLec = document.querySelector(".lec-modal");
const modalLecClose = document.querySelector(".lec-modal-close");
const modalBtnSubmit = document.querySelector(".modal-btn-submit");
//modal for json
const modalJSON = document.querySelector(".json-modal");
const modalJSONbtnClose = document.querySelector(".json-modal-close");
//header button elements
const btnFreshman = document.querySelector(".btn--freshman");
const btnSophomore = document.querySelector(".btn--sophomore");
const btnJunior = document.querySelector(".btn--junior");
const btnSenior = document.querySelector(".btn--senior");
const btnReset = document.querySelector(".btn--reset");
const btnJSON = document.querySelector(".btn--json");
const btnSave = document.querySelector(".btn--save");
//carousel buttons
const carousel = document.querySelector(".carousel");
const carouselBtnRight = document.querySelector(".carousel-btn-right");
const carouselBtnLeft = document.querySelector(".carousel-btn-left");

// HEADER BUTTON ACTIVITY***************************************************************

// these boolean values prevent multiple touch on one button
let isFreshmanActive = true,
  isSophomoreActive = true,
  isJuniorActive = true,
  isSeniorActive = true;

btnFreshman.style.boxShadow = "4px 4px 12px 0px purple";
btnSophomore.style.boxShadow = "4px 4px 12px 0px purple";
btnJunior.style.boxShadow = "4px 4px 12px 0px purple";
btnSenior.style.boxShadow = "4px 4px 12px 0px purple";

// TABLE SETTINGS*********************************************************************

//YOU CAN ADJUST THE NUMBER OF TABLE (BUT WE HAVE 4 NOW)
let NumberOfTable = 4;
//YOU CAN ADJUST THE NUMBER OF THE ROWS
let NumberOfRow = 10;

let id;

// FUNCTIONS *******************************************************

const ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
};

function uploadFiles() {
  var file_to_read = document.getElementById("file_upload").files[0];
  var fileread = new FileReader();
  fileread.onload = function (e) {
    var content = e.target.result;
    console.log(content);
    var intern = JSON.parse(content); // Array of Objects.
    // console.log(intern); // You can index every object

    for (let i = 0; i < intern.length; i++) {
      const div = document.createElement("div");
      const location = document.querySelector(`${intern[i]["location"]}`);

      div.setAttribute("draggable", "true");
      div.setAttribute("ondragstart", "surukle(event)");
      div.setAttribute("id", intern[i]["id"]);
      div.setAttribute(
        "class",
        intern[i]["class"][0] + " " + intern[i]["class"][1]
      );
      div.innerHTML = intern[i]["content"];

      location.appendChild(div);
    }
  };
  fileread.readAsText(file_to_read);
}

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
          clone.id = `clone-of-${parameterTable[t].id}-clone-id-${ID()}`;
          clone.setAttribute(
            "class",
            `clone ${clone.classList[0]} ${clone.classList[1]}`
          );
          activeTableTd.appendChild(clone);
        }
      }
    }
  }
};

//CLOSE THE MODAL
const closeModalLec = function () {
  modalLec.classList.add("hidden");
  overlay.classList.add("hidden");
};

//CLOSE THE MODAL
const closeModalJSON = function () {
  modalJSON.classList.add("hidden");
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

//if you push the add button which is on modal, modal will be visible
btnAdd.addEventListener("click", function () {
  modalLec.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

//if you push the close button which is on modal, modal will close
modalLecClose.addEventListener("click", closeModalLec);

//if you push the environment of  the modal, modal will close
overlay.addEventListener("click", closeModalLec);

//if you push the any key from the keyboard, modal will close
document.addEventListener("keydown", function (event) {
  console.log(event);
  if (event["key"] === "Escape") closeModalLec();
});

//  it will create lectures, when you push submit on modal.
modalBtnSubmit.addEventListener("click", function () {
  //create unique key
  id = ID();

  //create div
  const div = document.createElement("div");

  //get values from modal
  const lectureNameVal = document.querySelector(".lecture-name").value;
  const lecturerNameVal = document.querySelector(".lecturer-name").value;
  const gradeVal = document.querySelector(".student-grade:checked").value;
  const sectionVal = document.querySelector(".section-input").value;
  const mandatoryOptionalVal = document.querySelector(
    ".lec-status:checked"
  ).value;

  //Add attributes
  div.setAttribute("id", id);
  div.setAttribute("draggable", "true");
  div.setAttribute("ondragstart", "surukle(event)");

  //div colors
  if (gradeVal === "1st") {
    div.setAttribute("class", `lec lec-for-freshman`);
  }
  if (gradeVal === "2st") {
    div.setAttribute("class", `lec lec-for-sophomore`);
  }
  if (gradeVal === "3st") {
    div.setAttribute("class", `lec lec-for-junior`);
  }
  if (gradeVal === "4st") {
    div.setAttribute("class", `lec lec-for-senior`);
  }

  id = ID();

  div.innerHTML =
    lectureNameVal +
    "-" +
    lecturerNameVal +
    "[" +
    sectionVal +
    "] -" +
    gradeVal +
    "- (" +
    mandatoryOptionalVal +
    ")";

  //append the new divs as child on aside part
  lectureDivs.appendChild(div);
});

//if you push the add button which is on modal, modal will be visible
btnJSON.addEventListener("click", function () {
  modalJSON.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

//if you push the close button which is on modal, modal will close
modalJSONbtnClose.addEventListener("click", closeModalJSON);

//if you push the environment of  the modal, modal will close
overlay.addEventListener("click", closeModalJSON);

//if you push the any key from the keyboard, modal will close
document.addEventListener("keydown", function (event) {
  console.log(event);
  if (event["key"] === "Escape") closeModalJSON();
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
    btnFreshman.style.boxShadow = "4px 4px 12px 0px red";
  }
});

//SOPHOMORE BUTTON WILL WORK AND IT WILL PULL THE LECTURES FROM TABLE 2
btnSophomore.addEventListener("click", function () {
  if (isSophomoreActive) {
    bringLectures(2);
    isSophomoreActive = false;
    btnSophomore.style.boxShadow = "4px 4px 12px 0px red";
  }
});

//SOPHOMORE BUTTON WILL WORK AND IT WILL PULL THE LECTURES FROM TABLE 3
btnJunior.addEventListener("click", function () {
  if (isJuniorActive) {
    bringLectures(3);
    isJuniorActive = false;
    btnJunior.style.boxShadow = "4px 4px 12px 0px red";
  }
});

//SOPHOMORE BUTTON WILL WORK AND IT WILL PULL THE LECTURES FROM TABLE 4
btnSenior.addEventListener("click", function () {
  if (isSeniorActive) {
    bringLectures(4);
    isSeniorActive = false;
    btnSenior.style.boxShadow = "4px 4px 12px 0px red";
  }
});

//IT WILL CLEAR THE ALL CLONES (clear button on header)
btnReset.addEventListener("click", function () {
  const cloneArray = document.querySelectorAll(`.clone`);

  if (cloneArray[0] !== undefined) cloneArray[0].remove();
  if (cloneArray[1] !== undefined) cloneArray[1].remove();
  if (cloneArray[2] !== undefined) cloneArray[2].remove();
  if (cloneArray[3] !== undefined) cloneArray[3].remove();

  isFreshmanActive = true;
  btnFreshman.style.boxShadow = "4px 4px 12px 0px purple";
  isSophomoreActive = true;
  btnSophomore.style.boxShadow = "4px 4px 12px 0px purple";
  isJuniorActive = true;
  btnJunior.style.boxShadow = "4px 4px 12px 0px purple";
  isSeniorActive = true;
  btnSenior.style.boxShadow = "4px 4px 12px 0px purple";
});

// JSON

btnSave.addEventListener("click", function () {
  let currentTable;
  const array = [];

  //check all tables on carouse
  for (let c = 1; c <= 4; c++)
    for (let b = 1; b <= NumberOfRow; b++) {
      for (let a = 1; a <= 6; a++) {
        currentTable = document.querySelector(
          `.table-${c}-row-${b}-column-${a}`
        ).childNodes;

        //get the location
        const location = `.table-${c}-row-${b}-column-${a}`;

        for (let t = 0; t < currentTable.length; t++) {
          const clone = currentTable[t].cloneNode(true);

          if (clone.id !== undefined) {
            const object = {
              id: clone.id,
              class: clone.classList,
              content: clone.textContent,
              location: location,
            };

            array.push(object);
          }
        }
      }
    }

  console.log(array);

  //convert objects into json format
  var data =
    "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(array));

  btnSave.href = "data:" + data;
  btnSave.download = "data.json";
  btnSave.innerHTML = "file is succesfully downloaded";
});
