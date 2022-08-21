"use strict";

// ELEMENTS *******************************************************

const btnAdd = document.querySelector(".btn-add");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal-btn");
const carouselBtnRight = document.querySelector(".carousel-btn-right");
const carouselBtnLeft = document.querySelector(".carousel-btn-left");

// FUNCTIONS *******************************************************

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
