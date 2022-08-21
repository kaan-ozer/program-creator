"use strict";

// Elements

const btnAdd = document.querySelector(".btn-add");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal-btn");
const carouselBtnRight = document.querySelector(".carousel-btn-right");
const carouselBtnLeft = document.querySelector(".carousel-btn-left");

// functions

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const moveTable = function (direction) {
  let activeTable;

  for (let i = 1; i <= 4; i++) {
    //if it doesn't contain hidden class, it is the active class
    if (!document.querySelector(`.table-${i}`).classList.contains("hidden")) {
      // obtain the active table index
      activeTable = i;
      // make hidden the active table
      document.querySelector(`.table-${i}`).classList.add("hidden");
    }
  }

  if (direction === "right") {
    // make visible the next table
    if (activeTable !== 4) {
      document
        .querySelector(`.table-${activeTable + 1}`)
        .classList.remove("hidden");
    } else {
      document.querySelector(`.table-${1}`).classList.remove("hidden");
    }
  }

  if (direction === "left")
    if (activeTable !== 1) {
      // make visible the next table
      document
        .querySelector(`.table-${activeTable - 1}`)
        .classList.remove("hidden");
    } else {
      document.querySelector(`.table-${4}`).classList.remove("hidden");
    }
};

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
