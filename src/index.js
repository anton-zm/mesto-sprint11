"use strict";
import "./style.css";

import Api from "./js/api";
import Card from "./js/card";
import CardList from "./js/cardlist";
import FormValidator from "./js/formvalidator";
import Popup from "./js/popup";
import UserInfo from "./js/userinfo";

const popup = document.querySelector(".popup");
const popupUserCard = document.querySelector(".popup_add-card");
const userButton = document.querySelector(".user-info__button");
const closePopup = document.querySelector(".popup__close");
const cardsContainer = document.querySelector(".places-list");
const formUser = document.forms.new;
const userTitle = formUser.elements.name;
const userLink = formUser.elements.link;
const userAddCardBtn = document.querySelector(".popup__button_usercard");
const editUserButton = document.querySelector(".user-info__edit-button");
const editUserClose = document.querySelector(".popup__close_edit");
const userCardPopupClose = document.querySelector(".popup__close_addcard");
const userInfoForm = document.querySelector(".popup_user-edit");
const editForm = document.forms.edit;
const editUserName = editForm.elements.user_name;
const editUserAbout = editForm.elements.user_about;
const editFormButton = document.querySelector(".popup__button_edit");
const userName = document.querySelector(".user-info__name");
const userAbout = document.querySelector(".user-info__job");
const popupImg = document.querySelector(".popup-img");
const closeImagePopup = document.querySelector(".popup__close_img");
const popupImgContainer = document.querySelector(".popup__img-container");
const userAva = document.querySelector(".user-info__photo");
const popupAva = document.querySelector(".popup_user-ava");
const closeAvaPopup = document.querySelector(".popup__close_ava");
const avaFormButton = document.querySelector(".popup__button_ava");
const avaForm = document.forms.ava;
const avaLink = avaForm.elements.user_ava;

const api = new Api({
  baseUrl: "https://praktikum.tk/cohort10",
  headers: {
    authorization: "d6d7615e-1844-4421-b847-6aee70eeff4e",
    "Content-Type": "application/json",
  },
});

const newUserCard = (title, image, likes, owner, id) => {
  //const card = new Card();
  const card = new Card("", "", api);
  return card.create(title, image, likes, owner, id);
};

const cardList = new CardList(cardsContainer, newUserCard);

const userCardPopup = new Popup(popupUserCard);
const userAvaPopup = new Popup(popupAva);
const userProfileEditPopup = new Popup(userInfoForm);
const newUserInfo = new UserInfo(editUserName, editUserAbout);
const validProfileForm = new FormValidator(editForm);
const validCardForm = new FormValidator(formUser);

function openPopupImg(elem) {
  popupImg.classList.add("popup_is-opened");
  let imgUrl = elem.style.backgroundImage;
  popupImgContainer.style.backgroundImage = imgUrl;
}

function closePopupImg() {
  popupImg.classList.remove("popup_is-opened");
}

function openForm() {
  validCardForm.setSubmitButtonState(false, userAddCardBtn);
  userTitle.value = "";
  userLink.value = "";
}

function openUserEdit() {
  userInfoForm.classList.add("popup_is-opened");
  validProfileForm.setSubmitButtonState(true, editFormButton);
}

function errorsReset() {
  const errorsField = document.querySelectorAll(".popup__form-error");
  let arrErrFlds = Array.from(errorsField);

  arrErrFlds.forEach(function (e) {
    e.textContent = "";
  });
}

function resetForm(form, button) {
  form.reset();
  button.classList.remove("popup__button_active");
}

cardsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("place-card__image")) {
    openPopupImg(event.target);
  }
});

userButton.addEventListener("click", function () {
  userCardPopup.open();
  openForm();
});

formUser.addEventListener("submit", function (event) {
  event.preventDefault();
  userAddCardBtn.classList.add("popup__button_edit");
  userAddCardBtn.textContent = "Загрузка...";
  api
    .addNewCard(userTitle.value, userLink.value)
    .then(function (res) {
      cardList.addCard(
        res.name,
        res.link,
        res.likes.length,
        res.owner._id,
        res._id
      );
      userCardPopup.close();
    })
    .catch(function (err) {
      console.log(err);
    })
    .finally(function () {
      userAddCardBtn.classList.remove("popup__button_edit");
      userAddCardBtn.textContent = "+";
    });
});

editUserButton.addEventListener("click", function () {
  newUserInfo.setUserInfo(userName, userAbout);
  openUserEdit();
});

editUserClose.addEventListener("click", function () {
  resetForm(editForm, editFormButton);
  userProfileEditPopup.close();
  errorsReset();
});

userCardPopupClose.addEventListener("click", function () {
  resetForm(formUser, userAddCardBtn);
  userCardPopup.close();
  errorsReset();
});

editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  errorsReset();
  editFormButton.textContent = "Загрузка...";

  api
    .updateProfile(editUserName.value, editUserAbout.value)
    .then(function (res) {
      newUserInfo.updateUserInfo(userName, userAbout);
      userProfileEditPopup.close();
    })
    .catch(function (err) {
      console.log(err);
    })
    .finally(function () {
      editFormButton.textContent = "Сохранить";
    });
});

api
  .getInitialCards()
  .then(function (result) {
    cardList.render(result);
  })
  .catch(function (err) {
    console.log(err);
  });

api
  .getUserData()
  .then(function (result) {
    userName.textContent = result.name;
    userAbout.textContent = result.about;
    userAva.setAttribute("style", `background-image:url('${result.avatar}')`);
  })
  .catch(function (err) {
    console.log(err);
  });

closeImagePopup.addEventListener("click", closePopupImg);

userAva.addEventListener("click", function () {
  userAvaPopup.open();
});

closeAvaPopup.addEventListener("click", function () {
  userAvaPopup.close();
  errorsReset();
  resetForm(avaForm, avaFormButton);
});

avaForm.addEventListener("submit", function (event) {
  event.preventDefault();
  errorsReset();
  api.updateAva(avaLink.value).then(function (res) {
    userAva.setAttribute("style", `background-image:url('${res.avatar}')`);

    userAvaPopup.close();
  });
});

validProfileForm.setEventListeners(editUserName);
validProfileForm.setEventListeners(editUserAbout);
validCardForm.setEventListenersForCard(userTitle, userLink);
