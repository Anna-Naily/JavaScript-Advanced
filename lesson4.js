"use strict";
const str = document.querySelector("article").textContent;
const regexp = /'/g;
let regexpWithApostr = /\b\"\b/g;
let strNew = str.replace(regexp, '"');
strNew = strNew.replace(regexpWithApostr, "'");
document.querySelector("article").textContent = strNew;
///////////////////////////////
let button = document.querySelector(".button");
const regexpName = /\S+[А-яа-я]/;
const regexpPhone = /^\+7\(\d{3}\)\d{3}\-\d{4}$/;
const regexpEmail = /^([a-z0-9\.-]+)@mail\.ru\b/;
const regexpComment = /\S/;

function check() {
  let nameInput = document.getElementById("name").value;
  let phoneInput = document.getElementById("telephone").value;
  let emailInput = document.getElementById("email").value;
  let commentInput = document.getElementById("comments").value;
  if (regexpName.test(nameInput)) {
    document.getElementById("name").className = "success";
  } else {
    document.getElementById("name").className = "error";
  }
  if (regexpPhone.test(phoneInput)) {
    document.getElementById("telephone").className = "success";
  } else {
    document.getElementById("telephone").className = "error";
  }
  if (regexpEmail.test(emailInput)) {
    document.getElementById("email").className = "success";
  } else {
    document.getElementById("email").className = "error";
  }
  if (regexpComment.test(commentInput)) {
    document.getElementById("comments").className = "success";
  } else {
    document.getElementById("comments").className = "error";
  }
}
button.addEventListener("click", check);
